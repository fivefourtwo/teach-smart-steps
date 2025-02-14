from flask import Flask, render_template, request, jsonify, session
import openai
from datetime import datetime
import os
import fitz  # PyMuPDF
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import csv
from io import StringIO
import uuid
from flask_cors import CORS
import json
# from openai.error import OpenAIError

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

# Load environment variables
load_dotenv()

app = Flask(
    __name__,
    static_url_path='/static',
    static_folder='static',
    template_folder='templates'
)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

task_storage = {}  # In-memory storage (consider using a database in production)

def load_media_competencies():
    """Load media competencies from the CSV string into a structured format"""
    competencies = []
    csv_file = StringIO(MEDIA_COMPETENCY_PLAN)
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        competencies.append({
            'theme': row['Thema'],
            'subtopics': [s.strip() for s in row['Unterpunkte'].split(';')],
            'competencies': [c.strip() for c in row['Inhaltsbezogene Kompetenzen'].split(';')]
        })
    return competencies

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page_num in range(len(doc)):
            page = doc[page_num]
            page_text = page.get_text()
            text += f"[Page {page_num + 1}]:\n{page_text}\n\n"
        doc.close()
    except Exception as e:
        print(f"Error reading PDF: {str(e)}")
    return text

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

# Generate a suggestion for a given field using outsourced prompts
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
            prompt_text = media_competency_prompt(context)
        elif field == 'social_form':
            prompt_text = social_form_prompt(context)
        elif field == 'task_format':
            prompt_text = task_format_prompt(context)
        elif field == 'digital_tools':
            prompt_text = digital_tools_prompt(context)
        else:
            return jsonify({'error': 'Invalid field'}), 400

        response = openai.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            messages=[
                {"role": "system", "content": "Du bist ein hilfreicher Assistent für Lehrkräfte."},
                {"role": "user", "content": prompt_text}
            ],
            max_tokens=100
        )

        suggestion = response.choices[0].message.content.strip()
        return jsonify({'suggestion': suggestion})

    except Exception as e:
        print(f"Error in generate-suggestion: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
# Generate tasks based on the form data and optional PDF file using outsourced prompts
@app.route('/generate-tasks', methods=['GET', 'POST'])
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

        pdf_text = ""
        pdf_info = {"processed": False, "filename": None, "page_count": 0}

        if 'pdfFile' in request.files:
            file = request.files['pdfFile']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                pdf_info["filename"] = filename
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                
                os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                
                file.save(file_path)
                doc = fitz.open(file_path)
                pdf_info["processed"] = True
                pdf_info["page_count"] = len(doc)
                
                pdf_text = extract_text_from_pdf(file_path)
                pdf_info["char_count"] = len(pdf_text)
                
                doc.close()
                os.remove(file_path)

        # Use the outsourced prompt to create the task prompt
        user_prompt = create_task_prompt(form_data, pdf_text)
        print(user_prompt)

        # Generate two different tasks using the imported SYSTEM_TASK_PROMPT
        tasks = []
        for i in range(2):
            try:
                response = openai.chat.completions.create(
                    model="gpt-4o-mini-2024-07-18",
                    messages=[
                        {"role": "system", "content": SYSTEM_TASK_PROMPT},
                        {"role": "user", "content": f"{user_prompt}\nBitte erstelle eine einzigartige Aufgabe (Variante {i+1}/2)."}
                    ],
                    max_tokens=1000
                )
                # Log the response for debugging
                print(f"OpenAI API response: {response}")
                tasks.append(response.choices[0].message.content)
            except Exception as e:
                print(f"Error calling OpenAI API: {e}")
                return jsonify({'success': False, 'error': 'Error calling OpenAI API'}), 500

        # Generate structured summaries for each task using the outsourced SUMMARY_PROMPT
        summaries = []
        for task in tasks:
            try:
                summary_response = openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "Du bist ein präziser JSON-Generator."},
                        {"role": "user", "content": SUMMARY_PROMPT + "\n\nAufgabe:\n" + task}
                    ],
                    max_tokens=300
                )
                raw_content = summary_response.choices[0].message.content.strip()
                print(f"Summary Response Content: {raw_content}")

                if not raw_content:
                    print("Empty response received from OpenAI API.")
                    return jsonify({'success': False, 'error': 'Empty response from OpenAI API'}), 500

                summaries.append(json.loads(raw_content))
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
                print(f"Raw content received: {raw_content}")
                return jsonify({'success': False, 'error': 'JSON decode error'}), 500
            # except OpenAIError as e:
            #     print(f"OpenAI API error: {e}")
            #     return jsonify({'success': False, 'error': 'OpenAI API error: ' + str(e)}), 500
            except Exception as e:
                print(f"Unexpected error: {e}")
                return jsonify({'success': False, 'error': 'Unexpected error: ' + str(e)}), 500

        # Generate unique ID and store tasks
        session_id = str(uuid.uuid4())
        task_storage[session_id] = tasks

        return jsonify({
            'success': True,
            'session_id': session_id,
            'summaries': summaries,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'pdf_info': pdf_info,
            'pdf_text': pdf_text[:500] + "..." if len(pdf_text) > 500 else pdf_text
        })

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'success': False, 'error': 'Unexpected error: ' + str(e)}), 500

@app.route('/get-task/<session_id>/<int:task_index>')
def get_task(session_id, task_index):
    try:
        if session_id not in task_storage:
            return jsonify({
                'success': False,
                'error': 'Session not found'
            }), 404

        tasks = task_storage[session_id]
        if task_index >= len(tasks):
            return jsonify({
                'success': False,
                'error': 'Task index out of range'
            }), 404

        # Return the task with proper HTML structure
        task = tasks[task_index]
        
        return jsonify({
            'success': True,
            'task': task
        })
    except Exception as e:
        print(f"Error retrieving task: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve task'
        }), 500

if __name__ == '__main__':
    for dir_path in ['templates', 'static/css', 'static/js', UPLOAD_FOLDER]:
        os.makedirs(dir_path, exist_ok=True)
    
    app.run(debug=True)

print(f"API Key loaded: {openai.api_key[:7]}...")  # Only prints first 7 chars for security