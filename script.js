const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const loginSendOtpBtn = document.getElementById("loginSendOtpBtn");
const registerSendOtpBtn = document.getElementById("registerSendOtpBtn");
const otpPopup = document.getElementById("otpPopup");
const submitOtpBtn = document.getElementById("submitOtpBtn");
const otpInput = document.getElementById("otpInput");
const otpStatus = document.getElementById("otpStatus");
const successMessage = document.getElementById("successMessage");

// Simulate loading delay
setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    container.style.display = "block";
}, 3000); // 3 seconds delay

// Toggle between Login and Register forms
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Validate Email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate Name (for registration)
function validateName(name) {
    return name.trim().length > 0;
}

// Validate OTP
function validateOTP(otp) {
    return otp.length === 6 && /^\d+$/.test(otp); // OTP must be 6 digits
}

// Show Error Message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    if (!errorMessage) {
        const error = document.createElement("p");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "12px";
        error.textContent = message;
        formGroup.appendChild(error);
    } else {
        errorMessage.textContent = message;
    }
}

// Clear Error Message
function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Handle Send OTP for Login
loginSendOtpBtn.addEventListener("click", () => {
    const email = document.getElementById("loginForm").querySelector("input[type='email']").value;

    // Clear previous errors
    clearError(document.getElementById("loginForm").querySelector("input[type='email']"));

    // Validate Email
    if (!validateEmail(email)) {
        showError(document.getElementById("loginForm").querySelector("input[type='email']"), "Please enter a valid email address.");
        return;
    }

    // If validation passes, proceed to send OTP
    otpPopup.style.display = "flex";
    alert("OTP sent to your email (Login). Use 111111 for testing.");
});

// Handle Send OTP for Register
registerSendOtpBtn.addEventListener("click", () => {
    const name = document.getElementById("registerForm").querySelector("input[type='text']").value;
    const email = document.getElementById("registerForm").querySelector("input[type='email']").value;

    // Clear previous errors
    clearError(document.getElementById("registerForm").querySelector("input[type='text']"));
    clearError(document.getElementById("registerForm").querySelector("input[type='email']"));

    // Validate Name
    if (!validateName(name)) {
        showError(document.getElementById("registerForm").querySelector("input[type='text']"), "Please enter your name.");
        return;
    }

    // Validate Email
    if (!validateEmail(email)) {
        showError(document.getElementById("registerForm").querySelector("input[type='email']"), "Please enter a valid email address.");
        return;
    }

    // If validation passes, proceed to send OTP
    otpPopup.style.display = "flex";
    alert("OTP sent to your email (Register). Use 111111 for testing.");
});

// Submit OTP
submitOtpBtn.addEventListener("click", () => {
    const otp = otpInput.value;

    // Clear previous errors
    clearError(otpInput);

    // Validate OTP
    if (!validateOTP(otp)) {
        showError(otpInput, "OTP must be 6 digits.");
        return;
    }

    if (otp === "111111") {
        otpStatus.textContent = "OTP Verified";
        setTimeout(() => {
            otpPopup.style.display = "none";
            otpStatus.textContent = "";
            otpInput.value = "";
            successMessage.style.display = "block"; // Show success message
            container.style.display = "none"; // Hide the main container
        }, 1500);
    } else {
        otpStatus.textContent = "Invalid OTP";
    }
});