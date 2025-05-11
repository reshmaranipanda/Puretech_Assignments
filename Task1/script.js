const users = [
  { name: "Alice Johnson", email: "alice@example.com", gender: "Female", country: "USA", age: 24 },
  { name: "Bob Smith", email: "bob@example.com", gender: "Male", country: "UK", age: 32 },
  { name: "Carla Diaz", email: "carla@example.com", gender: "Female", country: "Spain", age: 28 },
  { name: "Daniel Kim", email: "daniel@example.com", gender: "Male", country: "South Korea", age: 35 },
  { name: "Eva Müller", email: "eva@example.com", gender: "Female", country: "Germany", age: 27 },
  { name: "Frank Wu", email: "frank@example.com", gender: "Male", country: "China", age: 29 },
  { name: "Grace Lee", email: "grace@example.com", gender: "Female", country: "Singapore", age: 31 },
  { name: "Henry Ford", email: "henry@example.com", gender: "Male", country: "USA", age: 40 },
  { name: "Isabel Lopez", email: "isabel@example.com", gender: "Female", country: "Mexico", age: 26 },
  { name: "Jack O’Neill", email: "jack@example.com", gender: "Male", country: "Ireland", age: 36 },
  { name: "Katrina Silva", email: "katrina@example.com", gender: "Female", country: "Brazil", age: 23 },
  { name: "Liam Patel", email: "liam@example.com", gender: "Male", country: "India", age: 30 },
  { name: "Mona Singh", email: "mona@example.com", gender: "Female", country: "India", age: 22 },
  { name: "Nate Brown", email: "nate@example.com", gender: "Male", country: "Canada", age: 34 },
  { name: "Olivia Chen", email: "olivia@example.com", gender: "Female", country: "Taiwan", age: 28 },
  { name: "Paul White", email: "paul@example.com", gender: "Male", country: "Australia", age: 33 },
  { name: "Quinn Garcia", email: "quinn@example.com", gender: "Female", country: "Argentina", age: 25 },
  { name: "Ryan Khan", email: "ryan@example.com", gender: "Male", country: "Pakistan", age: 31 },
  { name: "Sophie Dubois", email: "sophie@example.com", gender: "Female", country: "France", age: 26 },
  { name: "Tom Anders", email: "tom@example.com", gender: "Male", country: "Sweden", age: 29 },
  { name: "Uma Patel", email: "uma@example.com", gender: "Female", country: "India", age: 27 },
  { name: "Victor Hugo", email: "victor@example.com", gender: "Male", country: "France", age: 38 },
  { name: "Wendy Brown", email: "wendy@example.com", gender: "Female", country: "USA", age: 24 },
  { name: "Xavier Lee", email: "xavier@example.com", gender: "Male", country: "Singapore", age: 30 },
  { name: "Yara Silva", email: "yara@example.com", gender: "Female", country: "Brazil", age: 29 },
  { name: "Zane Carter", email: "zane@example.com", gender: "Male", country: "Canada", age: 33 },
  { name: "Amy Wong", email: "amy@example.com", gender: "Female", country: "China", age: 25 },
  { name: "Brian Cox", email: "brian@example.com", gender: "Male", country: "UK", age: 37 },
  { name: "Carmen Diaz", email: "carmen@example.com", gender: "Female", country: "Spain", age: 28 },
  { name: "David Kim", email: "david@example.com", gender: "Male", country: "South Korea", age: 34 }
];

let currentSortKey = 'name';
let currentSortOrder = 'asc';

function displayTable(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";
  data.forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.gender}</td>
        <td>${user.country}</td>
        <td>${user.age}</td>
      </tr>
    `;
  });
}

function sortTable(key, order) {
  currentSortKey = key;
  currentSortOrder = order;

  users.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // For string comparison, case-insensitive
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  applyFilters(); // Reapply filters after sorting
  closeAllSortMenus();
}

function applyFilters() {
  const genderFilter = document.getElementById("genderFilter").value;
  const countryFilter = document.getElementById("countryFilter").value;

  let filteredUsers = users;

  if (genderFilter !== "all") {
    filteredUsers = filteredUsers.filter(user => user.gender === genderFilter);
  }
  if (countryFilter !== "all") {
    filteredUsers = filteredUsers.filter(user => user.country === countryFilter);
  }

  displayTable(filteredUsers);
}

function populateCountryFilter() {
  const countryFilter = document.getElementById("countryFilter");
  const countries = [...new Set(users.map(user => user.country))].sort();

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });
}

function toggleSortMenu(event, key) {
  event.stopPropagation();
  const menuId = 'sort-menu-' + key;
  const menu = document.getElementById(menuId);
  const isVisible = menu.style.display === 'block';

  // Close all menus first
  closeAllSortMenus();

  // Toggle current menu
  menu.style.display = isVisible ? 'none' : 'block';
}

function closeAllSortMenus() {
  document.querySelectorAll('.sort-menu').forEach(menu => (menu.style.display = 'none'));
}

// Close menus when clicking outside
window.addEventListener('click', closeAllSortMenus);

// Initialize table and filters on page load
window.onload = () => {
  populateCountryFilter();
  sortTable(currentSortKey, currentSortOrder);
};
