// admin/js/trello_admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем иконки к кнопкам действий
    const actionButtons = document.querySelectorAll('.trello-actions a');
    actionButtons.forEach(button => {
        const icon = document.createElement('i');
        icon.className = 'bi me-1';
        
        if (button.textContent.includes('Открыть')) {
            icon.classList.add('bi-eye');
        } else if (button.textContent.includes('Карточка')) {
            icon.classList.add('bi-plus-circle');
        } else if (button.textContent.includes('Настройки')) {
            icon.classList.add('bi-gear');
        } else if (button.textContent.includes('JSON')) {
            icon.classList.add('bi-code-slash');
        }
        
        button.insertBefore(icon, button.firstChild);
    });
    
    // Подсветка строк таблицы при наведении
    const tableRows = document.querySelectorAll('#result_list tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transition = 'background-color 0.2s ease';
        });
    });
    
    // Плавное раскрытие полей
    const collapsibleFields = document.querySelectorAll('.collapse');
    collapsibleFields.forEach(field => {
        field.style.transition = 'all 0.3s ease';
    });
});