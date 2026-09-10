// ==========================================
// TraviXa - Signup Page JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // Get Form Elements
    // ------------------------------------------

    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const signupEmail = document.getElementById("signupEmail");
    const mobile = document.getElementById("mobile");
    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");

    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const signupPasswordToggle =
        document.getElementById("signupPasswordToggle");

    const confirmPasswordToggle =
        document.getElementById("confirmPasswordToggle");

    const socialButtons =
        document.querySelectorAll(".signup-social-button");


    // ------------------------------------------
    // Error Message Function
    // ------------------------------------------

    function showError(input, message) {

        const group = input.closest(".signup-form-group");

        if (!group) return;

        const error = group.querySelector(".signup-error");

        if (error) {
            error.textContent = message;
        }

        group.classList.add("error");
    }


    // ------------------------------------------
    // Clear Error Function
    // ------------------------------------------

    function clearError(input) {

        const group = input.closest(".signup-form-group");

        if (!group) return;

        const error = group.querySelector(".signup-error");

        if (error) {
            error.textContent = "";
        }

        group.classList.remove("error");
    }


    // ------------------------------------------
    // Password Show / Hide
    // ------------------------------------------

    if (signupPasswordToggle) {

        signupPasswordToggle.addEventListener("click", function () {

            if (signupPassword.type === "password") {

                signupPassword.type = "text";

                signupPasswordToggle.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

                signupPasswordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                signupPassword.type = "password";

                signupPasswordToggle.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

                signupPasswordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

        });
    }


    // ------------------------------------------
    // Confirm Password Show / Hide
    // ------------------------------------------

    if (confirmPasswordToggle) {

        confirmPasswordToggle.addEventListener("click", function () {

            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";

                confirmPasswordToggle.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

                confirmPasswordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                confirmPassword.type = "password";

                confirmPasswordToggle.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

                confirmPasswordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

        });
    }


    // ------------------------------------------
    // Email Validation
    // ------------------------------------------

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    // ------------------------------------------
    // Mobile Validation
    // ------------------------------------------

    function validMobile(number) {

        return /^[6-9]\d{9}$/.test(number);
    }


    // ------------------------------------------
    // Date Validation
    // ------------------------------------------

    function validDOB(dateValue) {

        if (!dateValue) return false;

        const selectedDate = new Date(dateValue);
        const today = new Date();

        return selectedDate < today;
    }


    // ------------------------------------------
    // Input Events - Remove Errors
    // ------------------------------------------

    fullName.addEventListener("input", function () {

        clearError(fullName);

    });


    signupEmail.addEventListener("input", function () {

        clearError(signupEmail);

    });


    mobile.addEventListener("input", function () {

        // Allow only numbers
        mobile.value = mobile.value.replace(/\D/g, "");

        clearError(mobile);

    });


    dob.addEventListener("change", function () {

        clearError(dob);

    });


    gender.addEventListener("change", function () {

        clearError(gender);

    });


    signupPassword.addEventListener("input", function () {

        clearError(signupPassword);

    });


    confirmPassword.addEventListener("input", function () {

        clearError(confirmPassword);

    });


    // ------------------------------------------
    // Form Submit
    // ------------------------------------------

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = true;


        // ======================================
        // FULL NAME
        // ======================================

        const nameValue = fullName.value.trim();

        if (nameValue === "") {

            showError(
                fullName,
                "Please enter your full name."
            );

            isValid = false;

        } else if (nameValue.length < 3) {

            showError(
                fullName,
                "Name must contain at least 3 characters."
            );

            isValid = false;

        } else {

            clearError(fullName);

        }


        // ======================================
        // EMAIL
        // ======================================

        const emailValue =
            signupEmail.value.trim();

        if (emailValue === "") {

            showError(
                signupEmail,
                "Please enter your email address."
            );

            isValid = false;

        } else if (!validEmail(emailValue)) {

            showError(
                signupEmail,
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearError(signupEmail);

        }


        // ======================================
        // MOBILE
        // ======================================

        const mobileValue =
            mobile.value.trim();

        if (mobileValue === "") {

            showError(
                mobile,
                "Please enter your mobile number."
            );

            isValid = false;

        } else if (!validMobile(mobileValue)) {

            showError(
                mobile,
                "Please enter a valid 10-digit mobile number."
            );

            isValid = false;

        } else {

            clearError(mobile);

        }


        // ======================================
        // DATE OF BIRTH
        // ======================================

        if (dob.value === "") {

            showError(
                dob,
                "Please select your date of birth."
            );

            isValid = false;

        } else if (!validDOB(dob.value)) {

            showError(
                dob,
                "Please select a valid date of birth."
            );

            isValid = false;

        } else {

            clearError(dob);

        }


        // ======================================
        // GENDER
        // ======================================

        if (gender.value === "") {

            showError(
                gender,
                "Please select your gender."
            );

            isValid = false;

        } else {

            clearError(gender);

        }


        // ======================================
        // PASSWORD
        // ======================================

        const passwordValue =
            signupPassword.value;

        if (passwordValue === "") {

            showError(
                signupPassword,
                "Please create a password."
            );

            isValid = false;

        } else if (passwordValue.length < 8) {

            showError(
                signupPassword,
                "Password must contain at least 8 characters."
            );

            isValid = false;

        } else {

            clearError(signupPassword);

        }


        // ======================================
        // CONFIRM PASSWORD
        // ======================================

        const confirmValue =
            confirmPassword.value;

        if (confirmValue === "") {

            showError(
                confirmPassword,
                "Please confirm your password."
            );

            isValid = false;

        } else if (confirmValue !== passwordValue) {

            showError(
                confirmPassword,
                "Passwords do not match."
            );

            isValid = false;

        } else {

            clearError(confirmPassword);

        }


        // ======================================
        // TERMS & CONDITIONS
        // ======================================

        const termsContainer =
            document.querySelector(".signup-terms");

        const termsError =
            document.getElementById("termsError");

        if (!terms.checked) {

            if (termsError) {

                termsError.textContent =
                    "Please accept the Terms & Conditions.";

            }

            if (termsContainer) {

                termsContainer.classList.add("error");

            }

            isValid = false;

        } else {

            if (termsError) {

                termsError.textContent = "";

            }

            if (termsContainer) {

                termsContainer.classList.remove("error");

            }

        }


        // ======================================
        // Stop if Invalid
        // ======================================

        if (!isValid) {

            return;

        }


        // ======================================
        // Save User Data
        // ======================================
        // Frontend demo only.
        // Real authentication will be handled
        // securely through the backend later.
        // ======================================

        const userData = {

            name: nameValue,

            email: emailValue,

            mobile: mobileValue,

            dob: dob.value,

            gender: gender.value

        };


        localStorage.setItem(
            "travixaUser",
            JSON.stringify(userData)
        );


        // ======================================
        // Mark User as Logged In
        // ======================================

        localStorage.setItem(
            "travixaLoggedIn",
            "true"
        );

        // ======================================
        // Show Success Modal
        // ======================================

        const successModal =
            document.getElementById("successModal");

        const continueDashboard =
            document.getElementById("continueDashboard");

        if (successModal) {

            successModal.classList.add("show");

            successModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        // ======================================
        // Continue to Dashboard
        // ======================================

        if (continueDashboard) {

            continueDashboard.addEventListener(
                "click",
                function () {

                    window.location.href = "dashboard.html";

                }
            );

        }

    });


    // ------------------------------------------
    // Social Buttons
    // ------------------------------------------

    socialButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const provider =
                button.dataset.provider;

            alert(
                provider +
                " signup will be available after backend authentication is connected."
            );

        });

    });


    // ------------------------------------------
    // Terms Checkbox
    // ------------------------------------------

    terms.addEventListener("change", function () {

        const termsContainer =
            document.querySelector(".signup-terms");

        const termsError =
            document.getElementById("termsError");

        if (terms.checked) {

            if (termsContainer) {

                termsContainer.classList.remove("error");

            }

            if (termsError) {

                termsError.textContent = "";

            }

        }

    });

});