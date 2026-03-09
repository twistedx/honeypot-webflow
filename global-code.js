        (function () {
            // Check CMS toggle on the page wrapper
            const formValidationEnabled = document.querySelector('[data-form-validation="true"]');
            if (!formValidationEnabled) return;

            // Regex pattern for free email domains, matching any TLD
            const freeEmailPattern = /@(gmail|gmali|gamil|yahoo|ymail|hotmail|outlook|aol|icloud|protonmail|proton|mail|gmx|zoho|tutanota|fastmail|yandex|live|msn)\.\w+$/i;
            const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            function validateEmail(email) {
                if (!basicEmailPattern.test(email)) {
                    return { isValid: false, message: 'Please enter a valid business email' };
                }
                if (freeEmailPattern.test(email)) {
                    return { isValid: false, message: 'Please enter a valid business email' };
                }
                return { isValid: true, message: '' };
            }

            function initForm(formWrapper) {
                const form = formWrapper.querySelector('form');
                if (!form) return;

                const emailInput = form.querySelector('input[type="email"]');
                const input15 = form.querySelector('input[data-input-15]');
                const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
                const errorMessageDiv = form.querySelector('[data-error-message]');

                if (!emailInput || !submitButton) return;

                function validateForm() {
                    const email = emailInput.value.trim();

                    // Silently block submission if input-15 is filled
                    if (input15 && input15.value.trim().length > 0) {
                        submitButton.disabled = true;
                        if (errorMessageDiv) errorMessageDiv.style.display = 'none';
                        return;
                    }

                    const emailValidation = validateEmail(email);
                    if (emailValidation.isValid) {
                        submitButton.disabled = false;
                        if (errorMessageDiv) errorMessageDiv.style.display = 'none';
                    } else {
                        submitButton.disabled = true;
                        if (errorMessageDiv) {
                            errorMessageDiv.style.display = 'block';
                            errorMessageDiv.textContent = emailValidation.message;
                        }
                    }
                }

                emailInput.addEventListener('input', validateForm);
                if (input15) input15.addEventListener('input', validateForm);
            }

            // Apply to all Webflow forms on the page
            document.querySelectorAll('.w-form').forEach(initForm);
        })();
