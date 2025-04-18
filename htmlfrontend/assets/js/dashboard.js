//event listener to when the document loads
document.addEventListener("DOMContentLoaded", function() {
    const userId = setParams();
    allInvoice(userId);
  });

//getting the stored local params
async function setParams(){
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;

    console.log(userId);

    return userId
}

async function signOut(){
    sessionStorage.clear();
    window.location.href = "mainPage.html";
}

async function allInvoice(userId){

    try{
        //res is the response of the API
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/userId/invoices?userId=${userId}`, {
            method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
        })
        //data returned from the API call(res) will be called 'data'
        const data = await res.json();
        const code = data.statusCode;
        const invoiceList = data.body;

        console.log(code);

        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }
    }
    catch(error){
        console.error(error);
    }


}