const root = document.documentElement;
const kanban = document.getElementById('kanban');
const navbar = document.querySelector('.navbar-nav');
const logo = document.querySelector('.logo');
const table = document.querySelector('.table');

const toggleTheme = document.getElementById('toggleTheme');

if(toggleTheme) {
    toggleTheme.addEventListener('click', () => {
        const theme = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        setTheme(theme);
    });
} 

function setTheme(theme) {
    if (theme === 'light') {
        root.style.setProperty('--primary-color', '#fff');
        root.style.setProperty('--secondary-color', '#f5f5f5');
        root.style.setProperty('--background-color', '#fff');
        root.style.setProperty('--today-color', 'red');
        root.style.setProperty('--header-color', '#f0f0f0');
        root.style.setProperty('--popup-color', '#f5f5f5');
        root.style.setProperty('--submit-button-color', '#000');
        root.style.setProperty('--alert-color', '#000');
        root.style.setProperty('--info-color', 'rgba(0, 0, 0, 0.692)');
        root.style.setProperty('--past-date-color', '#FFC107');
        root.style.setProperty('--other-month-color', 'rgb(240, 240, 240)');
        root.style.setProperty('--kanban-color', 'rgba(245, 245, 245, 0.231)');
        root.style.setProperty('--task-background-color', '#495057');
        root.style.setProperty('--navbar-background', '#495057a3');

        root.style.setProperty('--navbar-color', 'var(--primary-color)');
        root.style.setProperty('--border-color', 'var(--primary-color)');
        root.style.setProperty('--task-color', 'var(--header-color)');
        root.style.setProperty('--button-color', 'var(--secondary-color)');
        root.style.setProperty('--input-color', 'var(--background-color)');
        root.style.setProperty('--modal-content-color', 'var(--secondary-color)');

        root.style.setProperty('--text-color', '#000');

        if (kanban && kanban.attributes.getNamedItem('data-bs-theme')) {
            kanban.attributes.getNamedItem('data-bs-theme').value = 'light';
        }
        if (navbar) {
            navbar.classList.remove('navbar-dark');
        }

        if (logo) {
            logo.src = '../assets/images/logo.svg';
        }

        if(table) {
            table.classList.remove('table-dark');
        }

    } else {
        root.style.setProperty('--primary-color', '#1E1E1E');
        root.style.setProperty('--secondary-color', '#535353');
        root.style.setProperty('--background-color', '#333');
        root.style.setProperty('--today-color', 'red');
        root.style.setProperty('--header-color', '#2c2c2c');
        root.style.setProperty('--popup-color', '#222');
        root.style.setProperty('--submit-button-color', '#fff');
        root.style.setProperty('--alert-color', '#fff');
        root.style.setProperty('--info-color', 'rgba(255, 255, 255, 0.692)');
        root.style.setProperty('--past-date-color', '#FFC107');
        root.style.setProperty('--other-month-color', 'rgb(52, 52, 52)');
        root.style.setProperty('--kanban-color', 'rgba(83, 83, 83, 0.231)');
        root.style.setProperty('--task-background-color', '#000000');
        root.style.setProperty('--navbar-background', 'var(--primary-color)');

        root.style.setProperty('--navbar-color', 'var(--primary-color)');
        root.style.setProperty('--border-color', 'var(--primary-color)');
        root.style.setProperty('--task-color', 'var(--header-color)');
        root.style.setProperty('--button-color', 'var(--secondary-color)');
        root.style.setProperty('--input-color', 'var(--background-color)');
        root.style.setProperty('--modal-content-color', 'var(--secondary-color)');

        root.style.setProperty('--text-color', '#fff');

        if (kanban && kanban.attributes.getNamedItem('data-bs-theme')) {
            kanban.attributes.getNamedItem('data-bs-theme').value = 'dark';
        }
        if (navbar) {
            navbar.classList.add('navbar-dark');
        }

        if (logo) {
            logo.src = '../assets/images/logo-light.svg';
        }

        if(table) {
            table.classList.add('table-dark');
        }
    }
}

setTheme(localStorage.getItem('theme') ?? 'light');