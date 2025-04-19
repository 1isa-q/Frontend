
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
    const profileSection = document.getElementById("userSettingsPage");
    const editSection = document.getElementById("editUser");

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

    allInvoice();
  });

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
    console.log("List function called")
    //convert the invoices objects into a double array
    //what needs to be displayed: invoice ID, status, the dates
    invoice = [];
    console.log(invoiceList[0])

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
    const psDisplay = document.getElementById("password");

    const userId = userInfoList[0];
    const phone = userInfoList[1];
    const username = userInfoList[2];
    const email = userInfoList[3];
    const password = userInfoList[4];

    uDisplay.textContent = userId;
    pDisplay.textContent = phone;
    nDisplay.textContent = username;
    eDisplay.textContent = email;
    psDisplay.textContent = password;

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


///////////////////////////////////////
async function changeUserDetails(){
    console.log("called change userDetails")
    
    const customerInfo =JSON.parse(sessionStorage.getItem('customerInfo'));
    const userId = customerInfo.customerID;
    const phone = customerInfo.phone;
    const username = customerInfo.username;
    const email = customerInfo.email;
    const password = customerInfo.password;

    
    const editUsername = document.getElementById("editUsername");
    const editPhone = document.getElementById("editPhone");
    const editEmail = document.getElementById("editEmail");
    const editPassword = document.getElementById("editPassword");


    
    if(editUsername == null){
        editUsername = username;
    }

    if(editPhone == null){
        editPhone = phone;
    }

    if(editEmail == null){
        editEmail = email;
    }

    if(editPassword == null){
        editPassword = password;
    }



    const params = {
        userId: userId,
        email: editEmail,
        password: editPassword,
        username: editUsername,
        phone: editPhone
    }


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

    if(code == 200){
        console.log("User info updated")
    }
    else{
        alert(data);
    }

    console.log(data);


}