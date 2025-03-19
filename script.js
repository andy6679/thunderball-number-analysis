// Open the relevant tab
function openTab(evt, tabName) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

// Read and display the uploaded CSV file
document.getElementById("uploadFile").addEventListener("click", function() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const resultsDiv = document.getElementById("results");

        // Split the content by rows, then split each row by commas
        const rows = content.split("\n");
        const parsedData = rows.map(row => row.split(","));

        // Ensure the first row is the header and skip it during data processing
        const headers = parsedData[0];

        // Arrays to store frequencies of main numbers and thunderball numbers
        const mainNumbersFreq = Array(39).fill(0); // Main numbers (1-39)
        const thunderballFreq = Array(14).fill(0); // Thunderball numbers (1-14)

        // Display the data in a table
        let output = "<table><thead><tr>";
        headers.forEach(header => {
            output += `<th>${header}</th>`;
        });
        output += "</tr></thead><tbody>";

        parsedData.slice(1).forEach(row => {
            if (row.length === 10) { // Ensure the row has all necessary fields
                output += "<tr>";
                row.forEach(cell => {
                    output += `<td>${cell}</td>`;
                });

                // Process main numbers and Thunderball number
                for (let i = 1; i <= 5; i++) {
                    const mainNum = parseInt(row[i], 10);
                    if (mainNum >= 1 && mainNum <= 39) {
                        mainNumbersFreq[mainNum - 1]++;
                    }
                }
                const thunderballNum = parseInt(row[6], 10);
                if (thunderballNum >= 1 && thunderballNum <= 14) {
                    thunderballFreq[thunderballNum - 1]++;
                }
                output += "</tr>";
            }
        });

        output += "</tbody></table>";
        resultsDiv.innerHTML = output;

        // Display frequencies of main numbers
        let mainNumbersOutput = "<table><thead><tr><th>Number</th><th>Frequency</th></tr></thead><tbody>";
        for (let i = 0; i < 39; i++) {
            mainNumbersOutput += `<tr><td>${i + 1}</td><td>${mainNumbersFreq[i]}</td></tr>`;
        }
        mainNumbersOutput += "</tbody></table>";
        document.getElementById("mainNumbersFreq").innerHTML = mainNumbersOutput;

        // Display frequencies of Thunderball numbers
        let thunderballOutput = "<table><thead><tr><th>Thunderball Number</th><th>Frequency</th></tr></thead><tbody>";
        for (let i = 0; i < 14; i++) {
            thunderballOutput += `<tr><td>${i + 1}</td><td>${thunderballFreq[i]}</td></tr>`;
        }
        thunderballOutput += "</tbody></table>";
        document.getElementById("thunderballFreq").innerHTML = thunderballOutput;
    };

    reader.readAsText(file);
});

// Generate a fresh set of random numbers (1-39 for main, 1-14 for Thunderball)
function generateRandomNumbers() {
    let mainNumbers = new Set();
    while (mainNumbers.size < 5) {
        mainNumbers.add(Math.floor(Math.random() * 39) + 1);
    }
    let thunderball = Math.floor(Math.random() * 14) + 1; // Random Thunderball number
    return { mainNumbers: [...mainNumbers], thunderball };
}

// Generate suggestions on button click
document.getElementById("suggestNumbers").addEventListener("click", function() {
    let { mainNumbers, thunderball } = generateRandomNumbers();
    document.getElementById("suggestionResult").innerText = "Suggested Main Numbers: " + mainNumbers.join(", ") + " | Suggested Thunderball: " + thunderball;
});

// Generate combinations based on selected count (2, 3, 4, or 5 numbers)
document.getElementById("generateCombinations").addEventListener("click", function() {
    let comboCount = parseInt(document.getElementById("comboCount").value);
    let combinations = [];
    for (let i = 0; i < 5; i++) {
        let numbers = new Set();
        while (numbers.size < comboCount) {
            numbers.add(Math.floor(Math.random() * 39) + 1);
        }
        combinations.push([...numbers].join(", "));
    }
    document.getElementById("combinationsResult").innerText = "Combinations:\n" + combinations.join("\n");
});

// Calculate the probability for the entered number (1-39 for main numbers)
document.getElementById("calculateProbability").addEventListener("click", function() {
    let inputNumber = parseInt(document.getElementById("inputNumber").value);
    if (inputNumber >= 1 && inputNumber <= 39) {
        let probability = Math.floor(Math.random() * 100) + 1; // Random mock probability
        document.getElementById("probabilityResult").innerText = `Probability of ${inputNumber}: ${probability}%`;
    } else {
        document.getElementById("probabilityResult").innerText = "Please enter a valid number between 1 and 39.";
    }
});
