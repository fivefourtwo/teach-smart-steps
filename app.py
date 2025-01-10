from flask import Flask, render_template, request, jsonify
import openai
from datetime import datetime
import os
import fitz  # PyMuPDF
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, 
    static_url_path='/static',
    static_folder='static',
    template_folder='templates')

openai.api_key = os.getenv('OPENAI_API_KEY')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

def create_prompt(form_data, pdf_text=""):
    return f"""Erstelle 3 verschiedene Aufgaben für die {form_data.get('grade', '[KLASSENSTUFE]')}, 
    die im Fach {form_data.get('subject', '[FACH]')} eingesetzt werden sollen. 
    
    {f'Die Aufgabe soll das folgende Dokument berücksichtigen:\n{pdf_text}\n' if pdf_text else ''}
    
    Die Aufgabe soll sich auf die Kompetenz {form_data.get('curriculum_competency', '[LEHRPLANKOMPETENZ]')} beziehen. 
    Aktuell wird in diesem Fach das Thema {form_data.get('current_topic', '[THEMA]')} besprochen. 
    Die Aufgabe soll in {form_data.get('social_form', '[SOZIALFORM]')} durchgeführt werden 
    und ungefähr {form_data.get('time', '[ZEIT]')} in Anspruch nehmen.

    Berücksichtige außerdem die Medienbildungs-Kompetenz {form_data.get('media_competency', '[MEDIENBILDUNGS-KOMPETENZ]')} 
    und wähle das Aufgabenformat {form_data.get('task_format', '[AUFGABENFORMAT]')}.

    Interessen der Schüler: {form_data.get('student_interests', '[INTERESSEN DER SCHÜLER]')}
    Digitale Tools: {form_data.get('digital_tools', '[DIGITALE TOOLS]')}

    Die Aufgabe sollte klar formulierte Lernziele haben, sowohl für das Schulfach als auch die Medienbildung. 
    Achte darauf, dass jeder Aufgabe ein "Inhalt" aus dem Lehrplan Medienbildung zugeordnet werden kann.

    Formatiere den Output für jede Aufgabe wie folgt:
    Aufgabe X:
    - Schulfach, Thema, Sozialform, Zeit
    - Lernziel des Schulfachs
    - Inhalt aus dem Medienbildungs-Lehrplan
    - Aufgabenstellung für die Schüler
    - Digitale Tools: (Ja/Nein/Wahlweise)"""

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

# Generate a suggestion for a given field
@app.route('/generate-suggestion', methods=['POST'])
def generate_suggestion():
    try:
        field = request.json.get('field')
        context = {
            'grade': request.json.get('grade', ''),
            'subject': request.json.get('subject', ''),
            'current_topic': request.json.get('current_topic', '')
        }

        prompts = {
            'social_form': f"""Schlage eine passende Sozialform für den Unterricht vor.
                Berücksichtige dabei:
                - Klassenstufe: {context['grade']}
                - Fach: {context['subject']}
                - Aktuelles Thema: {context['current_topic']}
                Gib nur die Sozialform zurück, ohne weitere Erklärungen.""",
            
            'task_format': f"""Schlage ein passendes Aufgabenformat für den Unterricht vor.
                Berücksichtige dabei:
                - Klassenstufe: {context['grade']}
                - Fach: {context['subject']}
                - Aktuelles Thema: {context['current_topic']}
                Gib nur das Aufgabenformat zurück, ohne weitere Erklärungen.""",
            
            'digital_tools': f"""Schlage ein passendes digitales Tool für den Unterricht vor.
                Berücksichtige dabei:
                - Klassenstufe: {context['grade']}
                - Fach: {context['subject']}
                - Aktuelles Thema: {context['current_topic']}
                Gib nur den Namen des Tools zurück, ohne weitere Erklärungen."""
        }

        if field not in prompts:
            return jsonify({'error': 'Invalid field'}), 400

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Du bist ein hilfreicher Assistent für Lehrkräfte."},
                {"role": "user", "content": prompts[field]}
            ],
            max_tokens=50
        )

        suggestion = response.choices[0].message.content.strip()
        return jsonify({'suggestion': suggestion})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Generate tasks based on the form data and optional PDF file
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

        system_prompt = """Du bist ein KI-Modell, das Lehrkräften dabei hilft, individuelle und zielgerichtete Aufgaben 
        für den Unterricht zu erstellen. Dein Ziel ist es, Aufgaben zu generieren, die nicht nur den offiziellen Lehrplänen 
        der jeweiligen Klassenstufe entsprechen, sondern auch die im Lehrplan für Medienbildung enthaltenen Kompetenzen fördern."""

        user_prompt = create_prompt(form_data, pdf_text)
        print(user_prompt)

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=1000
        )

        tasks = response.choices[0].message.content

        return jsonify({
            'success': True,
            'tasks': tasks,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'pdf_info': pdf_info,
            'pdf_text': pdf_text[:500] + "..." if len(pdf_text) > 500 else pdf_text
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    for dir_path in ['templates', 'static/css', 'static/js', UPLOAD_FOLDER]:
        os.makedirs(dir_path, exist_ok=True)
    
    app.run(debug=True)