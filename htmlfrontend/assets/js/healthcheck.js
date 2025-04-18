document.addEventListener("DOMContentLoaded", async () => {
    const outputDiv = document.getElementById("health-status");
    outputDiv.textContent = "Checking API health...";

    try {
        const res = await fetch("https://11fgn0gs99.execute-api.ap-southeast-2.amazonaws.com/v2/api");

        if (!res.ok) {
            outputDiv.textContent = `Server responded with status: ${res.status}`;
            return;
        }

        const data = await res.json();
        outputDiv.innerHTML = `
            <strong>Status Code:</strong> ${data.statusCode}<br>
            <strong>Message:</strong> ${data.body}
        `;
    } catch (err) {
        console.error("Health check failed:", err);
        outputDiv.textContent = "Failed to reach the API. Please try again later.";
    }
});