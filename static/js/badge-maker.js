document.addEventListener('DOMContentLoaded', function() {
    const badgeForm = document.getElementById('badgeForm');
    if (badgeForm) {
        badgeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                criteria: document.getElementById('criteria').value,
                icon_path: '/static/icons/default-badge.svg'
            };

            try {
                const response = await fetch('/api/badges', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Badge created successfully!');
                    location.reload();
                } else {
                    alert('Error creating badge');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error creating badge');
            }
        });
    }
});
