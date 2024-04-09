


function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
      
      window.location.href = '/auth/logout';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
      logoutButton.addEventListener('click', confirmLogout);
  }
});


//open drawer
function openSidebar() {
  document.body.classList.add('sidebar-open');
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
}

document.querySelector('.menu-icon').addEventListener('click', openSidebar);
document.querySelector('.close-btn').addEventListener('click', closeSidebar);


//search functionality
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('focus', function() {
  
  const searchResults = ['Result 1', 'Result 2', 'Result 3'];

  
  searchDropdown.innerHTML = '';

  
  searchResults.forEach(result => {
    const item = document.createElement('div');
    item.classList.add('search-item');
    item.textContent = result;
    item.addEventListener('click', function() {
      searchInput.value = result;
      searchDropdown.style.display = 'none';
    });
    searchDropdown.appendChild(item);
  });

  
  searchDropdown.style.display = 'block';
});

document.addEventListener('click', function(event) {
  if (!searchDropdown.contains(event.target) && event.target !== searchInput) {
    searchDropdown.style.display = 'none';
  }
});
