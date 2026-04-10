document.addEventListener("DOMContentLoaded", () => {
    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!currentUser) {
        window.location.href = "login.html";
        return; 
    }

    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const currentPassInput = document.getElementById('current-password'); 
    const newPassInput = document.getElementById('profile-password');
    const initialsDisplay = document.getElementById('initials');
    const profileForm = document.getElementById('profile-form');

    nameInput.value = currentUser.name;
    emailInput.value = currentUser.email;
    updateInitials(currentUser.name);

    function showToast(message, type = 'success') {
        let toastBox = document.getElementById('toastBox');
        if (!toastBox) {
            toastBox = document.createElement('div');
            toastBox.id = 'toastBox';
            document.body.appendChild(toastBox);
        }
        
        let toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'error') toast.classList.add('error');
        toast.innerHTML = message;
        toastBox.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (currentPassInput.value !== currentUser.password) {
            showToast("Incorrect current password!", "error");
            return; 
        }

        const newName = nameInput.value.trim();
        const newPassword = newPassInput.value;

        currentUser.name = newName;
        if (newPassword !== "") {
            currentUser.password = newPassword;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(currentUser));

        let users = JSON.parse(localStorage.getItem('library_users')) || [];
        let userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('library_users', JSON.stringify(users));
        }

        updateInitials(newName);
        currentPassInput.value = ""; 
        newPassInput.value = "";
        
        if (typeof updateNavbar === 'function') updateNavbar(); 
        showToast("Profile updated successfully!");
    });

    function updateInitials(fullName) {
        let parts = fullName.trim().split(' ');
        if (parts.length >= 2) {
            initialsDisplay.textContent = (parts + parts).toUpperCase();
        } else {
            initialsDisplay.textContent = parts.toUpperCase();
        }
    }
});