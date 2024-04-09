const { use } = require("passport");

document.addEventListener('DOMContentLoaded', () => {
  const questionForm = document.querySelector('form');

  questionForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Basic validation (optional)
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content for your question');
      return;
    }
    const userId = document.getElementById('userId').value;
    console.log(userId);
   
    const data = {
      title,
      content,
      userId,
    };

    fetch('/api/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Send data as JSON
      },
      body: JSON.stringify(data), // Convert object to JSON string
    })
      .then(response => response.json()) // Parse JSON response (if any)
      .then(responseData => {
        // Handle successful response
        if (responseData.success) {
          alert('Question submitted successfully!');
          window.location.href = '/';
          questionForm.reset();
          
        } else {
          alert('There was an error submitting your question. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error submitting question:', error);
        alert('An error occurred. Please try again later.');
      });
  });
});


