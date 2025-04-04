// Fertilizer Recommendation Form Submission
document.getElementById("fertilizerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const moisture = document.getElementById("moisture").value;
    const soil_type = document.getElementById("fertSoilType").value;
    const crop_type = document.getElementById("fertCropType").value;
    const nitrogen = document.getElementById("nitrogen").value;
    const potassium = document.getElementById("potassium").value;
    const phosphorous = document.getElementById("phosphorous").value;

    const data = {
        temperature, humidity, moisture,
        soil_type, crop_type, nitrogen,
        potassium, phosphorous
    };

    try {
        const response = await fetch("http://localhost:5000/predict-fertilizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById("fertilizerResult").innerHTML = `<div class="alert alert-success">Recommended Fertilizer: ${result.recommended_fertilizer}</div>`;
    } catch (error) {
        document.getElementById("fertilizerResult").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});

// Crop Rotation Recommendation Form Submission
document.getElementById("cropRotationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const region = document.getElementById("region").value;
    const season = document.getElementById("season").value;
    const soil_type = document.getElementById("cropSoilType").value;
    const soil_ph = document.getElementById("soilPH").value;
    const soil_nitrogen = document.getElementById("soilNitrogen").value;
    const soil_phosphorus = document.getElementById("soilPhosphorus").value;
    const soil_potassium = document.getElementById("soilPotassium").value;
    const soil_organic_matter = document.getElementById("soilOrganicMatter").value;
    const soil_moisture = document.getElementById("cropSoilMoisture").value;
    const avg_rainfall = document.getElementById("avgRainfall").value;
    const solar_radiation = document.getElementById("solarRadiation").value;
    const rotation_sequence = document.getElementById("rotationSequence").value;

    const data = {
        region, season, soil_type,
        soil_ph, soil_nitrogen, soil_phosphorus,
        soil_potassium, soil_organic_matter, soil_moisture,
        avg_rainfall, solar_radiation, rotation_sequence
    };

    try {
        const response = await fetch("http://localhost:5000/predict-croprotation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById("cropRotationResult").innerHTML = `<div class="alert alert-success">Recommended Crop Rotation: ${result.recommended_crop}</div>`;
    } catch (error) {
        document.getElementById("cropRotationResult").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
});