document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const socialButtons =
        document.querySelectorAll(".social-button");


    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================= */

    passwordToggle.addEventListener(
        "click",
        function () {

            const icon =
                passwordToggle.querySelector("i");

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

        }
    );


    /* =========================================
       LOGIN
    ========================================= */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearErrors();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            let valid = true;


            /* Email */

            if (!email) {

                emailError.textContent =
                    "Please enter your email address.";

                valid = false;

            } else if (!isValidEmail(email)) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            /* Password */

            if (!password) {

                passwordError.textContent =
                    "Please enter your password.";

                valid = false;

            } else if (password.length < 6) {

                passwordError.textContent =
                    "Password must contain at least 6 characters.";

                valid = false;

            }


            if (!valid) {
                return;
            }


            /* =====================================
               TEMPORARY FRONTEND AUTHENTICATION
               Backend will be connected later.
            ===================================== */

            const user = {
                name: email.split("@")[0],
                email: email
            };


            localStorage.setItem(
                "travixaUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "travixaLoggedIn",
                "true"
            );


            const params = new URLSearchParams(window.location.search);
            const redirect = params.get('redirect');
            window.location.href = redirect || 'dashboard.html';

        }
    );


    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =========================================
       CLEAR ERRORS
    ========================================= */

    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";

    }


    /* =========================================
       FORGOT PASSWORD
    ========================================= */

    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Password recovery will be connected after backend integration."
            );

        }
    );


    /* =========================================
       SOCIAL LOGIN
    ========================================= */

    socialButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const provider =
                        button.dataset.provider;

                    alert(
                        provider +
                        " login will be connected during backend integration."
                    );

                }
            );

        }
    );

});