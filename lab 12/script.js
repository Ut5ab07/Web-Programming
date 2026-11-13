const form = document.querySelector('#visitor-form');
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const result = document.querySelector('#result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const age = Number(ageInput.value);

    result.hidden = false;
    result.className = 'result';

    if (!name || !Number.isInteger(age) || age < 0) {
        result.classList.add('error');
        result.textContent = 'Please enter a valid name and age.';
        return;
    }

    if (age < 18) {
        result.classList.add('warning');
        result.textContent = `Hello ${name}, you are not authorized to visit the site.`;
        return;
    }

    result.classList.add('success');
    result.textContent = 'Welcome to this site.';
});
