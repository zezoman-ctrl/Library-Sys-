document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector('form[action="/signup"]');
    const loginForm = document.querySelector('form[action="/login"]');

    // --- CUSTOM NOTIFICATION FUNCTION ---
    function showToast(message, type = 'success') {
        let toastBox = document.getElementById('toastBox');
        
        // Create the container if it doesn't exist
        if (!toastBox) {
            toastBox = document.createElement('div');
            toastBox.id = 'toastBox';
            document.body.appendChild(toastBox);
        }

        // Create the notification
        let toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'error') {
            toast.classList.add('error');
        }
        toast.innerHTML = message;
        
        toastBox.appendChild(toast);

        // Remove from HTML after animation finishes
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // --- SIGN UP LOGIC ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;

            if (password !== confirm) {
                showToast("Passwords do not match!", "error");
                return;
            }

            let users = JSON.parse(localStorage.getItem('library_users')) || [];

            if (users.find(u => u.email === email)) {
                showToast("An account with this email already exists!", "error");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('library_users', JSON.stringify(users));
            
            showToast("Account created! Redirecting...", "success");
            
            // Wait 1.5 seconds so they can see the message before leaving the page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // --- LOG IN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('library_users')) || [];
            let user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                showToast("Welcome back, " + user.name + "!", "success");
                
                // Wait 1.5 seconds so they can see the message before leaving the page
                setTimeout(() => {
                    window.location.href = "Welcome.html";
                }, 1500);
            } else {
                showToast("Invalid email or password!", "error");
            }
        });
    }
});