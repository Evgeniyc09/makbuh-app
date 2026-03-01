
document.addEventListener("DOMContentLoaded", (event) => {
    popupWindow()
    initialRating()
});

function initialRating() {
	document.querySelectorAll(".v-rating").forEach(rating => {
		const stars = rating.querySelectorAll(".v-rating__star");
		const hiddenInput = rating.querySelector("#rating-value");

		stars.forEach(star => {
			star.addEventListener("click", () => {
				const value = parseInt(star.dataset.value, 10);
				hiddenInput.value = value;
				rating.dataset.rating = value;

				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= value);
				});
			});

			star.addEventListener("mouseover", () => {
				const hoverValue = parseInt(star.dataset.value, 10);
				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= hoverValue);
				});
			});

			rating.addEventListener("mouseleave", () => {
				const savedValue = parseInt(rating.dataset.rating, 10);
				stars.forEach(s => {
					s.classList.toggle("filled", parseInt(s.dataset.value, 10) <= savedValue);
				});
			});
		});
	});
}


function popupWindow() {
	const ScrollLock = (() => {
    let locked = false, scrollTop = 0;
    return {
      lock() {
        if (locked) return;
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        Object.assign(document.body.style, {
          position:'fixed', top:`-${scrollTop}px`, left:'0', right:'0', width:'100%', overflow:'hidden'
        });
        locked = true;
      },
      unlock() {
        if (!locked) return;
        Object.assign(document.body.style, {
          position:'', top:'', left:'', right:'', width:'', overflow:''
        });
        window.scrollTo(0, scrollTop);
        locked = false;
      }
    };
  })();

  const Popup = {
    open(id) {
      const el = document.getElementById(id);
      if (!el || el.classList.contains('active')) return;
      el.classList.remove('closing');
      el.classList.add('active');
      el.setAttribute('aria-hidden', 'false');
      const content = el.querySelector('.popup-window__content');
      if (content) setTimeout(() => content.focus(), 0);
      if (!document.querySelector('.popup-window.active:not(#' + id + ')')) {
        ScrollLock.lock();
      }
    },
    close(id) {
      const el = document.getElementById(id);
      if (!el || !el.classList.contains('active')) return;
      el.classList.add('closing');
      el.classList.remove('active');
      el.setAttribute('aria-hidden', 'true');
      const onEnd = (e) => {
        if (e.target !== el) return;
        el.removeEventListener('transitionend', onEnd);
        el.classList.remove('closing');
        if (!document.querySelector('.popup-window.active')) {
          ScrollLock.unlock();
        }
      };
      el.addEventListener('transitionend', onEnd);
    },
    closeAll() {
      document.querySelectorAll('.popup-window.active').forEach(el => this.close(el.id));
    }
  };

  window.Popup = Popup;

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-popup-open]');
    const closeBtn = e.target.closest('[data-popup-close]');

    if (openBtn) {
      e.preventDefault();
      const id = openBtn.getAttribute('data-popup-open');
      Popup.open(id);
    }

    if (closeBtn) {
      e.preventDefault();
      const popup = closeBtn.closest('.popup-window');
      if (popup?.id) Popup.close(popup.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const actives = document.querySelectorAll('.popup-window.active');
      const last = actives[actives.length - 1];
      if (last?.id) Popup.close(last.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const actives = document.querySelectorAll('.popup-window.active');
    if (!actives.length) return;
    const content = actives[actives.length - 1].querySelector('.popup-window__content');
    if (!content) return;

    const focusables = content.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;

    const first = focusables[0];
    const last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  });
}