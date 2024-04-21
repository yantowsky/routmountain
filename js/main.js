// Слайдер  Hot-deals
const slider = document.querySelector("#slider");
const slides = slider.querySelectorAll(".slide");
const prevButton = slider.querySelector("#prevButton");
const nextButton = slider.querySelector("#nextButton");
const slideCount = slides.length;

let currentIndex = 0;

const showSlide = (index) => {
	currentIndex = (index + slideCount) % slideCount;

	for (const slide of slides) {
		slide.style.transform = `translateX(-${currentIndex * 100}%)`;
	}
};

const updateSlide = (direction) => {
	showSlide(currentIndex + direction);
};

prevButton.addEventListener("click", () => {
	updateSlide(-1);
});

nextButton.addEventListener("click", () => {
	updateSlide(1);
});

showSlide(currentIndex);

//Таби
const tabsBtns = document.querySelectorAll(".response-tabs__link");
const tabsContent = document.querySelectorAll(".response__box");

tabsBtns.forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();

		tabsContent.forEach((tab) => {
			tab.classList.remove("active");
		});

		tabsBtns.forEach((btn) => {
			btn.classList.remove("active");
		});

		const tab_id = e.target.getAttribute("href");

		const tab = document.querySelector(`${tab_id}`);

		tab.classList.add("active");
		button.classList.add("active");
	});
});

//LIghtbox-slider

const photos = document.querySelectorAll(".photos");
const lightboxModal = document.querySelector("#lightboxModal");
const lightboxPhotos = lightboxModal.querySelectorAll(".lightboxModal__slide");
const closelightboxModal = lightboxModal.querySelector(".lightboxModal__close");
const lightboxPrevButton = lightboxModal.querySelector(".lightboxModal__arrow_prev");
const lightboxNextButton = lightboxModal.querySelector(".lightboxModal__arrow_next");
const photosCount = photos.length;
let currentPhotoIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showPhoto(index) {
	currentPhotoIndex = (index + photosCount) % photosCount;
	for (const photo of lightboxPhotos) {
		photo.style.transform = `translateX(-${currentPhotoIndex * 100}%)`;
	}
}

function updatePhoto(direction) {
	showPhoto(currentPhotoIndex + direction);
}

function openLightbox(index) {
	lightboxModal.style.display = "block";
	currentPhotoIndex = index;
	showPhoto(index);
}

closelightboxModal.addEventListener("click", () => {
	lightboxModal.style.display = "none";
});

document.addEventListener("keydown", (event) => {
	if (lightboxModal.style.display === "block") {
		if (event.key === "ArrowLeft") {
			updatePhoto(-1);
		} else if (event.key === "ArrowRight") {
			updatePhoto(1);
		}
	}
});

lightboxModal.addEventListener("touchstart", (event) => {
	touchStartX = event.touches[0].clientX;
});

lightboxModal.addEventListener("touchend", (event) => {
	touchEndX = event.changedTouches[0].clientX;
	handleSwipe();
});

function handleSwipe() {
	const swipeDistance = touchEndX - touchStartX;
	if (swipeDistance > 0) {
		updatePhoto(-1);
	} else if (swipeDistance < 0) {
		updatePhoto(1);
	}
}

photos.forEach((img, index) => {
	img.addEventListener("click", () => {
		openLightbox(index);
	});
});

lightboxPrevButton.addEventListener("click", () => {
	updatePhoto(-1);
});

lightboxNextButton.addEventListener("click", () => {
	updatePhoto(1);
});

showPhoto(currentPhotoIndex);
