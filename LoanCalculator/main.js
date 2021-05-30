document.getElementById("loan-form").addEventListener("submit",function(e)
{
    document.getElementById('loading').style.display='block';

    document.getElementById('results').style.display='none';

    setTimeout(calculateResult,2000);

    e.preventDefault();
});


function calculateResult()
{
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlypayment = document.getElementById("monthly-payment");
    const totalpayment = document.getElementById("total-payment");
    const totalinterest = document.getElementById("total-interest");

    const principle = parseFloat(amount.value);
    const calculateInterest = parseFloat((interest.value)/100/12);
    const calculatePayments = parseFloat(years.value)*12;

    const x = Math.pow(1+calculateInterest,calculatePayments);
    const monthly = (principle*x*calculateInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthlypayment.value = monthly.toFixed(2);
        totalpayment.value = (monthly*calculatePayments).toFixed(2);
        totalinterest.value = ((monthly*calculatePayments)-principle).toFixed(2);
        
        document.getElementById('loading').style.display='none';

        document.getElementById('results').style.display='block';
    }
    else
    {
        // console.log("please check your number");
        ShowError("Please check your number");
    }

    //e.preventDefault();
}

function ShowError(error)
{
    document.getElementById('loading').style.display='none';

    document.getElementById('results').style.display='none';

    const errorDiv = document.createElement('div');
    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);
    setTimeout(clearError,3000);
}

function clearError()
{
    document.querySelector('.alert').remove();
}