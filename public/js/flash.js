const hide = document.querySelectorAll(".hide");

const alert = document.querySelectorAll(".alert");

const closeCard = () => alert.forEach((el) => (el.style.display = none));

hide.forEach((el) =>
	el.addEventListener("click", () => {
		alert.forEach((el) => (el.style.display = "none"));
	}),
);

const fadeOut = () => {
	alert.forEach((card) => card.classList.add("fadeEffect"));
};

fadeOut();

const autoClose = () =>
	setInterval(() => {
		alert.forEach((el) => (el.style.display = "none"));
	}, 3000);

autoClose();
