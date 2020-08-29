// listen for submit
const loanForm = document.getElementById('loan-form');
console.log(loanForm);
loanForm.addEventListener('submit', function (event) { 
	// showloader hide results
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'block';
	setTimeout(calculateResults, 2000);
	event.preventDefault();

});

function calculateResults() {
	// UI form fields
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payments

	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);
	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
		document.getElementById('results').style.display = 'block';
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your inputs');
	}
	

}
function showError(error) {
	document.getElementById("results").style.display = "none";
  	document.getElementById("loading").style.display = "none";
	const errorDiv = document.createElement('div');
	// Getting elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	errorDiv.className = 'alert alert-danger';
	errorDiv.appendChild(document.createTextNode(error));
	// Insert error above heading
	card.insertBefore(errorDiv, heading);
	
	// clear Error After 3 seconds
	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 3000)

}