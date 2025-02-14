from flask import Flask, render_template, request, jsonify, session
import openai
from datetime import datetime
import os
import csv
from io import StringIO
import uuid
from flask_cors import CORS
import json

# Import all prompt helper functions and constants from prompts.py
from prompts import (
    create_task_prompt,
    media_competency_prompt,
    social_form_prompt,
    task_format_prompt,
    digital_tools_prompt,
    SYSTEM_TASK_PROMPT,
    SUMMARY_PROMPT,
    MEDIA_COMPETENCY_PLAN
)

from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='/static',
    static_folder='static',
    template_folder='templates'
)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')

task_storage = {}  # In-memory storage (consider using a database in production)

@app.route('/generate-suggestion', methods=['POST'])
def generate_suggestion():
    try:
        field = request.json.get('field')
        context = {
            'grade': request.json.get('grade', ''),
            'subject': request.json.get('subject', ''),
            'current_topic': request.json.get('current_topic', '')
        }

        if field == 'media_competency':
            prompt_str = media_competency_prompt(context)
        else:
            prompts_dict = {
                'social_form': social_form_prompt(context),
                'task_format': task_format_prompt(context),
                'digital_tools': digital_tools_prompt(context)
            }
            prompt_str = prompts_dict.get(field)

        if not prompt_str:
            return jsonify({'error': 'Invalid field'}), 400

        response = openai.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            messages=[
                {"role": "system", "content": "Du bist ein hilfreicher Assistent für Lehrkräfte."},
                {"role": "user", "content": prompt_str}
            ],
            max_tokens=100
        )

        suggestion = response.choices[0].message.content.strip()
        return jsonify({'suggestion': suggestion})
    except Exception as e:
        print(f"Error in generate-suggestion: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/generate-tasks', methods=['POST'])
def generate_tasks():
    if request.method != 'POST':
        return jsonify({'error': 'Only POST method is allowed'}), 405

    try:
        form_data = {
            'grade': request.form.get('grade', ''),
            'subject': request.form.get('subject', ''),
            'curriculum_competency': request.form.get('curriculum_competency', ''),
            'current_topic': request.form.get('current_topic', ''),
            'social_form': request.form.get('social_form', ''),
            'time': request.form.get('time', ''),
            'media_competency': request.form.get('media_competency', ''),
            'task_format': request.form.get('task_format', ''),
            'student_interests': request.form.get('student_interests', ''),
            'digital_tools': request.form.get('digital_tools', '')
        }

        # Generate the task prompt using only form data.
        task_prompt = create_task_prompt(form_data)
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SYSTEM_TASK_PROMPT},
                {"role": "user", "content": task_prompt}
            ],
            max_tokens=1000
        )

        tasks = [response.choices[0].message.content.strip()]
        summaries = []
        for task in tasks:
            summary_response = openai.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "Du bist ein präziser JSON-Generator."},
                    {"role": "user", "content": SUMMARY_PROMPT + "\n\nAufgabe:\n" + task}
                ],
                max_tokens=300
            )
            raw_content = summary_response.choices[0].message.content.strip()
            try:
                summaries.append(json.loads(raw_content))
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
                print(f"Raw content received: {raw_content}")
                return jsonify({'success': False, 'error': 'JSON decode error'}), 500

        # Generate a unique session ID and store the generated tasks.
        session_id = str(uuid.uuid4())
        task_storage[session_id] = tasks

        return jsonify({
            'success': True,
            'session_id': session_id,
            'summaries': summaries,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        print(f"Unexpected error in generate_tasks: {e}")
        return jsonify({'success': False, 'error': 'Unexpected error: ' + str(e)}), 500

@app.route('/get-task/<session_id>/<int:task_index>')
def get_task(session_id, task_index):
    try:
        if session_id not in task_storage:
            return jsonify({'success': False, 'error': 'Session not found'}), 404

        tasks = task_storage[session_id]
        if task_index >= len(tasks):
            return jsonify({'success': False, 'error': 'Task index out of range'}), 404

        task = tasks[task_index]
        return jsonify({'success': True, 'task': task})
    except Exception as e:
        print(f"Error retrieving task: {str(e)}")
        return jsonify({'success': False, 'error': 'Failed to retrieve task'}), 500

if __name__ == '__main__':
    for dir_path in ['templates', 'static/css', 'static/js']:
        os.makedirs(dir_path, exist_ok=True)
    app.run(debug=True)

print(f"API Key loaded: {openai.api_key[:7]}...")  # Only prints the first 7 characters for security