const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('searchBtn');
const profileCard = document.getElementById('profileCard');
const error = document.getElementById('error');

async function fetchGitHubProfile(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }
        
        const data = await response.json();
        displayProfile(data);
    } catch (err) {
        showError('User not found. Please try another username.');
    }
}

function displayProfile(user) {
    profileCard.innerHTML = `
        <div class="profile-header">
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            <div class="profile-info">
                <h2 class="name">${user.name || user.login}</h2>
                <p class="username">@${user.login}</p>
                <p class="bio">${user.bio || 'No bio available'}</p>
            </div>
        </div>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${user.public_repos}</div>
                <div class="stat-label">Repos</div>
            </div>
            <div class="stat">
                <div class="stat-value">${user.followers}</div>
                <div class="stat-label">Followers</div>
            </div>
            <div class="stat">
                <div class="stat-value">${user.following}</div>
                <div class="stat-label">Following</div>
            </div>
        </div>
        <div class="details">
            <div class="detail-item">📍 ${user.location || 'Not specified'}</div>
            <div class="detail-item">🏢 ${user.company || 'Not specified'}</div>
            <div class="detail-item">🔗 ${user.blog || 'No website'}</div>
            <div class="detail-item">📅 Joined ${new Date(user.created_at).toLocaleDateString()}</div>
        </div>
        <a href="${user.html_url}" target="_blank" class="link-btn">View GitHub Profile</a>
    `;
    
    profileCard.classList.remove('hidden');
    error.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    profileCard.classList.add('hidden');
}

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubProfile(username);
    }
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubProfile(username);
        }
    }
});
