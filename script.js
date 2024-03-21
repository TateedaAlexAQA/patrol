document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data-table');
    const calculatorForm = document.getElementById('calculator-form');

    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const year = parseInt(document.getElementById('year').value);
        const month = parseInt(document.getElementById('month').value);
        const vacationStart = new Date(document.getElementById('vacation-start').value);
        const vacationEnd = new Date(document.getElementById('vacation-end').value);

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            alert('Будь ласка, введіть коректні дані.');
            return;
        }

        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            if (date.getDay() !== 0 && date.getDay() !== 6 && !(date >= vacationStart && date <= vacationEnd)) {
                const newRow = document.createElement('tr');
                const newDateCell = document.createElement('td');
                newDateCell.textContent = formatDate(date);
                newRow.appendChild(newDateCell);

                for (let j = 0; j < 3; j++) {
                    const emptyNewCell = document.createElement('td');
                    newRow.appendChild(emptyNewCell);
                }

                tableBody.appendChild(newRow);
            }
        }
    });

    document.querySelector('button[type="addReFlueing"]').addEventListener('click', function() {
        const refuelingsData = {};

        const refuelingDivs = document.querySelectorAll('.refueling');

        refuelingDivs.forEach(function(refuelingDiv) {
            const refuelingDateInput = refuelingDiv.querySelector('input[type="date"]');
            const refuelingAmountInput = refuelingDiv.querySelector('input[type="number"]');

            const date = refuelingDateInput.value;
            const amount = refuelingAmountInput.value;

            if (date && amount) {
                refuelingsData[date] = amount;
            }
        });

        const tableRows = dataTable.querySelectorAll('tbody tr');

        for (const date in refuelingsData) {
            const formattedDate = date.split('.').reverse().join('-');
            let dateFound = false;

            for (let i = 0; i < tableRows.length; i++) {
                const rowDate = tableRows[i].querySelector('td:first-child').textContent;
                const formattedRowDate = rowDate.split('.').reverse().join('-');

                if (formattedRowDate === formattedDate) {
                    const fuelAmountCell = tableRows[i].querySelector('td:nth-child(4)');
                    fuelAmountCell.textContent = refuelingsData[date];
                    dateFound = true;
                    break;
                }
            }

            if (!dateFound) {
                const errorMessage = `Дозаправка для дати ${date} не може бути додано. дата відсутня у таблиці`;
                console.error(errorMessage);
                alert(errorMessage);
            }
        }
    });

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }
});
