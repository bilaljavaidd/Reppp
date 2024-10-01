// Fetch GitHub Events for recent activity
document.addEventListener('DOMContentLoaded', function () {
    const username = 'your-username'; // Replace with your GitHub username
    const activityList = document.getElementById('activity-list');

    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(response => response.json())
        .then(events => {
            if (events.length === 0) {
                activityList.innerHTML = '<p>No recent activity found.</p>';
                return;
            }

            // Loop through the recent events
            events.slice(0, 5).forEach(event => {
                const listItem = document.createElement('li');
                listItem.classList.add('activity-item');

                const eventType = event.type.replace(/([A-Z])/g, ' $1'); // Split camel case (e.g., "PushEvent" -> "Push Event")
                const repoName = event.repo.name;
          
                listItem.innerHTML = `<strong>${eventType}</strong> on <a href="https://github.com/${repoName}" target="_blank">${repoName}</a>`;
                activityList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub activity:', error);
            activityList.innerHTML = '<p>Error loading activity.</p>';
        });
});
