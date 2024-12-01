let localStorageUserData = localStorage.getItem("userData");
document.addEventListener('DOMContentLoaded', function() {
  const gigForm = document.getElementById('gigForm');
  const projectsList = document.getElementById('projects');

  gigForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('cryptoType', document.getElementById('cryptoType').value);
    formData.append('time', document.getElementById('time').value);
    formData.append('image', document.getElementById('image').files[0]);

    try {
      const response = await fetch('http://localhost:3000/create-gig', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert('Gig created successfully!');
        gigForm.reset();
        displayProject(data.gig);
      } else{
        alert('Failed to create gig. Please try again.');
      }
    } catch (error){
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });

  function displayProject(project) {
    const li = document.createElement('li');
    const expectedCompletion = new Date(project.time);
    li.innerHTML = `
      <h3>${project?.title}</h3>
      <p>${project?.description}</p>
      <p>Price: ${project?.price} ${project?.cryptoType}</p>
      <p>Category: ${project?.category}</p>
      <p>Expected Completion: ${expectedCompletion?.toDateString()}</p>
    `;

    projectsList.appendChild(li);
  }

  // Load existing projects (you would typically fetch this from your backend)
  function loadProjects() {
    let mockProjects = []
    mockProjects.append({
        title: "List product on Amazon",
        description: "List a new product on Amazon marketplace",
        price: 50,
        category: "E-commerce",
        cryptoType: "BTC",
        time: "2024-08-10"
      });
    mockProjects.forEach(displayProject);
  }
  loadProjects();
});

