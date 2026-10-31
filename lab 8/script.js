const storageKey = 'lab8UserInformation';

function showFormMessage(message) {
    const formMessage = document.querySelector('#formMessage');
    formMessage.textContent = message;
}

function saveUserInformation(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
        form.reportValidity();
        showFormMessage('Please complete each field with valid information.');
        return;
    }

    const formData = new FormData(form);
    const userInformation = Object.fromEntries(formData.entries());
    localStorage.setItem(storageKey, JSON.stringify(userInformation));
    window.location.href = 'details.html';
}

function renderDetails() {
    const detailsGrid = document.querySelector('#detailsGrid');
    const emptyMessage = document.querySelector('#emptyMessage');
    const detailsIntro = document.querySelector('#detailsIntro');
    const savedInformation = localStorage.getItem(storageKey);

    if (!savedInformation) {
        detailsGrid.hidden = true;
        emptyMessage.hidden = false;
        detailsIntro.textContent = 'There is no saved information to display.';
        return;
    }

    let userInformation;
    try {
        userInformation = JSON.parse(savedInformation);
    } catch {
        localStorage.removeItem(storageKey);
        detailsGrid.hidden = true;
        emptyMessage.hidden = false;
        detailsIntro.textContent = 'The saved information could not be read. Please submit the form again.';
        return;
    }

    const fields = [
        ['Full name', userInformation.name],
        ['Gender', userInformation.gender],
        ['Mobile number', userInformation.mobile],
        ['Email address', userInformation.email],
        ['City', userInformation.city],
        ['State', userInformation.state],
        ['Country', userInformation.country]
    ];

    detailsGrid.replaceChildren();
    fields.forEach(([label, value]) => {
        const detailItem = document.createElement('div');
        const detailLabel = document.createElement('span');
        const detailValue = document.createElement('strong');

        detailItem.className = 'detail-item';
        detailLabel.textContent = label;
        detailValue.textContent = value || 'Not provided';
        detailItem.append(detailLabel, detailValue);
        detailsGrid.appendChild(detailItem);
    });
}

const userForm = document.querySelector('#userForm');
if (userForm) {
    userForm.addEventListener('submit', saveUserInformation);
    userForm.addEventListener('reset', () => showFormMessage(''));
}

if (document.body.dataset.page === 'details') {
    renderDetails();
    document.querySelector('#clearData').addEventListener('click', () => {
        localStorage.removeItem(storageKey);
        renderDetails();
    });
}
