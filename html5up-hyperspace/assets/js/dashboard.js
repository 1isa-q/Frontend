//event listener to when the document loads
document.addEventListener("DOMContentLoaded", function() {
    const userInfo = setParams();
  });

//getting the stored local params
async function setParams(){
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const email = customerInfo.email;
    const username = customerInfo.username;
    const phone = customerInfo.phone;

    userInfoList = [userId, email, username, phone];
    console.log(userInfoList);


    return userInfoList;
}

async function signOut(){
    sessionStorage.clear();
    window.location.href = "login.html";
}

async function allInvoice(customerID){
    //customerID will be returned as a promise object
    //use await to get the actual value
    //userId is the actual value
    userId = await customerID
    console.log(userId)
    

    try{
        //calling list all invoice
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices`);
        //data returned from the API call(res) will be called 'data'
        const data = await res.json();
        const invoiceList = data.body;


        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }

        //create invoice objects for each invoice in the invoiceList
        listInvoice(invoiceList);
    }
    catch(error){
        console.error(error);
    }


}
//////////////////////////////////////

//somehow shows all the invoice in a list on the page
async function listInvoice(invoiceList){
    //console.log(invoiceList[0].customerID)

    //convert the invoices objects into a double array
    //what needs to be displayed: invoice ID, status, the dates
    invoice = [];
    console.log(invoiceList[0])
    //calling get status function while there is elements in the list
    i = 0;
    while (i < listCount){
        console.log(invoiceList[i])
        const userId = list[i].customerID;
        const invoiceId = list[i].invoiceID;
        console.log("inside listInvoice")
        return;
        try{
            //calling list status 
            const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/status`);
            const data = await res.json();
            const code = data.statusCode;
    
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
    return;
    console.log('inside listInvoice function')
    console.log(list);
}

//////////////////////////////////



//add new invoice, where xml is the inputted invoice
async function createInvoice(){
    const xml = document.getElementById("xml").value;
    console.log(xml);



    const params = {
        userId: userId,
        xml: xml
    };

    console.log(params);
    
    //invoice make invoice function
    //calling create invoice
    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        //have to stringify the JSON file in order to use the fetch command
        //params is already set above which takes in the value that users input
        body: JSON.stringify(params)
    });

    //data returned from the API call(res) will be called 'data'
    const data = await res.json();
    const code = data.statusCode;

    if(code == 200){
        alert('Invoice created successfully');
    }
    else{
        alert(data);
    }

    console.log(data);
}

/////////////////
async function displayUser(){

    console.log('Display user called');
}