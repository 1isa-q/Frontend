//get info upon load page

document.addEventListener("DOMContentLoaded", function() {
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));

    //for userInfo
    const uDisplay = document.getElementById("userId");
    const pDisplay = document.getElementById("phone");
    const nDisplay = document.getElementById("username");
    const eDisplay = document.getElementById("email");

    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;

    console.log("here is customerinfo")
    console.log(userId, username, phone, email)

    //For invoiceDisplay


    invoiceList = allInvoice(userId);
    });


async function signOut(){
    sessionStorage.clear();
    window.location.href = "welcome.html";
}

async function allInvoice(customerID){
    //customerID will be returned as a promise object
    //use await to get the actual value
    //userId is the actual value
    const userId = await customerID;

    console.log("inside allInvoice")
    
    try{
        //calling list all invoice
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices`);
        //data returned from the API call(res) will be called 'data'
        const data = await res.json();
        const invoiceList = data.body;
        const data1 = invoiceList[0]

        console.log("The list of Invoices")
        console.log(invoiceList)
        console.log(data1)

        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }

        //create invoice objects for each invoice in the invoiceList
        listTheInvoice(invoiceList, userId);
    }
    catch(error){
        console.error(error);
    }


}
//////////////////////////////////////

//somehow shows all the invoice in a list on the page
async function listTheInvoice(invoiceList, customerID){
    const displayAllInvoices = document.getElementById("allInvoices");
    //console.log(invoiceList[0].customerID)
    console.log("List function called");
    //convert the invoices objects into a double array
    //what needs to be displayed: invoice ID, status, the dates

    const userId = await customerID;

    console.log(invoiceList[0]);
    console.log("here");



    
    invoiceId = "0257724236";

    console.log(userId);


    try{
        //calling list status 
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/status`);
        const data = await res.json();
        const code = data.statusCode;

        console.log(data)

        const statusPaid = data[0];
        const creationDate = data[1];
        const dueDate = data[2];


        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }

        displayAllInvoices.innerHTML = `
            <div class="invoice-status">#111<br><small>Issued</small></div>
            <div class="invoice-info">
            <p><strong>InvoiceID: </strong>${invoiceList[0]}</p>
            <p><strong>To:</strong> xxx</p>
            <p><strong>Creation Date:</strong> ${statusPaid}</p>
            <p><strong>Due Date:</strong> ${creationDate}</p>
            <p><strong>Outstanding:</strong> ${dueDate}</p>
            </div>
            <div class="invoice-actions">
            <a href="generic.html">Edit</a> |
            <a href="#" onclick = "markPaid()">Pay</a>
            </div>`;



    }
    catch(error){
        console.error(error);
    }


    return;
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


    //<div class="invoice-item" id = "allInvoices">
    //<div class="invoice-status">#111<br><small>Issued</small></div>
    //<div class="invoice-info">
      //<p><strong>To:</strong> Alexey Novikov</p>
      //<p><strong>Date:</strong> Apr 24, 2022</p>
     // <p><strong>Amount:</strong> $100.00</p>
    //  <p><strong>Outstanding:</strong> $100.00</p>
    //</div>
    //<div class="invoice-actions">
     // <a href="generic.html">Edit</a> |
      //<a href="#" onclick = "markPaid()">Pay</a>
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

/////////////////////////////////////////

async function searchInvoice(){
    console.log("Retrun search Invoice")
}

////////////////////////////////////////////
/*
async function userInformation(){
    const userInfoList = await setParams();
    const uDisplay = document.getElementById("userId");
    const pDisplay = document.getElementById("phone");
    const nDisplay = document.getElementById("username");
    const eDisplay = document.getElementById("email");

    const userId = userInfoList[0];
    const phone = userInfoList[1];
    const username = userInfoList[2];
    const email = userInfoList[3];

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;

    console.log(userId, username, phone, email)
}

*/

//////////////////////////////////////////
async function markPaid(){
    console.log("called marked Paid")

    return;
    const userInfoList = await setParams();
  

    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/mark-paid`,{
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
    
}