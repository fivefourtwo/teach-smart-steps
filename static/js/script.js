document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Generating tasks...';

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
                        <h4>PDF Processing Information:</h4>
                        <p>Filename: ${data.pdf_info.filename}</p>
                        <p>Pages processed: ${data.pdf_info.page_count}</p>
                        <p>Characters extracted: ${data.pdf_info.char_count}</p>
                        <details>
                            <summary>Show PDF Content Preview</summary>
                            <pre class="pdf-preview">${data.pdf_text}</pre>
                        </details>
                    </div>
                `;
            }

            resultDiv.innerHTML = `
                ${pdfInfoHtml}
                <h3>Generated Tasks:</h3>
                ${data.tasks}
                <p><small>Generated at: ${data.timestamp}</small></p>
            `;
        } else {
            resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});