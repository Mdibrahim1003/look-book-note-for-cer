function addRow() {
    const table = document.getElementById('log-entries');
    const newRow = table.insertRow();

    for (let i = 0; i < 15; i++) {
        const cell = newRow.insertCell(i);
        const input = document.createElement('input');
        input.type = i === 0 ? 'date' : i === 3 || i === 5 ? 'time' : 'text';
        if (i === 7 || i === 8) input.type = 'number';
        if (i === 9) input.type = 'number', input.readOnly = true;
        cell.appendChild(input);
    }

    updateCalculations();
}

function updateCalculations() {
    const mileStartInputs = document.querySelectorAll('.mile-meter-start');
    const mileEndInputs = document.querySelectorAll('.mile-meter-end');
    const totalMilesInputs = document.querySelectorAll('.total-miles');

    mileStartInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            const startValue = parseFloat(input.value);
            const endValue = parseFloat(mileEndInputs[index].value);
            totalMilesInputs[index].value = isNaN(startValue) || isNaN(endValue) ? '' : (endValue - startValue);
        });
    });

    mileEndInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            const startValue = parseFloat(mileStartInputs[index].value);
            const endValue = parseFloat(input.value);
            totalMilesInputs[index].value = isNaN(startValue) || isNaN(endValue) ? '' : (endValue - startValue);
        });
    });
}

function printPage() {
    window.print();
}

document.addEventListener('DOMContentLoaded', updateCalculations);
