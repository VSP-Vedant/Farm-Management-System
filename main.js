document.getElementById("fertilizerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Collect input values from the form
    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const moisture = document.getElementById("moisture").value;
    const soilType = document.getElementById("soilType").value;
    const cropType = document.getElementById("cropType").value;
    const nitrogen = document.getElementById("nitrogen").value;
    const potassium = document.getElementById("potassium").value;
    const phosphorous = document.getElementById("phosphorous").value;

    // Construct a JSON object with the collected data
    const data = {
        temperature: temperature,
        humidity: humidity,
        moisture: moisture,
        soil_type: soilType,
        crop_type: cropType,
        nitrogen: nitrogen,
        potassium: potassium,
        phosphorous: phosphorous
    };

    try {
        // Send a POST request to the Flask backend (ensure your Flask server is running on port 5000)
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        document.getElementById("result").innerHTML = `<div class="alert alert-success">Recommended Fertilizer: ${result.recommended_fertilizer}</div>`;
    } catch (error) {
        document.getElementById("result").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});