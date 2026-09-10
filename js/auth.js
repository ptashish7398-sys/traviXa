/* TraviXa shared authentication and navigation state */
(function () {
    const loggedIn = localStorage.getItem('travixaLoggedIn') === 'true';
    let user = null;
    try { user = JSON.parse(localStorage.getItem('travixaUser') || 'null'); } catch (e) { user = null; }

    const protectedPages = ['dashboard.html','saved-trips.html','profile.html','settings.html','map.html','weather.html'];
    const page = location.pathname.split('/').pop() || 'home.html';
    if (protectedPages.includes(page) && !loggedIn) {
        location.replace('login.html?redirect=' + encodeURIComponent(page));
        return;
    }

    window.TraviXaAuth = {
        isLoggedIn: loggedIn,
        user,
        logout() {
            localStorage.removeItem('travixaLoggedIn');
            localStorage.removeItem('travixaUser');
            location.href = 'home.html';
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const name = user?.name || user?.fullName || 'Traveler';
        document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = name);
        document.querySelectorAll('[data-user-initial]').forEach(el => el.textContent = name.charAt(0).toUpperCase());

        document.querySelectorAll('[data-auth-only]').forEach(el => {
            el.style.display = loggedIn ? '' : 'none';
        });

        document.querySelectorAll('[data-guest-only]').forEach(el => {
            el.style.display = loggedIn ? 'none' : '';
        });

        document.querySelectorAll('a[href="login.html"]').forEach(a => {
            if (loggedIn) {
                a.href = 'dashboard.html';
                a.textContent = 'Dashboard';
                a.classList.add('auth-dashboard-link');
            }
        });

        document.querySelectorAll('a[href="signup.html"]').forEach(a => {
            if (loggedIn) a.style.display = 'none';
        });

        if (loggedIn) {
            document.querySelectorAll('.actions').forEach(container => {
                if (!container.querySelector('[data-logout]')) {
                    const link = document.createElement('a');
                    link.href = 'home.html';
                    link.textContent = 'Logout';
                    link.className = 'btn outline';
                    link.dataset.logout = 'true';
                    container.appendChild(link);
                }
            });
        }

        document.querySelectorAll('[data-logout]').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                window.TraviXaAuth.logout();
            });
        });
    });
})();
