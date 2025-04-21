
//event listener to when the document loads
document.addEventListener("DOMContentLoaded", function() {
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;
    const password = customerInfo.password;

    const userInfoList = [userId, phone, username, email, password]
    console.log(userInfoList);

    const uDisplay = document.getElementById("userId");
    const pDisplay = document.getElementById("phone");
    const nDisplay = document.getElementById("username");
    const eDisplay = document.getElementById("email");
    const psDisplay = document.getElementById("password");

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;
    psDisplay.textContent = password;

    const editButton = document.querySelector(".changeUserInfo-button");
    const backButton = document.querySelector(".changeUserInfoBack-button");
    const profileSection = document.getElementById("userSettingsPage");
    const editSection = document.getElementById("editUser");

    allInvoice();

    editButton.addEventListener("click", function (e) {
        e.preventDefault();
    
        // Hide profile section
        profileSection.style.display = "none";
    
        // Show edit section
        editSection.style.display = "block";
    
        // Scroll to it
        editSection.scrollIntoView({ behavior: "smooth" });
    
        // Set placeholders
        document.getElementById("editUserId").placeholder = document.getElementById("userId").innerText;
        document.getElementById("editUsername").placeholder = document.getElementById("username").innerText;
        document.getElementById("editPhone").placeholder = document.getElementById("phone").innerText;
        document.getElementById("editEmail").placeholder = document.getElementById("email").innerText;
        document.getElementById("editPassword").placeholder = document.getElementById("password").innerText;
    });

    backButton.addEventListener("click", function (e) {
        e.preventDefault();
    
        // Hide profile section
        profileSection.style.display = "block";
    
        // Show edit section
        editSection.style.display = "none";
    
        // Scroll to it
        profileSection.scrollIntoView({ behavior: "smooth" });
        //call Session data up update info

        refreshUser();
        
        
    
    
    });

  });

async function refreshUser(){
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;
    const password = customerInfo.password;

    const userInfoList = [userId, phone, username, email, password]
    console.log(userInfoList);

    const uDisplay = document.getElementById("userId");
    const pDisplay = document.getElementById("phone");
    const nDisplay = document.getElementById("username");
    const eDisplay = document.getElementById("email");
    const psDisplay = document.getElementById("password");

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;
    psDisplay.textContent = password;
}

//getting the stored local params


/*
async function setParams(){
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;
    const password = customerInfo.password;

    const userInfoList = [userId, phone, username, email, password]
    console.log(userInfoList);

    const uDisplay = document.getElementById("userId");
    const pDisplay = document.getElementById("phone");
    const nDisplay = document.getElementById("username");
    const eDisplay = document.getElementById("email");
    const psDisplay = document.getElementById("password");

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;
    psDisplay.textContent = password;

    return userInfoList
}

*/

async function signOut(){
    sessionStorage.clear();
    window.location.href = "welcome.html";
}

async function allInvoice(){
    //customerID will be returned as a promise object
    //use await to get the actual value
    //userId is the actual value

    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;


    //display invoice here
    const displayAllInvoices = document.getElementById("allInvoices");

    console.log(userId)
    

    try{
        //calling list all invoice
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices`);
        //data returned from the API call(res) will be called 'data'
        const data = await res.json();
        const invoiceList = data.body;

        //lists all the invoiceIDs
        console.log(invoiceList)


        //amount of Invoice
        const amountOfInvoice = invoiceList.length;
        console.log("The amount of invoice is" + amountOfInvoice);

        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }
        let i = 0;
        let theList = [];


        

        while (i < amountOfInvoice){
            target = await listTheInvoice(invoiceList[i], userId)
            theList.push(target);
            i = i+1;
        }

        console.log("The list of invoices" + theList)

        displayAllInvoices.innerHTML = theList;

        
        //create invoice objects for each invoice in the invoiceList
    }
    catch(error){
        console.error(error);
    }


}
//////////////////////////////////////



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




async function markPaid(customerID, invoiceID){
    console.log("called marked Paid")

    const userId = await customerID;
    const invoiceId = await invoiceID;

    const link = `https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/mark-paid`

    console.log(link)

  

    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/mark-paid`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        }
        //have to stringify the JSON file in order to use the fetch command
        //params is already set above which takes in the value that users input
    });

    //data returned from the API call(res) will be called 'data'
    const data = await res.json();
    const code = data.statusCode;

    console.log(data)
    
}


///////////////////////////////////////
async function changeUserDetails(){
    console.log("called change userDetails")
    
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;
    const password = customerInfo.password;


    let editUsername = document.getElementById("editUsername").value;
    let editPhone = document.getElementById("editPhone").value;
    let editEmail = document.getElementById("editEmail").value;
    let editPassword = document.getElementById("editPassword").value;
    let editMessage = document.getElementById("userDetailsChangeMessage");



    if(editUsername == ""){
        editUsername = username;
    }

    if(editPhone == ""){
        editPhone = phone;
    }

    if(editEmail == ""){
        console.log("ayayayaya")
        editEmail = email;
    }

    if(editPassword == ""){
        editPassword = password;
    }

    const params = {
        userId: userId,
        email: editEmail,
        password: editPassword,
        username: editUsername,
        phone: editPhone
    }

    const paramsSaved = {
        customerID: userId,
        email: editEmail,
        password: editPassword,
        username: editUsername,
        phone: editPhone
    }

    console.log(params)


    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/details`,{
        method:'PUT',
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

    //successfully change
    if(code == 200){
        console.log("User info updated")
        editMessage.textContent = "User information updated successfully";
        //update the session storage too
        sessionStorage.setItem('customerInfo', JSON.stringify(paramsSaved));
    }
    else{
        editMessage.textContent = "Something went wrong, please try again";
    }

    console.log(data);
}

///////////////////////////
async function listTheInvoice(InvoiceID, customerID){

    console.log("List function called");
    //convert the invoices objects into a double array
    //what needs to be displayed: invoice ID, status, the dates

    const userId = await customerID;
    const invoiceId = await InvoiceID;

    console.log(userId);

    try{
        //calling list status 
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/status`);
        const data = await res.json();

        console.log(data)

        const statusPaid = data[0];
        const creationDate = data[1];
        const dueDate = data[2];

        //return error 
        if(!res.ok){
            console.log('Error');
            return;
        }
    

        listHTML = (`
            <div class="invoice-status">Payment Status: <br><small>${statusPaid}</small></div>
            <div class="invoice-info">
            <p><strong>CustomerID:</strong>${userId}</p>
            <p><strong>InvoiceID: </strong>${InvoiceID}</p>
            <p><strong>Due Date:</strong> ${creationDate}</p>
            <p><strong>Outstanding:</strong> ${dueDate}</p>

            </div>
            <div class="invoice-actions">
            <a href="#" onclick = "markPaid(${userId},${InvoiceID})">Pay</a> |
            <a href="#" onclick = "deleteInvoice(${userId},${InvoiceID})">Delete</a> |
            <a href="#" onclick = "pdfInvoice(${userId},${InvoiceID})">Download</a>
            </div>
   
            <hr width="100%" size="8" color= #c75193 noshade>`);
        
        console.log(listHTML)

        return listHTML;

    }
    catch(error){
        console.error(error);
    }
}


/////////////////////////////////////////////
async function searchInvoice(){
    //getthe invoice ID
    const targetInvoice = document.getElementById("invoiceSearch").value;

    //get the userID

    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;

    listTheInvoice(targetInvoice, userId);

}


//////////////////////////////////////
async function uploadXML(){
    console.log("xml function called")
    //get userID
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;

    //get XML
    const uploadedXML = document.getElementById("uploadedXML").value;

    //get invoiceID
    const invoiceId = document.getElementById("uploadedID").value;

    const params = {
        userId: userId,
        xml: uploadedXML,
        invoiceId: invoiceId
    }
    console.log("here")
    console.log(params)


    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        //have to stringify the JSON file in order to use the fetch command
        //params is already set above which takes in the value that users input
        body: JSON.stringify(params)
    });

    const storeData = await res.json();
    const storeCode = storeData.statusCode;
    console.log(storeData)

    if(storeCode == 200){
        console.log("put invoice successful, validating invoice");
        validateInvoice(userId, invoiceId);
    }
}

////////////////////
async function validateInvoice(customerID, invoiceID){
    
    const userId = await customerID;
    const invoiceId = await invoiceID;

    const message = document.getElementById("createByUploadMessage");

    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/validate`);
    console.log("called validate")

    const checkData = await res.json();
    console.log('checkData here')
    console.log(checkData)
    const checkStatus = checkData.body;
    const valid = JSON.parse(checkStatus).status


    console.log('Status here')
    console.log(checkStatus)
    console.log(valid)



    if(valid == false){
        console.log("validation failed")
        console.log(checkData)

        deleteInvoice(userId, invoiceId)
        message.textContent = "Invoice format validation unsuccessful";
    }
    else{

        console.log("validation successful")
        message.textContent = "Invoice upload successful";
    }
}

/////////////////////////////
async function deleteInvoice(customerID, invoiceID){
    const userId = await customerID;
    const invoiceId = await invoiceID;



    const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    deleteData = res.json();
    console.log("In delete Data")

    specificPageReload('index.html#invoicesPage')
}

/////////////////////////////////
async function emailInvoice(customerID, invoiceID){
    const userId = await customerID;
    const invoiceId = await invoiceID;

    console.log("called Email Invoice")
}


////////////////////////////////
async function pdfInvoice(customerID, invoiceID){
    console.log('called pdf Invoice')

    const button = document.getElementById("dlPDFbutton");

    let userId = await customerID;
    let invoiceId = await invoiceID;
    console.log("params here" + invoiceID + userId)

    const params = {
        userId: userId,
        invoiceId: invoiceId
    }

    console.log("params here" + invoiceID + userId)

    try{
        const res = await fetch(`https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/${userId}/invoices/${invoiceId}/pdf`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        });
    
        const storeData = await res.json();
        console.log(storeData)
        window.open(storeData)
    }
    catch(error){
        console.error(error);
    }





}


/////////////////////////////////

async function specificPageReload(loc){
    console.log("specificPageReload called" )
    window.location.reload()
    window.location.replace(loc)
}