document.addEventListener('DOMContentLoaded', () => {
  const forgotForm = document.getElementById('forgotForm');

  forgotForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;

    // Send a POST request to the backend to initiate password reset
    try {
      const response = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) // Send email in JSON format
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message); // Show success message
      } else {
        const errorMessage = await response.text();
        alert('Error: ' + errorMessage); // Show error message
      }
    } catch (error) {
      console.error('Error submitting forgot password form:', error);
      alert('An error occurred. Please try again later.'); // Show generic error message
    }
  });
});
