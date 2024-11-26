let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const events = {};


function initializeCalendar() {
    // Populate year selector
    const yearSelect = document.getElementById('yearSelect');
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }

    yearSelect.addEventListener('change', (e) => {
        currentYear = parseInt(e.target.value);
        renderCalendar();
    });

    // Add month selector functionality
    const monthSelect = document.getElementById('monthSelect');
    monthSelect.value = currentMonth;
    monthSelect.addEventListener('change', (e) => {
        currentMonth = parseInt(e.target.value);
        renderCalendar();
    });

    renderCalendar();
}


function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML = '';

    function renderCalendar() {
        // Existing code...
        
        // Add days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = d;
    
            // Highlight Sundays
            if (new Date(currentYear, currentMonth, d).getDay() === 0) {
                dayEl.classList.add('holiday');
            }
    
            // Check for holidays
            if (isHoliday(new Date(currentYear, currentMonth, d))) {
                dayEl.classList.add('holiday');
            }
    
            // Check for events
            const dateStr = `${currentYear}-${currentMonth + 1}-${d}`;
            if (events[dateStr]) {
                dayEl.classList.add('has-event');
            }
    
            // Add click event listener to show event modal
            dayEl.addEventListener('click', () => showEventModal(new Date(currentYear, currentMonth, d)));
            calendarEl.appendChild(dayEl);
        }
    }
    

    // Add calendar header
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const header = document.createElement('div');
    header.className = 'calendar-header';
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        header.appendChild(dayEl);
    });
    calendarEl.appendChild(header);

    // Calculate days in selected month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Add empty cells for days before first day of month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarEl.appendChild(emptyDay);
    }

    // Add days in the current month
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = d.getDate();

        // Highlight Sundays
        if (d.getDay() === 0) {
            dayEl.classList.add('holiday'); // Add holiday class for Sundays
        }

        // Check for holidays
        if (isHoliday(d)) {
            dayEl.classList.add('holiday');
        }

        // Check for events
        const dateStr = `${currentYear}-${d.getMonth() + 1}-${d.getDate()}`;
        if (events[dateStr]) {
            dayEl.classList.add('has-event');
        }

        dayEl.addEventListener('click', () => showEventModal(d));
        calendarEl.appendChild(dayEl);
    }
}



function showEventModal(date) {
    const modal = document.getElementById('eventModal');
    const dateInput = document.getElementById('eventDate');
    dateInput.value = date.toLocaleDateString('id-ID');

    const dateStr = `${currentYear}-${date.getMonth() + 1}-${date.getDate()}`;
    const holidayName = getHolidayName(date);
    const event = events[dateStr];

    let message = '';
    if (holidayName) {
        message = `Hari Libur: ${holidayName}`;
    }
    if (event) {
        message += `\nKegiatan: ${event.title}\n${event.description}`;
    }
    if (!holidayName && !event) {
        message = 'Tidak ada kegiatan Hari ini';
    }

    alert(message);
    modal.classList.add('active');
}


function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
}

function saveEvent() {
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;
    const whatsapp = document.getElementById('whatsappNumber').value;

    if(!title || !description) {
        alert('Mohon isi semua field!');
        return;
    }

    // Format date for storage
    const [day, month, year] = date.split('/');
    const dateStr = `${year}-${month}-${day}`;

    // Save event
    events[dateStr] = {
        title,
        description,
        whatsapp
    };

    // Show success message
    alert('Jangan lupa dengan Kegiatan yang anda rencanakan');

    // Send to backend
    fetch('api/save_event.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: dateStr,
            title,
            description,
            whatsapp
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan kegiatan');
    });

    closeModal();
    renderCalendar();
}



// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', initializeCalendar);