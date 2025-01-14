let editingScheduleId = null;  // Track if we're editing a schedule

function toggleScheduleForm(schedule = null) {
    const formSection = document.getElementById('schedule-form-section');
    const formTitle = document.getElementById('form-title');
    
    if (schedule) {
        editingScheduleId = schedule.id;
        formTitle.textContent = "Edit Schedule";
        document.getElementById('title').value = schedule.title;
        document.getElementById('time').value = schedule.time;
        document.getElementById('location').value = schedule.location;
        document.getElementById('description').value = schedule.description;
    } else {
        editingScheduleId = null;
        formTitle.textContent = "Add New Schedule";
        document.getElementById('schedule-form').reset();
    }

    formSection.style.display = formSection.style.display === "none" ? "block" : "none";
}

function submitSchedule(event) {
    event.preventDefault();

    const scheduleData = {
        title: document.getElementById('title').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
    };

    if (editingScheduleId) {
        // Edit the existing schedule
        fetch(`/api/schedules/${editingScheduleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchSchedules();
            toggleScheduleForm();
        });
    } else {
        // Add a new schedule
        fetch('/api/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchSchedules();
            toggleScheduleForm();
        });
    }
}

function fetchSchedules() {
    fetch('/api/schedules')
        .then(response => response.json())
        .then(schedules => {
            const scheduleList = document.getElementById('schedule-list');
            scheduleList.innerHTML = '';
            schedules.forEach(schedule => {
                const item = document.createElement('div');
                item.className = 'schedule-item';

                item.innerHTML = `
                    <i class="${schedule.icon}" style="font-size: 2em; margin-right: 15px;"></i>
                    <div>
                        <h3>${schedule.title}</h3>
                        <p>${schedule.time}</p>
                        <p>${schedule.location}</p>
                        <p>${schedule.description}</p>
                    </div>
                    <button onclick="toggleScheduleForm(${schedule})">Edit</button>
                    <button onclick="deleteSchedule(${schedule.id})">Delete</button>
                `;
                scheduleList.appendChild(item);
            });
        });
}

function deleteSchedule(id) {
    fetch(`/api/schedules/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchSchedules();
    });
}

fetchSchedules();
