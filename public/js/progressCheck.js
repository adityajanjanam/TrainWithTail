document.addEventListener('DOMContentLoaded', function() {
    const formDay1 = document.getElementById('progressFormDay1');
    const formDay2 = document.getElementById('progressFormDay2');
    const formDay3 = document.getElementById('progressFormDay3');
    const formDay4 = document.getElementById('progressFormDay4');
    const formDay5 = document.getElementById('progressFormDay5');
    const formDay6 = document.getElementById('progressFormDay6');
    const formDay7 = document.getElementById('progressFormDay7');
    const formDay8 = document.getElementById('progressFormDay8');
    const formDay9 = document.getElementById('progressFormDay9');
    const formDay10 = document.getElementById('progressFormDay10');

    const selectUserPet = document.getElementById('selectedUserPet');

    const progressUserInputDay1 = document.getElementById('progressUserDay1');
    const progressPetInputDay1 = document.getElementById('progressPetDay1');

    const progressUserInputDay2 = document.getElementById('progressUserDay2');
    const progressPetInputDay2 = document.getElementById('progressPetDay2');

    const progressUserInputDay3 = document.getElementById('progressUserDay3');
    const progressPetInputDay3 = document.getElementById('progressPetDay3');

    const progressUserInputDay4 = document.getElementById('progressUserDay4');
    const progressPetInputDay4 = document.getElementById('progressPetDay4');

    const progressUserInputDay5 = document.getElementById('progressUserDay5');
    const progressPetInputDay5 = document.getElementById('progressPetDay5');

    const progressUserInputDay6 = document.getElementById('progressUserDay6');
    const progressPetInputDay6 = document.getElementById('progressPetDay6');

    const progressUserInputDay7 = document.getElementById('progressUserDay7');
    const progressPetInputDay7 = document.getElementById('progressPetDay7');

    const progressUserInputDay8 = document.getElementById('progressUserDay8');
    const progressPetInputDay8 = document.getElementById('progressPetDay8');

    const progressUserInputDay9 = document.getElementById('progressUserDay9');
    const progressPetInputDay9 = document.getElementById('progressPetDay9');

    const progressUserInputDay10 = document.getElementById('progressUserDay10');
    const progressPetInputDay10 = document.getElementById('progressPetDay10');

    selectUserPet.addEventListener('change', function() {
        const selectedValue = this.value;
        const parts = selectedValue.split('_');
        progressUserInputDay1.value = parts[0];
        progressPetInputDay1.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay1.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay1.value = parts[0]; 
        progressPetInputDay1.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay2.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay2.value = parts[0]; 
        progressPetInputDay2.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay3.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay3.value = parts[0]; 
        progressPetInputDay3.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay4.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay4.value = parts[0]; 
        progressPetInputDay4.value = parts[1];
    });

            // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay5.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay5.value = parts[0]; 
        progressPetInputDay5.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay6.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay6.value = parts[0]; 
        progressPetInputDay6.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay7.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay7.value = parts[0]; 
        progressPetInputDay7.value = parts[1];
    });

            // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay8.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay8.value = parts[0]; 
        progressPetInputDay8.value = parts[1];
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay9.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay9.value = parts[0]; 
        progressPetInputDay9.value = parts[1];
    });

            // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDay10.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        progressUserInputDay10.value = parts[0]; 
        progressPetInputDay10.value = parts[1];
    });
});
