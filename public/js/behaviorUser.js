document.addEventListener('DOMContentLoaded', function() {
    const formJumping = document.getElementById('behaviorFormJumping');
    const formBarking = document.getElementById('behaviorFormBarking');
    const formChewing = document.getElementById('behaviorFormChewing');
    const formPulling = document.getElementById('behaviorFormPulling');
    const formSeparation = document.getElementById('behaviorFormSeparation');
    const formGuarding = document.getElementById('behaviorFormGuarding');
    const formSurfing = document.getElementById('behaviorFormSurfing');
    const formDigging = document.getElementById('behaviorFormDigging');
    const formDashing = document.getElementById('behaviorFormDashing');
    const formFear = document.getElementById('behaviorFormFear');

    const selectUserPet = document.getElementById('selectedUserPet');

    const behaviorUserInputJumping = document.getElementById('behaviorUserJumping');
    const behaviorPetInputJumping = document.getElementById('behaviorPetJumping');

    const behaviorUserInputBarking = document.getElementById('behaviorUserBarking');
    const behaviorPetInputBarking = document.getElementById('behaviorPetBarking');

    const behaviorUserInputChewing = document.getElementById('behaviorUserChewing');
    const behaviorPetInputChewing = document.getElementById('behaviorPetChewing');

    const behaviorUserInputPulling = document.getElementById('behaviorUserPulling');
    const behaviorPetInputPulling = document.getElementById('behaviorPetPulling');

    const behaviorUserInputSeparation = document.getElementById('behaviorUserSeparation');
    const behaviorPetInputSeparation = document.getElementById('behaviorPetSeparation');

    const behaviorUserInputGuarding = document.getElementById('behaviorUserGuarding');
    const behaviorPetInputGuarding = document.getElementById('behaviorPetGuarding');

    const behaviorUserInputSurfing = document.getElementById('behaviorUserSurfing');
    const behaviorPetInputSurfing = document.getElementById('behaviorPetSurfing');

    const behaviorUserInputDigging = document.getElementById('behaviorUserDigging');
    const behaviorPetInputDigging = document.getElementById('behaviorPetDigging');

    const behaviorUserInputDashing = document.getElementById('behaviorUserDashing');
    const behaviorPetInputDashing = document.getElementById('behaviorPetDashing');

    const behaviorUserInputFear = document.getElementById('behaviorUserFear');
    const behaviorPetInputFear = document.getElementById('behaviorPetFear');

    selectUserPet.addEventListener('change', function() {
        const selectedValue = this.value;
        const parts = selectedValue.split('_');
        behaviorUserInputJumping.value = parts[0]; // Set username for Jumping form
        behaviorPetInputJumping.value = parts[1]; // Set petname for Jumping form
        behaviorUserInputFear.value = parts[0]; // Set username for Fear form
        behaviorPetInputFear.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formJumping.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputJumping.value = parts[0]; // Set username for Jumping form
        behaviorPetInputJumping.value = parts[1]; // Set petname for Jumping form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formBarking.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputBarking.value = parts[0]; // Set username for Fear form
        behaviorPetInputBarking.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formChewing.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputChewing.value = parts[0]; // Set username for Fear form
        behaviorPetInputChewing.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formPulling.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputPulling.value = parts[0]; // Set username for Fear form
        behaviorPetInputPulling.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formSeparation.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputSeparation.value = parts[0]; // Set username for Fear form
        behaviorPetInputSeparation.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formGuarding.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputGuarding.value = parts[0]; // Set username for Fear form
        behaviorPetInputGuarding.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formSurfing.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputSurfing.value = parts[0]; // Set username for Fear form
        behaviorPetInputSurfing.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDigging.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputDigging.value = parts[0]; // Set username for Fear form
        behaviorPetInputDigging.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formDashing.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputDashing.value = parts[0]; // Set username for Fear form
        behaviorPetInputDashing.value = parts[1]; // Set petname for Fear form
    });

    // Optional: Add event listener for form submission to ensure that the hidden inputs are set
    formFear.addEventListener('submit', function(event) {
        const selectedValue = selectUserPet.value;
        const parts = selectedValue.split('_');
        behaviorUserInputFear.value = parts[0]; // Set username for Fear form
        behaviorPetInputFear.value = parts[1]; // Set petname for Fear form
    });
});
