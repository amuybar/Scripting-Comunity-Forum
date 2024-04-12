document.addEventListener('DOMContentLoaded', () => {
  const questionForm = document.querySelector('.question-form');

  questionForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Destructure form values
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const userId = document.getElementById('userId').dataset.userId;
    const language = document.getElementById('language').value;

  

    // Basic validation (optional)
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content for your question');
      return;
    }

    // Construct data object
    const data = {
      title,
      content,
      userId,
      language,
    };

    try {
     
      // Send data to the backend
      const response = await fetch('/api/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert object to JSON string
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Question submitted successfully!');
        window.location.href = '/'; // Redirect to home page
        questionForm.reset();
      } else {
        // Handle non-2xx HTTP status codes
        throw new Error('Failed to submit question');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});
