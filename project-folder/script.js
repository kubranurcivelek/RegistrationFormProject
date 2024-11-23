document.addEventListener('DOMContentLoaded', () => {
    // Mock API URLs
    const mockApiUrl = 'https://run.mocky.io/v3/70620ece-6a38-4062-9d31-a887a5de305c'; // Company and Subject API URL
    const mockAreaCodeUrl = 'https://run.mocky.io/v3/7838b23b-a775-4529-8734-db4f4984b6f0'; // Area Code API URL

    // DOM Elements
    const companySelect = document.getElementById('company');
    const subjectSelect = document.getElementById('subject');
    const areaCodeSelect = document.getElementById('areaCode');
    const phoneInput = document.getElementById('phoneNumber');
    const form = document.getElementById('registrationForm');
    const leftAdCloseBtn = document.querySelector('.left-ad .close-ad');
    const rightAdCloseBtn = document.querySelector('.right-ad .close-ad');

    /**
     * Populate dropdowns from mock API
     */
    const populateDropdown = async (url, dropdown, key) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data = await response.json();
            data[key].forEach((item) => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                dropdown.appendChild(option);
            });
        } catch (error) {
            console.error(`Error populating dropdown (${key}):`, error);
            alert(`Failed to load ${key} data. Please try again later.`);
        }
    };

    /**
     * Validate phone number input
     * Turkish phone number format: 5xx xxx xx xx
     */
    const validatePhoneNumber = () => {
        // Regular expression for Turkish phone number (10 digits starting with 5xx)
        const regex = /^5\d{2} \d{3} \d{2} \d{2}$/; // Matches: 5xx xxx xx xx
        if (!regex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Please enter a valid Turkish phone number in the format 5xx xxx xx xx.');
        } else {
            phoneInput.setCustomValidity('');
        }
    };

    /**
     * Handle form submission
     */
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Optionally, add any additional form validation logic here

        // Redirect to form-submitted.html upon successful form submission
        window.location.href = 'form-submitted.html';
    };

    /**
     * Close left ad
     */
    const closeLeftAd = () => {
        const leftAd = document.querySelector('.left-ad');
        if (leftAd) leftAd.remove();
    };

    /**
     * Close right ad
     */
    const closeRightAd = () => {
        const rightAd = document.querySelector('.right-ad');
        if (rightAd) rightAd.remove();
    };

    // Initialize functions
    populateDropdown(mockApiUrl, companySelect, 'companies');
    populateDropdown(mockApiUrl, subjectSelect, 'subjects');
    populateDropdown(mockAreaCodeUrl, areaCodeSelect, 'areaCodes'); // Fetch area codes
    phoneInput.addEventListener('input', validatePhoneNumber);

    // Add placeholder to phone input to guide user
    phoneInput.placeholder = '5xx xxx xx xx'; // Show example format in input field

    form.addEventListener('submit', handleFormSubmit); // Handle form submission

    // Handle ad closures
    if (leftAdCloseBtn) {
        leftAdCloseBtn.addEventListener('click', closeLeftAd);
    }
    if (rightAdCloseBtn) {
        rightAdCloseBtn.addEventListener('click', closeRightAd);
    }
});
