function showConfirmation() {
    alert("Formulário enviado com sucesso!");

    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };
    var currentDate = new Date().toLocaleString();
    var formSubmission = {
        date: currentDate,
        name: formData.name,
        email: formData.email,

    };
    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    formSubmissions.push(formSubmission);
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));
    window.location.href = 'form_submissions.html';
    return false;
}
window.onload = function () {
    var submissionList = document.getElementById('submission-list');
    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    formSubmissions.forEach(function (submission) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Data:</strong> ${submission.date} | <strong>Nome:</strong> ${submission.name} | <strong>E-mail:</strong> ${submission.email}`;
        submissionList.appendChild(listItem);
    });
};
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('country').value = '';
    document.getElementById('subscribe').checked = false;
}

function searchSubmissions() {
    var searchTerm = prompt('Digite o termo de pesquisa:');
    var submissionList = document.getElementById('submission-list');
    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    submissionList.innerHTML = '';

    formSubmissions.forEach(function (submission) {

        if (
            submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            var listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Data:</strong> ${submission.date} | <strong>Nome:</strong> ${submission.name} | <strong>E-mail:</strong> ${submission.email} | <button onclick="deleteSubmission(${formSubmissions.indexOf(submission)})">Excluir</button>`;
            submissionList.appendChild(listItem);
        }
    });
}

window.onload = function () {
    var submissionList = document.getElementById('submission-list');
    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    formSubmissions.forEach(function (submission, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<button class="delete-button" onclick="deleteSubmission(${index})">Excluir</button> <strong>Data:</strong> ${submission.date} | <strong>Nome:</strong> ${submission.name} | <strong>E-mail:</strong> ${submission.email}`;
        submissionList.appendChild(listItem);
    });
};

function deleteSubmission(index) {
    var submissionList = document.getElementById('submission-list');
    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];


    formSubmissions.splice(index, 1);


    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));

    updateSubmissionList();
}

function updateSubmissionList() {
    var submissionList = document.getElementById('submission-list');
    submissionList.innerHTML = '';

    var formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    formSubmissions.forEach(function (submission, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<button onclick="deleteSubmission(${index})">Excluir</button> <strong>Data:</strong> ${submission.date} | <strong>Nome:</strong> ${submission.name} | <strong>E-mail:</strong> ${submission.email}`;
        submissionList.appendChild(listItem);
    });
}

