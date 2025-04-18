async function register() {
    const userEmail = document.getElementById("email").value.trim();
    const userPass = document.getElementById("password").value.trim();
    const userPhone = document.getElementById("phone").value.trim();
    const userName = document.getElementById("username").value.trim();

    const errorMsg = document.getElementById("register-error");
    const successMsg = document.getElementById("register-success");

    // Clear previous messages
    errorMsg.textContent = "";
    successMsg.textContent = "";

    // ✅ Step 1: Check if any fields are empty
    if (!userEmail || !userPass || !userPhone || !userName) {
        errorMsg.textContent = "Please fill in all fields.";
        return;
    }

    const params = {
        email: userEmail,
        password: userPass,
        phone: userPhone,
        username: userName
    };

    try {
        const res = await fetch("https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        const data = await res.json();

        // ✅ Step 2: Only show success if API returns OK
        if (!res.ok) {
            errorMsg.textContent = data.body || "Registration failed. Please try again.";
            return;
        }

        successMsg.textContent = data.body || "Registered successfully!";
        
        // Optional: clear fields after success
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("password").value = "";

    } catch (error) {
        errorMsg.textContent = "Something went wrong. Please try again later.";
        console.error(error);
    }
}
