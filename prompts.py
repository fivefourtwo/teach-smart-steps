# This file contains all prompt templates used in your application

###################################################
# Name: CSV Media Competency Plan
# Description: Contains the CSV string that holds the updated media competency plan.
###################################################
MEDIA_COMPETENCY_PLAN = '''Kompetenzbereich,Kompetenzbeschreibung,Inhalt 1,Inhalt 2,Inhalt 3,Inhalt 4
Medien Kennenlernen,Verschiedene Medienarten erkennen und ihre Nutzung verstehen,"Medienarten identifizieren: Schüler lernen, verschiedene Medienformate (Print, Audio, Video, digital) zu unterscheiden und deren Nutzungsmöglichkeiten zu verstehen.","Mediengeschichte entdecken: Sie erforschen, wie sich Medien im Laufe der Zeit entwickelt haben und welche gesellschaftliche Rolle sie gespielt haben.","Medieninhalte strukturieren: Kinder lernen, Inhalte in Kategorien wie Information, Unterhaltung und Werbung einzuordnen.","Medientechnologien verstehen: Schüler bekommen Einblicke in grundlegende Technologien, die Medien ermöglichen (z. B. Kameras, Drucker, Apps)."
Einführung des Internets,Das Internet als Informationsquelle sicher nutzen,"Internet verstehen: Schüler lernen die grundlegende Funktion von Browsern und Suchmaschinen kennen und nutzen.","Informationsquellen bewerten: Sie üben, zwischen vertrauenswürdigen und weniger vertrauenswürdigen Quellen zu unterscheiden.","Internetverbindungen nutzen: Sie verstehen, wie man sicher und effizient Verbindungen herstellt und über einen gemeinsamen Bereich Materialien und Dateien mit anderen bearbeiten kann.","Online-Kommunikation kennenlernen: Kinder lernen die Grundlagen von E-Mails, Chats und Foren und deren sicheren Einsatz."
Sicher im Internet,Risiken im Internet erkennen und Daten sicher handhaben,"Digitale Fußabdrücke minimieren: Kinder lernen, ihre Online-Privatsphäre zu schützen und bewusste Entscheidungen über geteilte Daten zu treffen.","Gefahren erkennen: Sie erkennen Risiken wie Viren, Phishing oder Cybergrooming und wissen, wie sie darauf reagieren können.","Gerätesicherheit: Schüler erfahren, wie sie ihre Geräte vor unerlaubtem Zugriff schützen können (z. B. mit Passwörtern oder Updates).","Passwörter erstellen: Sie lernen, sichere und leicht merkbare Passwörter zu entwickeln und regelmäßig zu ändern."
Soziale Netzwerke,Chancen und Gefahren sozialer Netzwerke verstehen,"Profile sicher gestalten: Schüler lernen, wie sie sichere und geeignete Profile in sozialen Netzwerken erstellen.","Cybermobbing vorbeugen: Sie erkennen Anzeichen von Cybermobbing und wissen, wie sie darauf reagieren können.","Chancen nutzen: Kinder reflektieren die positiven Möglichkeiten sozialer Netzwerke (z. B. für Bildung oder Kreativität).","Kommunikationsregeln festlegen: Schüler entwickeln eigene Regeln für respektvolle und sichere Online-Kommunikation."
Werbung und Konsum,Werbung und ihre Einflussmechanismen kritisch hinterfragen,"Werbemechanismen durchschauen: Schüler analysieren, wie Werbung Emotionen und Verhalten beeinflusst.","Produktplatzierungen erkennen: Sie üben, versteckte Werbung in sozialen Medien und Videos zu identifizieren.","Kritisches Konsumverhalten: Kinder lernen, Kaufentscheidungen kritisch zu hinterfragen.","Werbung versus Realität: Schüler vergleichen Werbeversprechen mit der tatsächlichen Qualität von Produkten."
Medienanalyse,Medieninhalte kritisch analysieren und hinterfragen,"Fake News erkennen: Kinder lernen, wie sie Nachrichten auf Glaubwürdigkeit prüfen können.","Visuelle Manipulation: Sie analysieren, wie Bilder und Videos Meinungen beeinflussen können.","Verantwortung verstehen: Schüler reflektieren, welche ethische Verantwortung Medienmacher tragen.","Quellenvielfalt schätzen: Kinder lernen, wie wichtig es ist, Informationen aus unterschiedlichen Quellen zu beziehen."
Medien und ihre Wirkung,Den Einfluss von Medien auf Wahrnehmung und Verhalten reflektieren,"Bildschirmzeit reflektieren: Schüler setzen sich mit ihrem eigenen Medienkonsum auseinander und erarbeiten Strategien für eine gesunde Nutzung.","Mediennutzung anderer beschreiben: Kinder beobachten, wie ihre Mitmenschen Medien nutzen, und analysieren, welche Wirkung das auf sie selbst und andere hat.","Medienabhängigkeit verstehen: Schüler lernen, welche Risiken exzessive Mediennutzung birgt, wie sie Anzeichen von Abhängigkeit erkennen können und welche Strategien helfen, gegenzusteuern.","Wirkung von Medieninhalten: Sie hinterfragen, wie bestimmte Medieninhalte Emotionen und Meinungen gezielt beeinflussen, und erarbeiten Beispiele für positive und negative Effekte."
'''

###################################################
# Name: Create Task Prompt
# Description: Generates a classroom task prompt based on form data and
# optional PDF text input.
###################################################
def create_task_prompt(form_data):
    prompt = f"""Du bist ein KI-Modell, das Lehrkräfte unterstützt, individuelle und zielgerichtete Unterrichtsaufgaben zu entwerfen. Erstelle bitte 2 verschiedene Aufgaben für die Klassenstufe 3, die im Fach {form_data.get('subject', '')} verwendet werden sollen.

Die Aufgabe soll sich auf die Kompetenz "{form_data.get('competency', '')}" beziehen.

Aktuell wird in diesem Fach das Thema "{form_data.get('topic', '')}" besprochen.
(Hinweis: Falls dieser Wert "auto fill" enthält, bestimme bitte ein passendes Thema basierend auf dem Kontext.)

Die Aufgabe soll in der Sozialform "{form_data.get('social_form', '')}" durchgeführt werden.
(Hinweis: Falls dieser Wert "auto fill" enthält, wähle bitte eine geeignete Sozialform.)

Die Aufgabe soll ungefähr {form_data.get('duration', '')} dauern.

Der Aufgabentyp soll "{form_data.get('task_type', '')}" sein.
(Hinweis: Falls dieser Wert "auto fill" enthält, bestimme bitte einen passenden Aufgabentyp.)

Der Einsatz von digitalen Tools ist als "{form_data.get('digital_tools', '')}" angegeben.
(Hinweis: Falls dieser Wert "auto fill" enthält, entscheide bitte, ob und welche digitalen Tools sinnvoll eingesetzt werden.)

Nutze zur Auswahl eines passenden Inhalts den folgenden Medienbildungslehrplan. Wähle einen "Inhalt" aus einem der aufgeführten Kompetenzbereiche aus:
{MEDIA_COMPETENCY_PLAN}

Jede Aufgabe soll folgende Struktur als reiner Plain-Text einhalten:

Aufgabe [Nummer]:
    <h1>Titel der Aufgabe</h1>
    <h2>Untertitel</h2>
    <p>Kurze Beschreibung</p>
    
    <h2>Aufgabenstellung für die Schüler*innen</h2>
    <p>Die Aufgabenstellung für die Schüler*innen</p>
    
    <h2>Schritt für Schritt Anleitung</h2>
    <ul>
        <li><strong>1. Schritt</strong> Beschreibung des ersten Schritts</li>
        <li><strong>2. Schritt:</strong> Beschreibung des zweiten Schritts</li>
        <li><strong>3. Schritt:</strong> Beschreibung des dritten Schritts</li>
        <li><strong>4. Schritt:</strong> Beschreibung des vierten Schritts</li>
        <li><strong>5. Schritt:</strong> Beschreibung des fünften Schritts</li>
        und so weiter
    </ul>
------------------------------------------------------

Generiere den vollständigen Output als reinen Plain-Text und verwende eine klare und motivierende Sprache.

Erstelle 2 unterschiedliche Aufgabenvorschläge, nummeriert 1 und 2.
"""
    return prompt

###################################################
# Name: Media Competency Prompt
# Description: Suggests a suitable media competency based on the provided context.
###################################################
def media_competency_prompt(context):
    """
    Create a prompt to select a media competency based on context.
    """
    return f"""Wähle eine passende Medienkompetenz aus dem folgenden Lehrplan aus.

Kontext:
- Klassenstufe: {context.get('grade', '')}
- Fach: {context.get('subject', '')}
- Aktuelles Thema: {context.get('current_topic', '')}

Verfügbare Kompetenzen:
{MEDIA_COMPETENCY_PLAN}

Wähle eine passende inhaltsbezogene Kompetenz aus und gib sie exakt so zurück, wie sie im Plan steht.
Berücksichtige dabei den Zusammenhang zum Fach und Thema.
Gib nur die ausgewählte Kompetenz zurück, ohne weitere Erklärungen."""

###################################################
# Name: Social Form Prompt
# Description: Provides a suggestion for a suitable social form in class.
###################################################
def social_form_prompt(context):
    """
    Create a prompt for suggesting a social form.
    """
    return f"""Schlage eine passende Sozialform für den Unterricht vor.
Berücksichtige dabei:
- Klassenstufe: {context.get('grade', '')}
- Fach: {context.get('subject', '')}
- Aktuelles Thema: {context.get('current_topic', '')}
Gib nur die Sozialform zurück, ohne weitere Erklärungen."""

###################################################
# Name: Task Format Prompt
# Description: Provides a suggestion for the format of a classroom task.
###################################################
def task_format_prompt(context):
    """
    Create a prompt for suggesting a task format.
    """
    return f"""Schlage ein passendes Aufgabenformat für den Unterricht vor.
Berücksichtige dabei:
- Klassenstufe: {context.get('grade', '')}
- Fach: {context.get('subject', '')}
- Aktuelles Thema: {context.get('current_topic', '')}
Gib nur das Aufgabenformat zurück, ohne weitere Erklärungen."""

###################################################
# Name: Digital Tools Prompt
# Description: Suggests a suitable digital tool based on the provided context.
###################################################
def digital_tools_prompt(context):
    """
    Create a prompt for suggesting a digital tool.
    """
    return f"""Schlage ein passendes digitales Tool für den Unterricht vor.
Berücksichtige dabei:
- Klassenstufe: {context.get('grade', '')}
- Fach: {context.get('subject', '')}
- Aktuelles Thema: {context.get('current_topic', '')}
Gib nur den Namen des Tools zurück, ohne weitere Erklärungen."""

###################################################
# Name: System Task Prompt
# Description: Instructs the model to generate tasks in a specific HTML structure according to official curriculum guidelines.
###################################################
SYSTEM_TASK_PROMPT = """Du bist ein KI-Modell, das Lehrkräften dabei hilft, individuelle und zielgerichtete Aufgaben 
für den Unterricht zu erstellen. Generiere Aufgaben EXAKT in folgender HTML-Struktur (beachte die Klassen):

<div class="task-wrapper">
    <h1 class="task-title">[Titel der Aufgabe]</h1>
    <h2 class="task-subtitle">[Prägnanter Untertitel]</h2>
    
    <div class="learning-objectives">
        <h3>Lernziele</h3>
        <ul>
            <li>[Lernziel 1]</li>
            <li>[Lernziel 2]</li>
            <li>[Medienkompetenz]</li>
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

###################################################
# Name: Structured Summary Prompt
# Description: Generates a JSON-formatted structured summary of the task.
###################################################
SUMMARY_PROMPT = """Erstelle eine strukturierte Zusammenfassung der Aufgabe im folgenden Format:
{
    "Titel": "Haupttitel der Aufgabe (max 40 Zeichen)",
    "Beschreibung": "Beschreibung der Aufgabe (max 180 Zeichen)",
    "Kompetenzbereich": "Der Titel des ausgwählten Kompetenzbereich aus dem Medienbildungslehrplan",
    "Kompetenzbeschreibung": "Den ausgewählten Inhalt des ausgwählten Kompetenzbereichs",
    "KI-Ergänzung": "Die Parameter die von der KI ergänzt wurden"
}

Gib die Antwort als valides JSON-Objekt zurück, ohne zusätzliche Erklärungen oder Text.""" 