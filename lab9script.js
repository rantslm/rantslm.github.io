
document.addEventListener('DOMContentLoaded', function() {
    feather.replace({ width: 16, height: 16 });
    
    // Replace with your actual GitHub username
    const username = 'rantslm';
    
    // Fetch GitHub projects
    fetch(`https://api.github.com/users/${rantslm}/repos?sort=updated`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('projects');
            projectsContainer.innerHTML = ''; // Clear any existing content
            
            data.slice(0, 6).forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card bg-white bg-opacity-80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1';
                
                // Use repo language for category image
                const category = repo.language ? repo.language.toLowerCase() : 'technology';
                const imgUrl = `http://static.photos/${category}/640x360/${Math.floor(Math.random() * 100)}`;
                
                card.innerHTML = `
                    <div class="relative h-48 overflow-hidden">
                        <img src="${imgUrl}" alt="${repo.name}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold text-gray-800">${repo.name}</h3>
                        <p class="text-gray-600 mt-2 text-sm">${repo.description || 'No description provided'}</p>
                        <div class="mt-4 flex items-center">
                            <span class="text-xs text-gray-500 mr-3">${repo.language || 'Various'}</span>
                            <a href="${repo.html_url}" class="ml-auto text-pink-500 hover:text-pink-600" target="_blank">
                                <i data-feather="github"></i>
                            </a>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
            feather.replace();
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            document.getElementById('projects').innerHTML = `
                <div class="col-span-2 text-center py-10 text-gray-500">
                    <i data-feather="alert-triangle" class="mx-auto w-12 h-12 text-red-400"></i>
                    <p class="mt-3">Failed to load projects. Please check your GitHub username and try again.</p>
                </div>
            `;
            feather.replace();
        });
});
```