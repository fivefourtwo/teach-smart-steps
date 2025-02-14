from flask import Flask, request, jsonify
import openai
from datetime import datetime
import os
from flask_cors import CORS
from prompts import create_task_prompt  # and other necessary constants if any
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

@app.route('/generate-tasks', methods=['POST'])
def generate_tasks():
    if request.method != 'POST':
        return jsonify({'error': 'Only POST method is allowed'}), 405

    try:
        # Read only the necessary form data
        form_data = {
            'subject': request.form.get('subject', ''),
            'competency': request.form.get('competency', ''),
            'topic': request.form.get('topic', ''),
            'social_form': request.form.get('social_form', ''),
            'duration': request.form.get('duration', ''),
            'task_type': request.form.get('task_type', ''),
            'digital_tools': request.form.get('digital_tools', '')
        }

        # Generate the prompt using the form data
        task_prompt = create_task_prompt(form_data)
        response = openai.chat.completions.create(
            model="o1-mini",
            messages=[
                {"role": "user", "content": task_prompt}
            ]
        )

        # Retrieve and clean the generated task(s)
        tasks = [response.choices[0].message.content.strip()]

        return jsonify({
            'success': True,
            'tasks': tasks,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })

    except Exception as e:
        print(f"Unexpected error in generate_tasks: {e}")
        return jsonify({'success': False, 'error': 'Unexpected error: ' + str(e)}), 500

if __name__ == '__main__':
    for dir_path in ['templates', 'static/css', 'static/js']:
        os.makedirs(dir_path, exist_ok=True)
    app.run(debug=True)

print(f"API Key loaded: {openai.api_key[:7]}...")  # Only prints the first 7 characters