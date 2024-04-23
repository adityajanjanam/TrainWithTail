document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the selected user and pet from the dropdown
    const selectedUserPet = document.getElementById('selectedUserPet').value;

    // Send an AJAX request to fetch the updated form data
    fetch(`/updateForms?selectedUserPet=${selectedUserPet}`)
        .then(response => response.json())
        .then(data => {
            // Update the forms with the fetched data
            const behaviorContainer = document.querySelector('.behaviorContainer');
            behaviorContainer.innerHTML = data.updatedFormsHTML;
        })
        .catch(error => console.error('Error updating forms:', error));
});
