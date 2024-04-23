// paymentPage.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the total from session storage
    const total = sessionStorage.getItem('total');
    console.log('Total:', total); // Log the total value for debugging
  
    // Display the total in the payment page
    const totalElement = document.getElementById('total');
    if (totalElement) {
      totalElement.textContent = total ? total : "$0.00";
    }
  });
  

  function redirectToPaymentSuccess() {
    // Redirect the user to the payment success page
    window.location.href = '/paymentSuccessPage';
}

function printInvoice(){
  window.print();
}

