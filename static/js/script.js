document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const field = e.target.dataset.field;
            const button = e.target;
            const input = document.getElementById(field);
            
            // Get context from form
            const context = {
                field: field,
                grade: document.getElementById('grade').value,
                subject: document.getElementById('subject').value,
                current_topic: document.getElementById('current_topic').value
            };

            // Check if required context is available
            if (!context.grade || !context.subject || !context.current_topic) {
                alert('Bitte füllen Sie zuerst die Felder "Klassenstufe", "Fach" und "Aktuelles Thema" aus.');
                return;
            }

            // Disable button and show loading state
            button.disabled = true;
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="loading-spinner"></span>Lädt...';

            try {
                const response = await fetch('/generate-suggestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(context)
                });

                const data = await response.json();

                if (data.suggestion) {
                    input.value = data.suggestion;
                } else if (data.error) {
                    alert('Fehler beim Generieren des Vorschlags: ' + data.error);
                }
            } catch (error) {
                alert('Fehler beim Generieren des Vorschlags: ' + error.message);
            } finally {
                // Restore button state
                button.disabled = false;
                button.innerHTML = originalText;
            }
        });
    });

    // Existing form submission handler
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 'Generiere Aufgaben...';

        try {
            const formData = new FormData(e.target);
            const pdfFile = document.getElementById('pdfFile').files[0];
            
            if (pdfFile) {
                formData.append('pdfFile', pdfFile);
            }

            const response = await fetch('/generate-tasks', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                let pdfInfoHtml = '';
                if (data.pdf_info.processed) {
                    pdfInfoHtml = `
                        <div class="pdf-info">
                            <h4>PDF Informationen:</h4>
                            <p>Dateiname: ${data.pdf_info.filename}</p>
                            <p>Anzahl Seiten: ${data.pdf_info.page_count}</p>
                            <p>Zeichen extrahiert: ${data.pdf_info.char_count}</p>
                            <details>
                                <summary>PDF Inhalt Vorschau</summary>
                                <pre class="pdf-preview">${data.pdf_text}</pre>
                            </details>
                        </div>
                    `;
                }

                resultDiv.innerHTML = `
                    ${pdfInfoHtml}
                    <h3>Generierte Aufgaben:</h3>
                    ${data.tasks}
                    <p><small>Generiert am: ${data.timestamp}</small></p>
                `;
            } else {
                resultDiv.innerHTML = `<p class="error">Fehler: ${data.error}</p>`;
            }
        } catch (error) {
            resultDiv.innerHTML = `<p class="error">Fehler: ${error.message}</p>`;
        }
    });
});