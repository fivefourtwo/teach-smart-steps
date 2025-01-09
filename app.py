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
        # Open the PDF file with PyMuPDF
        doc = fitz.open(file_path)
        
        # Iterate through pages
        for page_num in range(len(doc)):
            page = doc[page_num]
            # Extract text from the page with improved formatting
            page_text = page.get_text()
            text += f"[Page {page_num + 1}]:\n{page_text}\n\n"
            
        doc.close()
    except Exception as e:
        print(f"Error reading PDF: {str(e)}")
    return text

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/generate-tasks', methods=['GET', 'POST'])
def generate_tasks():
    if request.method != 'POST':
        return jsonify({'error': 'Only POST method is allowed'}), 405
        
    try:
        input1 = request.form.get('input1', '')
        input2 = request.form.get('input2', '')
        input3 = request.form.get('input3', '')

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
                
                # Get PDF information using PyMuPDF
                doc = fitz.open(file_path)
                pdf_info["processed"] = True
                pdf_info["page_count"] = len(doc)
                
                # Extract text
                pdf_text = extract_text_from_pdf(file_path)
                pdf_info["char_count"] = len(pdf_text)
                
                doc.close()
                os.remove(file_path)

        prompt = f"""Erstelle auf der Grundlage der folgenden Eingaben und des PDF-Inhalts eine Aufgabenanleitung für einen Grundschullehrer :
        Input 1: {input1}
        Input 2: {input2}
        Input 3: {input3}
        
        PDF Content:
        {pdf_text if pdf_text else "No PDF provided"}
        
        Bitte gebe eine umsetzbare Aufgabn an, die sowohl die Eingabefelder als auch alle relevanten Informationen aus der PDF-Datei enthalten."""

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sie sind ein hilfreicher Aufgabengenerator. Erstellen Sie spezifische, umsetzbare Aufgaben auf der Grundlage der vorgegebenen Eingaben und PDF-Inhalte."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
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