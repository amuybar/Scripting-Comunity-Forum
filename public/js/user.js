document.addEventListener('DOMContentLoaded', function() {
  const userContainer = document.getElementById('user-container');

  // Fetch users from /users endpoint
  fetch('/auth/users')
  .then(response => response.json())
  .then(users => {
      // Loop through users and create user cards
      users.forEach(user => {
          const userCard = createUserCard(user);
          userContainer.appendChild(userCard);
      });
  })
  .catch(error => {
      console.error('Error fetching users:', error);
  });

  // Function to create user card
  function createUserCard(user) {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');

      // User profile image
      
      const profileImg = document.createElement('img');
      profileImg.src = user.profile;
      profileImg.alt = 'User Profile';
      profileImg.classList.add('user-profile');
      userCard.appendChild(profileImg);

      // User name
      const userName = document.createElement('div');
      userName.textContent = user.fullName;
      userName.classList.add('user-name');
      userCard.appendChild(userName);

      // User email
      const userEmail = document.createElement('div');
      userEmail.textContent = user.email;
      userEmail.classList.add('user-email');
      userCard.appendChild(userEmail);

      return userCard;
  }
});
