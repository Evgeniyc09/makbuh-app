
document.addEventListener("DOMContentLoaded", (event) => {
	document.querySelectorAll('.tab-buttons button').forEach(button => {
		button.addEventListener('click', () => {
			const tabNumber = button.getAttribute('data-tab');

			// Удалить класс active у всех кнопок и контента
			document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
			document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

			// Добавить класс active к выбранной кнопке и соответствующему контенту
			button.classList.add('active');
			document.querySelector(`.tab-content[data-content="${tabNumber}"]`).classList.add('active');
		});
	});
});