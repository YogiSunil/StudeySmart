document.getElementById('schedule-form').addEventListener('submit', submitSchedule);

let editingScheduleId = null;

function fetchSchedules() {
    fetch('/api/schedules')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('schedule-list');
            list.innerHTML = '';
            data.forEach(schedule => {
                const li = document.createElement('li');
                li.textContent = `${schedule.title} at ${schedule.time} in ${schedule.location}`;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => editSchedule(schedule);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteSchedule(schedule.id);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                list.appendChild(li);
            });
        });
}

function submitSchedule(event) {
    event.preventDefault();

    const scheduleData = {
        title: document.getElementById('title').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        icon: document.getElementById('icon').value,
        reminder: document.getElementById('reminder').value,
        recurrence: document.getElementById('recurrence').value,
        timezone: document.getElementById('timezone').value,
    };

    const url = editingScheduleId ? `/api/schedules/${editingScheduleId}` : '/api/schedules';
    const method = editingScheduleId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchSchedules();
        editingScheduleId = null;
        document.getElementById('schedule-form').reset();
    });
}

function editSchedule(schedule) {
    document.getElementById('title').value = schedule.title;
    document.getElementById('time').value = schedule.time;
    document.getElementById('location').value = schedule.location;
    document.getElementById('icon').value = schedule.icon;
    document.getElementById('reminder').value = schedule.reminder;
    document.getElementById('recurrence').value = schedule.recurrence;
    document.getElementById('timezone').value = schedule.timezone;
    editingScheduleId = schedule.id;
}

function deleteSchedule(scheduleId) {
    fetch(`/api/schedules/${scheduleId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchSchedules();
        });
}

fetchSchedules();
