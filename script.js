document.addEventListener('DOMContentLoaded', function() {
    const dataTable = document.getElementById('data-table');

    // Добавляем обработчик события submit для формы калькулятора
    document.getElementById('calculator-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Отримуємо значення року, місяця
        var year = parseInt(document.getElementById('year').value);
        var month = parseInt(document.getElementById('month').value);
        // Отримуємо дати відпустки
        var vacationStart = new Date(document.getElementById('vacation-start').value);
        vacationStart.setHours(0, 0, 0, 0);

        var vacationEnd = new Date(document.getElementById('vacation-end').value);
        vacationEnd.setHours(0, 0, 0, 0);

        // Перевіряємо коректність введених даних
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            alert('Будь ласка, введіть коректні дані.');
            return;
        }

        // Очищаємо таблицю перед додаванням нових даних
        var tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        // Отримуємо перший день місяця
        var startDate = new Date(year, month - 1, 1);
        // Отримуємо останній день місяця
        var endDate = new Date(year, month, 0);

        // Проходимо по кожному дню місяця, починаючи з першого дня
        for (var date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            // Перевіряємо, що день не є суботою або неділею та не знаходиться в діапазоні відпустки
            console.log(vacationStart);
            console.log(vacationEnd);
            if (date.getDay() !== 0 && date.getDay() !== 6 && !(date.getTime() >= vacationStart.getTime() && date.getTime() <= vacationEnd.getTime())) {
                // Створюємо новий рядок для таблиці
                var newRow = document.createElement('tr');
                // Додаємо комірку з датою
                var newDateCell = document.createElement('td');
                newDateCell.textContent = formatDate(date);
                newRow.appendChild(newDateCell);
                // Додаємо пусті комірки для км та дозаправки
                for (var j = 0; j < 3; j++) {
                    var emptyNewCell = document.createElement('td');
                    newRow.appendChild(emptyNewCell);
                }
                // Додаємо рядок в таблицю
                tableBody.appendChild(newRow);
            }
        }
    });

    // Добавляем обработчик события клика по кнопке "Додати до таблиці" для дозаправок
    document.querySelector('button[type="addReFlueing"]').addEventListener('click', function() {
        // Создаем объект для хранения дозаправок
        const refuelingsData = {};

        // Находим все элементы с классом "refueling"
        const refuelingDivs = document.querySelectorAll('.refueling');

        // Проходимся по каждому блоку с дозаправками
        refuelingDivs.forEach(function(refuelingDiv) {
            // Находим поле с датой дозаправки
            const refuelingDateInput = refuelingDiv.querySelector('input[type="date"]');
            // Находим поле с количеством пального
            const refuelingAmountInput = refuelingDiv.querySelector('input[type="number"]');

            // Получаем значения даты и количества пального
            const date = refuelingDateInput.value;
            const amount = refuelingAmountInput.value;

            // Проверяем, что значения не пустые
            if (date && amount) {
                // Добавляем данные в объект
                refuelingsData[date] = amount;
            }
        });

        // Выводим объект в консоль
        console.log(refuelingsData);
        // Получаем строки таблицы
const tableRows = dataTable.querySelectorAll('tbody tr');

// Проходимся по каждой дозаправке в объекте
for (const date in refuelingsData) {
    // Преобразуем формат даты для сравнения
    const formattedDate = date.split('.').reverse().join('-');
    // Проверяем, есть ли дата в таблице
    let dateFound = false;
    for (let i = 0; i < tableRows.length; i++) {
        const rowDate = tableRows[i].querySelector('td:first-child').textContent;
        // Преобразуем формат даты из таблицы для сравнения
        const formattedRowDate = rowDate.split('.').reverse().join('-');
        if (formattedRowDate === formattedDate) {
            // Если нашли дату в таблице, записываем значение в 4 колонку
            const fuelAmountCell = tableRows[i].querySelector('td:nth-child(4)');
            fuelAmountCell.textContent = refuelingsData[date];
            dateFound = true;
            break;
        }
    }
    // Если дата не найдена в таблице, выводим ошибку
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
