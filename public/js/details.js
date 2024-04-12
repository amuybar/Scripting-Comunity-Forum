// submiting our data
document.getElementById('comment-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  // define form data
  const answerText = document.getElementById('comment-textarea').value;
  const forumId = document.getElementById('forumId').dataset.userId; 
  const selfId = document.getElementById('selfId').dataset.userId;  

  fetch('/api/answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer: answerText, forumId: forumId, selfId: selfId }) 
  })
  .then(response => response.json())
  .then(data => {
    
   // Clear the form
    document.getElementById('comment-textarea').value = ''; 
    // Reload the page
    location.reload();
  })
  .catch(error => {
    console.error('Error submitting answer:', error);
    
    
  });
});
