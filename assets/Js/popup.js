document.getElementById("discountForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const emailInput = form.querySelector('input[type="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const phonePattern = /^\+1\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (nameInput.value.trim().length < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'Please enter your full name.',
        });
        return;
    }

    if (!emailPattern.test(emailInput.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    if (!phonePattern.test(phoneInput.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Phone',
            text: 'Please enter a valid US phone number.',
        });
        return;
    }

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your 20% off code has been sent to your email.',
            });
            form.reset();
        } else {
            throw new Error("Network response failed");
        }
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modalOverlay");
    const closeButton = document.getElementById("closeButton");
    const continueShoppingLink = document.getElementById("continueShopping");
    const openButtons = document.querySelectorAll(".open-discount-modal");

    const showModal = () => {
        document.body.classList.add("no-scroll"); // Disable scroll
        modalOverlay.style.display = "flex";
        setTimeout(() => {
            modalOverlay.classList.add("show");
            modalOverlay.classList.remove("fade-out");
        }, 10);
    };

    const hideModal = () => {
        modalOverlay.classList.remove("show");
        modalOverlay.classList.add("fade-out");
        modalOverlay.addEventListener("animationend", function handler() {
            modalOverlay.style.display = "none";
            modalOverlay.classList.remove("fade-out");
            document.body.classList.remove("no-scroll"); // Re-enable scroll
            modalOverlay.removeEventListener("animationend", handler);
        }, { once: true });
    };

    closeButton.addEventListener("click", hideModal);
    continueShoppingLink.addEventListener("click", (event) => {
        event.preventDefault();
        hideModal();
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            hideModal();
        }
    });

    showModal();

    openButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showModal();
        });
    });
});
