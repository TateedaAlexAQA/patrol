document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data-table');

    // Добавляем обработчик события submit для формы калькулятора
    document.getElementById('calculator-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var year = parseInt(document.getElementById('year').value);
        var month = parseInt(document.getElementById('month').value);

        var vacationStart = new Date(document.getElementById('vacation-start').value);
        vacationStart.setHours(0, 0, 0, 0);

        var vacationEnd = new Date(document.getElementById('vacation-end').value);
        vacationEnd.setHours(0, 0, 0, 0);

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            alert('Будь ласка, введіть коректні дані.');
            return;
        }

        var tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        var startDate = new Date(year, month - 1, 1);
        var endDate = new Date(year, month, 0);

        for (var date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            if (date.getDay() !== 0 && date.getDay() !== 6 && !(date.getTime() >= vacationStart.getTime() && date.getTime() <= vacationEnd.getTime())) {
                var newRow = document.createElement('tr');
                var newDateCell = document.createElement('td');
                newDateCell.textContent = formatDate(date);
                newRow.appendChild(newDateCell);

                for (var j = 0; j < 3; j++) {
                    var emptyNewCell = document.createElement('td');
                    newRow.appendChild(emptyNewCell);
                }

                tableBody.appendChild(newRow);
            }
        }
    });

    // Добавляем обработчик события клика по кнопке "Додати до таблиці" для дозаправок
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

    // Функція для форматування дати в формат "ДД.ММ.РРРР"
    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
    }
});
