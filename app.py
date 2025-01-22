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

# Load environment variables
load_dotenv()

app = Flask(__name__, 
    static_url_path='/static',
    static_folder='static',
    template_folder='templates')
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Media competency plan as a string (CSV format)
MEDIA_COMPETENCY_PLAN = '''Thema,Unterpunkte,Inhaltsbezogene Kompetenzen
Grundlagen: Medien kennenlernen,Was sind Medien?; Medien früher und heute; Medien sind vielfältig; Medien nutzen,"Unterschiedliche Medienarten (Print, digital, Audio, Video) erkennen.; Medienformate verstehen und benennen."
Grundlagen: Einführung Internet,Was ist das Internet?; Internetverbindung; Der Browser,Internet als Informationsquelle erkennen.; Browserfunktionen verstehen und anwenden.
Sicherheit: Sicher im Internet - Digitale Fußabdrücke,Was ist ein digitaler Fußabdruck?; Wie hinterlassen wir Spuren im Internet?; Verantwortung im Umgang mit eigenen und fremden Daten; Gefahren im Internet; Geräte und Datenschutz; Online-Spiele und Cybergrooming; Viren und Downloads,Den digitalen Fußabdruck und dessen Auswirkungen auf die Privatsphäre verstehen.; Grundlegendes Verständnis von Online-Gefahren und Datenschutz entwickeln.; Werbung und ihre Manipulation verstehen.
Sicherheit: Soziale Netzwerke,Was sind soziale Netzwerke?; Profil erstellen; Gefahren und Risiken; Cybermobbing,Soziale Netzwerke und ihre Funktionen verstehen.; Das Erstellen eines Profils und die damit verbundenen Risiken.
Beobachten: Werbung und Konsum,Werbeformen: Wo begegnen wir Werbung im Alltag?; Werbung in sozialen Netzwerken; Werbung und Kinder: Wie beeinflusst uns Werbung?,Werbeziele und -methoden verstehen.; Werbung als Einflussfaktor auf Konsumverhalten erkennen.
Beobachten: Medienanalyse – Was steckt hinter den Medien,"Verantwortung von Medienmachern; Fake News und Desinformation; Medienanalyse: Texte, Bilder, Videos kritisch hinterfragen",Verantwortungsvolle Mediennutzung verstehen.; Fake News erkennen.
Medien und ihre Wirkung,Wie beeinflussen Medien unser Denken und Verhalten?; Der Umgang mit Bildern und Sprache; Auswirkungen von zu viel Bildschirmzeit,Medieninhalte und deren Einfluss auf die Wahrnehmung erkennen.; Den eigenen Umgang mit Bildschirmzeit reflektieren.'''

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

def create_prompt(form_data, pdf_text=""):
    prompt = f"""Erstelle eine Unterrichtsaufgabe mit folgenden Vorgaben:

Fach: {form_data.get('subject', '')}
Klassenstufe: {form_data.get('grade', '')}
Lehrplankompetenz: {form_data.get('curriculum_competency', '')}
Aktuelles Thema: {form_data.get('current_topic', '')}
Sozialform: {form_data.get('social_form', '')}
Zeit: {form_data.get('time', '')}
Medienbildungs-Kompetenz: {form_data.get('media_competency', '')}
Aufgabenformat: {form_data.get('task_format', '')}
Schülerinteressen: {form_data.get('student_interests', '')}
Digitale Tools: {form_data.get('digital_tools', '')}

Die Aufgabe MUSS in folgender Struktur erstellt werden:
1. Ein prägnanter Titel, der das Hauptthema erfasst
2. Ein kurzer Untertitel, der die Aktivität beschreibt
3. Drei konkrete Lernziele
4. Eine Liste der benötigten Materialien und Vorbereitungsschritte
5. Eine detaillierte, schrittweise Beschreibung der Durchführung

{f'Berücksichtige dabei folgende Informationen aus dem PDF-Dokument: {pdf_text}' if pdf_text else ''}

Generiere die Aufgabe EXAKT in der vorgegebenen HTML-Struktur mit den CSS-Klassen."""

    return prompt

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

        if field == 'media_competency':
            # Load the competencies
            competencies = load_media_competencies()
            
            prompt = f"""Wähle eine passende Medienkompetenz aus dem folgenden Lehrplan aus.
            
            Kontext:
            - Klassenstufe: {context['grade']}
            - Fach: {context['subject']}
            - Aktuelles Thema: {context['current_topic']}
            
            Verfügbare Kompetenzen:
            {MEDIA_COMPETENCY_PLAN}
            
            Wähle eine passende inhaltsbezogene Kompetenz aus und gib sie exakt so zurück, wie sie im Plan steht.
            Berücksichtige dabei den Zusammenhang zum Fach und Thema.
            Gib nur die ausgewählte Kompetenz zurück, ohne weitere Erklärungen."""

        else:
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
            prompt = prompts.get(field)

        if not prompt:
            return jsonify({'error': 'Invalid field'}), 400

        response = openai.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            messages=[
                {"role": "system", "content": "Du bist ein hilfreicher Assistent für Lehrkräfte."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
        )

        suggestion = response.choices[0].message.content.strip()
        return jsonify({'suggestion': suggestion})

    except Exception as e:
        print(f"Error in generate-suggestion: {str(e)}")
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
        für den Unterricht zu erstellen. Generiere Aufgaben EXAKT in folgender HTML-Struktur (beachte die Klassen):

        <div class="task-wrapper">
            <h1 class="task-title">[Titel der Aufgabe]</h1>
            <h2 class="task-subtitle">[Prägnanter Untertitel]</h2>
            
            <div class="learning-objectives">
                <h3>Lernziele</h3>
                <ul>
                    <li>[Lernziel 1]</li>
                    <li>[Lernziel 2]</li>
                    <li>[Lernziel 3]</li>
                </ul>
            </div>
            
            <div class="preparation">
                <h3>Vorbereitung</h3>
                <p>[Benötigte Materialien und Vorbereitungsschritte]</p>
            </div>
            
            <div class="implementation">
                <h3>Durchführung</h3>
                <p>[Detaillierte Beschreibung der Durchführung]</p>
            </div>
        </div>

        Wichtig: Halte dich EXAKT an diese HTML-Struktur und die CSS-Klassen. Die Aufgaben sollen den offiziellen Lehrplänen 
        der jeweiligen Klassenstufe entsprechen und die Medienbildungskompetenzen fördern."""

        user_prompt = create_prompt(form_data, pdf_text)
        print(user_prompt)

        # Generate 2 different tasks
        tasks = []
        for i in range(2):
            try:
                response = openai.chat.completions.create(
                    model="gpt-4o-mini-2024-07-18",
                    messages=[
                        {"role": "system", "content": system_prompt},
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

        # Generate structured summaries for each task
        summaries = []
        for task in tasks:
            summary_prompt = """Erstelle eine strukturierte Zusammenfassung der Aufgabe im folgenden Format:
{
    "grade": "Klassenstufe aus der Aufgabe",
    "date": "aktuelles Datum",
    "title": "Haupttitel der Aufgabe (max 40 Zeichen)",
    "subtitle": "Untertitel/Aktivitätsbeschreibung (max 50 Zeichen)",
    "description": "Ausführliche Beschreibung der Aufgabe (max 300 Zeichen)",
    "time": "Zeitdauer",
    "socialForm": "Sozialform",
    "taskType": "Aufgabentyp",
    "tools": "Ja/Nein",
    "subject": "Schulfach"
}

Gib die Antwort **nur** als valides JSON-Objekt zurück, ohne zusätzliche Erklärungen oder Text und gebe jede Angabe an."""

            try:
                summary_response = openai.chat.completions.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "Du bist ein präziser JSON-Generator."},
                        {"role": "user", "content": summary_prompt + "\n\nAufgabe:\n" + task}
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
            except OpenAIError as e:
                print(f"OpenAI API error: {e}")
                return jsonify({'success': False, 'error': 'OpenAI API error: ' + str(e)}), 500
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