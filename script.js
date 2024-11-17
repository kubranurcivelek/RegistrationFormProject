document.addEventListener('DOMContentLoaded', () => {
    // Populate company and subject dropdowns using mock API
    fetch('https://run.mocky.io/v3/70620ece-6a38-4062-9d31-a887a5de305c') // Replace with your mock URL
        .then(response => response.json())
        .then(data => {
            const companySelect = document.getElementById('company');
            const subjectSelect = document.getElementById('subject');

            data.companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company;
                option.textContent = company;
                companySelect.appendChild(option);
            });

            data.subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        });

    // Validate phone number
    const phoneInput = document.getElementById('phoneNumber');
    phoneInput.addEventListener('input', () => {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Please enter a valid 10-digit Turkish phone number.');
        } else {
            phoneInput.setCustomValidity('');
        }
    });

    // Form submission
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'submitted.html';
    });
});
