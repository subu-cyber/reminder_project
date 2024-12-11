// Global Variables
let clockOn = true;

// Clock Functionality
function updateClock() {
    if (clockOn) {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleClockButton = document.getElementById('toggle-clock');
    if (toggleClockButton) {
        toggleClockButton.addEventListener('click', () => {
            clockOn = !clockOn;
            toggleClockButton.textContent = clockOn ? "Turn Clock Off" : "Turn Clock On";
        });

        setInterval(updateClock, 1000);
    }

    // Routine Form
    const routineForm = document.getElementById('routine-form');
    if (routineForm) {
        routineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const task = document.getElementById('task').value.trim();
            const time = document.getElementById('time').value;
            
            if (task && time) {
                const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
                reminders.push({ task, time });
                localStorage.setItem('reminders', JSON.stringify(reminders));
                alert('Routine added successfully!');
                routineForm.reset();
            }
        });
    }

    // Display and Delete Reminders
    const remindersList = document.getElementById('reminders');
    if (remindersList) {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.forEach(({ task, time }, index) => {
            const li = document.createElement('li');
            li.textContent = `${task} at ${time}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn";
            deleteButton.addEventListener('click', () => {
                reminders.splice(index, 1);
                localStorage.setItem('reminders', JSON.stringify(reminders));
                location.reload();
            });

            li.appendChild(deleteButton);
            remindersList.appendChild(li);
        });
    }
});
