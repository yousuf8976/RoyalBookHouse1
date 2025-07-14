
    function isValidName(name) {
        return /^[a-zA-Z\s]{3,50}$/.test(name.trim());
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function isValidPhone(phone) {
        return /^\+?[0-9]{10,15}$/.test(phone.trim());
    }

    function isValidMessage(message) {
        return message.trim().length >= 10;
    }

    document.querySelectorAll('.consultation-form-fields').forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const phone = form.querySelector('input[name="phone"]').value;
            const service = form.querySelector('select[name="service"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            if (!isValidName(name)) {
                return Swal.fire('Invalid Name', 'Please enter a valid full name (3–50 letters).', 'warning');
            }

            if (!isValidEmail(email)) {
                return Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
            }

            if (!isValidPhone(phone)) {
                return Swal.fire('Invalid Phone', 'Enter a valid phone number with 10–15 digits.', 'warning');
            }

            if (!service) {
                return Swal.fire('Service Required', 'Please select a service.', 'warning');
            }

            if (!isValidMessage(message)) {
                return Swal.fire('Message Too Short', 'Please describe what you’re looking for (at least 10 characters).', 'warning');
            }

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank you!',
                        text: 'Your consultation request has been submitted successfully.',
                        confirmButtonColor: '#226681'
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something went wrong. Please try again later.',
                        confirmButtonColor: '#226681'
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Failed to send the form. Please check your internet connection.',
                    confirmButtonColor: '#226681'
                });
            }
        });
    });
