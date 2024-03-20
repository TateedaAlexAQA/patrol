document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку "Розрахувати"
    const calculateButton = document.querySelector('button[type="button"]');
    const dataTable = document.getElementById('data-table');

    // Добавляем обработчик события клика по кнопке "Розрахувати"
    calculateButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Получаем значение из поля с расходом топлива
        var consumption = parseInt(document.getElementById('consumption').value);
        console.log('Расход топлива:', consumption);

        // Получаем значение из 4-го столбца первой строки таблицы
        var fuelLeftCell = dataTable.querySelector('tbody tr:first-child td:nth-child(4)');
        console.log('Значение из 4-го столбца первой строки таблицы:', fuelLeftCell.textContent);

        // Записываем общий расход топлива в первую строку таблицы, в столбец "Залишок в баку"
        var firstRowFuelLeftCell = dataTable.querySelector('tbody tr:first-child td:nth-child(2)');
        //firstRowFuelLeftCell.textContent = fuelLeftCell.textContent;

        // Выводим общий расход топлива в консоль
        console.log('Общий расход топлива:', fuelLeftCell.textContent);

        const rows = dataTable.querySelectorAll('tbody tr');
        const rowIndices = Array.from(rows).map((row, index) => index);

        console.log('Индексы строк в таблице:');
        console.log(rowIndices);
        
        const fuelIndices = [];

        rows.forEach((row, index) => {
            // Получаем значение из ячейки в колонке "Дозаправка"
            const refuelingCell = row.querySelector('td:nth-child(4)');
            // Если значение в ячейке не пустое, добавляем индекс строки в массив fuelIndices
            if (refuelingCell.textContent.trim() !== '') {
                fuelIndices.push(index);
            }
        });

        console.log('Индексы строк с дозаправкой:');
        console.log(fuelIndices);

        //переберем массив
        const arrayOfArrays = fuelIndices.map((index, i, arr) => {
            if (i === arr.length - 1) {
                return rowIndices.slice(index);
            } else {
                return rowIndices.slice(index, arr[i + 1]);
            }
        });
        
        console.log(arrayOfArrays);

        for (let i = 0; i < arrayOfArrays.length; i++) {
            const temp = arrayOfArrays[i]; // Массив индексов строк для текущей группы
            let safeTank = parseInt(dataTable.querySelector(`tbody tr:nth-child(${temp[0] + 1 }) td:nth-child(2)`).textContent) - 6;
            console.log(safeTank);
            for (let j = 0; j < temp.length; j++) { // Итерация по индексам строк внутри текущей группы
                const arr = temp[j] + 1; // Индекс строки в таблице (начиная с 1)
                const tank = dataTable.querySelector(`tbody tr:nth-child(${arr}) td:nth-child(2)`);
                const distance = dataTable.querySelector(`tbody tr:nth-child(${arr}) td:nth-child(3)`);
        
                let safeDay = Math.floor(safeTank / temp.length * 100 / consumption) + Math.floor(Math.random() * 21) - 10;
                console.log(safeDay);
                if (j === 0) { // Если это первая строка в группе
                    tank.textContent = dataTable.querySelector(`tbody tr:nth-child(${arr}) td:nth-child(4)`).textContent;
                    distance.textContent = Math.floor(Math.random() * 16) + 10;
                } else {
                    tank.textContent =
                        parseInt(dataTable.querySelector(`tbody tr:nth-child(${arr - 1}) td:nth-child(2)`).textContent)
                        - (parseInt(dataTable.querySelector(`tbody tr:nth-child(${arr - 1}) td:nth-child(3)`).textContent) * consumption / 100);
                    distance.textContent = safeDay;
                }
            }
            console.log(temp);
        }
        

    });
});
