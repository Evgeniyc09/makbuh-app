
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

	initModal()
});

function initModal() {
	let lastModalOpener = null;

	function closeAllModals() {
		document.querySelectorAll('.modal.open').forEach(modal => {
			modal.classList.remove('open');
		});
	}
	document.addEventListener('click', function (e) {
		let modalOpen = e.target.closest('[data-modal-open]');
		if (modalOpen) {
			e.preventDefault();
			const id = modalOpen.getAttribute('data-modal-open');
			const modal = document.getElementById(id);
			if (modal) modal.classList.add('open');
			lastModalOpener = modalOpen;
			return;
		}
		if (e.target.hasAttribute('data-modal-close')) {
			e.preventDefault();
			const modal = e.target.closest('.modal');
			if (modal) modal.classList.remove('open');
		}
	});

	window.closeAllModals = closeAllModals;
}