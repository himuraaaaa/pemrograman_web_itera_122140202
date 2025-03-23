document.getElementById("validationForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;


    if (name.length <= 3) {
        document.getElementById("nameError").innerText = "Nama harus lebih dari 3 karakter.";
        isValid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Email tidak valid.";
        isValid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    if (password.length < 8) {
        document.getElementById("passwordError").innerText = "Password harus minimal 8 karakter.";
        isValid = false;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    if (isValid) {
        document.getElementById("formStatus").innerText = "Form berhasil disubmit!";
    } else {
        document.getElementById("formStatus").innerText = "";
    }
});
