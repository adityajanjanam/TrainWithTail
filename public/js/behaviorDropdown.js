// Add event listener to the dropdown menu
$('#selectedUserPet').change(function() {
    // Get the selected user and pet
    const selectedUserPet = $(this).val();

    // Make an AJAX request to fetch behavior statuses for the selected user and pet
    $.ajax({
        url: '/getBehaviorStatus',
        method: 'POST',
        data: { selectedUserPet },
        success: function(response) {
            // Update the UI with the fetched behavior statuses
            // For example, you can update the status of each behavior in the UI based on the received data
            console.log(response); // Print the received data for debugging
            // Update the UI with the received data
        },
        error: function(error) {
            console.error('Error fetching behavior statuses:', error);
        }
    });
});
