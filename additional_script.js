document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.querySelector('button[type="button"]');
    const dataTable = document.getElementById('data-table');

    calculateButton.addEventListener('click', function(event) {
        event.preventDefault();

        const fuelConsumption = parseInt(document.getElementById('consumption').value);
        const rows = dataTable.querySelectorAll('tbody tr');
        const fuelIndices = [];

        rows.forEach((row, index) => {
            const refuelingCell = row.querySelector('td:nth-child(4)');
            if (refuelingCell.textContent.trim() !== '') {
                fuelIndices.push(index);
            }
        });
        // Create an array of row indices
        const rowIndices = Array.from(rows).map((row, index) => index);
        // Create an array of arrays, each containing indices of rows with consecutive refueling data
        const arrayOfArrays = fuelIndices.map((index, i, arr) => {
            return (i === arr.length - 1) ? rowIndices.slice(index) : rowIndices.slice(index, arr[i + 1]);
        });
        // Loop through each array of row indices
        for (let i = 0; i < arrayOfArrays.length; i++) {
            const refuelingPeriod = arrayOfArrays[i];
            let fuelInTank = 0;
            // Loop through each index in the current array
            for (let j = 0; j < refuelingPeriod.length; j++) {
                const rowNumber = refuelingPeriod[j] + 1;
                const fuelTank = dataTable.querySelector(`tbody tr:nth-child(${rowNumber}) td:nth-child(2)`);
                const distance = dataTable.querySelector(`tbody tr:nth-child(${rowNumber}) td:nth-child(3)`);
                const safeDistance = Math.floor(fuelInTank / refuelingPeriod.length * 100 / fuelConsumption) + Math.floor(Math.random() * 21) - 10;
                
                if (j === 0 && i === 0) { 
                    fuelTank.textContent = dataTable.querySelector(`tbody tr:nth-child(${rowNumber}) td:nth-child(4)`).textContent;
                    distance.textContent = Math.floor(Math.random() * 16) + 10;
                    fuelInTank = parseInt(fuelTank.textContent) - 6;
                } else if (j === 0 && i > 0) { 
                    fuelTank.textContent =
                        parseInt(dataTable.querySelector(`tbody tr:nth-child(${rowNumber - 1}) td:nth-child(2)`).textContent)
                        - (parseInt(dataTable.querySelector(`tbody tr:nth-child(${rowNumber - 1}) td:nth-child(3)`).textContent) * fuelConsumption / 100)
                        + parseInt(dataTable.querySelector(`tbody tr:nth-child(${rowNumber}) td:nth-child(4)`).textContent);
                    fuelInTank = parseInt(fuelTank.textContent) - 6;
                    distance.textContent = Math.floor(Math.random() * 16) + 10;
                } else {
                    fuelTank.textContent =
                        parseInt(dataTable.querySelector(`tbody tr:nth-child(${rowNumber - 1}) td:nth-child(2)`).textContent)
                        - (parseInt(dataTable.querySelector(`tbody tr:nth-child(${rowNumber - 1}) td:nth-child(3)`).textContent) * fuelConsumption / 100);
                    distance.textContent = safeDistance;
                }
                
            }
        }
    });
});
