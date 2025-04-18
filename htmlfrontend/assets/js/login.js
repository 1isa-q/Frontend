async function logIn() {
    const userEmail = document.getElementById("email").value;
    const userPass = document.getElementById("password").value;
    const errorDisplay = document.getElementById("login-error");
    errorDisplay.textContent = ""; // clear previous error

    const params = {
        email: userEmail,
        password: userPass
    };

    try {
        const res = await fetch("https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        const data = await res.json();

        if (!res.ok || data.statusCode !== 200) {
            const output = data.body || "Login failed. Please check your credentials.";
            errorDisplay.textContent = output;
            return;
        }

        // Save info & redirect
        sessionStorage.setItem('customerInfo', JSON.stringify(data.customerInfo));
        window.location.href = "index.html";

    } catch (error) {
        console.error("Login error:", error);
        errorDisplay.textContent = "Something went wrong. Please try again later.";
    }
}
