document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the task form submission
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = 'Generiere Aufgaben...';

        try {
            // Create FormData from the form; only include needed fields
            const formData = new FormData(e.target);

            const response = await fetch('http://127.0.0.1:5000/generate-tasks', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                // Save the generated task(s) in localStorage
                localStorage.setItem('generatedTasks', JSON.stringify(data.tasks));
                // Redirect directly to TaskDetail for the first task (task index 0)
                window.location.href = `/task/direct/0`;
            } else {
                resultDiv.innerHTML = `<p class="error">Fehler: ${data.error}</p>`;
            }
        } catch (error) {
            resultDiv.innerHTML = `<p class="error">Fehler: ${error.message}</p>`;
        }
    });
});