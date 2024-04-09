// // Function to fetch data from the /question endpoint and render the list view
// async function fetchAndRenderList() {
//   try {
//     const response = await axios.get('/api'); // Fetch data from the /question endpoint
//     const questions = response.data; // Extract the array of questions from the response

//     const listContainer = document.getElementById('listContainer'); // Get the list container element

//     // Loop through each question and create a list item
//     questions.forEach(question => {
//       const listItem = document.createElement('div'); // Create a div for the list item
//       listItem.classList.add('list-item'); // Add the 'list-item' class to the div

//       // Create elements for title, likes, views, answers count, and user
//       const titleLink = document.createElement('a'); // Create a link for the title
//       titleLink.href = '#'; // Add a placeholder href for now
//       titleLink.textContent = question.title; // Set the text content for the title

//       const likesElement = document.createElement('p');
//       likesElement.textContent = 'Likes: ' + question.likes;

//       const viewsElement = document.createElement('p');
//       viewsElement.textContent = 'Views: ' + question.views;

//       const answersElement = document.createElement('p');
//       answersElement.textContent = 'Answers: ' + question.answers;

//       const userElement = document.createElement('p');
//       userElement.textContent = 'Posted by: ' + (question.user ? question.user.username : 'Unknown');

//       const languageElement = document.createElement('p');
//       languageElement.textContent = 'Language: ' + question.language;

//       // Append elements to the list item
//       listItem.appendChild(titleLink);
//       listItem.appendChild(likesElement);
//       listItem.appendChild(viewsElement);
//       listItem.appendChild(answersElement);
//       listItem.appendChild(userElement);
//       listItem.appendChild(languageElement);

//       // Append the list item to the list container
//       listContainer.appendChild(listItem);
//     });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the fetchAndRenderList function when the page loads
// fetchAndRenderList();
