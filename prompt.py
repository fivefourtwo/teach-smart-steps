
summary_prompt = """Erstelle eine strukturierte Zusammenfassung der Aufgabe im folgenden Format:
{
    "Titel": "Haupttitel der Aufgabe (max 40 Zeichen)",
    "Beschreibung": "Beschreibung der Aufgabe (max 180 Zeichen)",
    "Kompetenzbereich": "Der Titel des ausgwählten Kompetenzbereich aus dem Medienbildungslehrplan",
    "Kompetenzbeschreibung": "Den ausgewählten Inhalt des ausgwählten Kompetenzbereichs",
    "KI-Ergänzung": "Die Parameter die von der KI ergänzt wurden"
}

Gib die Antwort als valides JSON-Objekt zurück, ohne zusätzliche Erklärungen oder Text."""


