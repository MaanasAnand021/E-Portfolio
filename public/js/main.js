document.addEventListener('DOMContentLoaded', function() {
    const username = 'MaanasAnand021';
    const reposContainer = document.getElementById('github-repos');
    
    // Fetch GitHub repositories
    if (reposContainer) {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub repositories');
                }
                return response.json();
            })
            .then(repos => {
                // Filter to only include the first 3 repositories
                const recentRepos = repos.slice(0, 3);
                
                // Clear loading message
                reposContainer.innerHTML = '';
                
                if (recentRepos.length === 0) {
                    reposContainer.innerHTML = `
                        <div class="github-error">
                            <p>No repositories found for ${username}</p>
                        </div>
                    `;
                    return;
                }
                
                // Display repositories
                recentRepos.forEach(repo => {
                    const repoCard = document.createElement('div');
                    repoCard.className = 'project-card';
                    
                    // Format the description to remove emoji and other non-standard characters
                    let description = repo.description || 'No description provided';
                    description = description.replace(/:[a-zA-Z0-9_]+:/g, '').trim();
                    
                    repoCard.innerHTML = `
                        <div class="project-content">
                            <h3>${repo.name}</h3>
                            <p>${description}</p>
                            <div class="project-meta">
                                <span><i class="fas fa-code-branch"></i> ${repo.language || 'Not specified'}</span>
                                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                                <span><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>
                            </div>
                            <a href="${repo.html_url}" target="_blank" class="project-link">
                                View on GitHub <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    `;
                    
                    reposContainer.appendChild(repoCard);
                });
            })
            .catch(error => {
                console.error('Error fetching GitHub repositories:', error);
                reposContainer.innerHTML = `
                    <div class="github-error">
                        <p>Error loading GitHub repositories: ${error.message}</p>
                        <p>Please check the username or try again later.</p>
                    </div>
                `;
            });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            });
        });
    }
});
