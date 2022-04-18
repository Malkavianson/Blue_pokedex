// Slide de Smartphone
function wdPokemon(){
	if (window.matchMedia('(orientation: landscape)').matches) { 
		return 0.3
	} else {
		return 1 
	};
}
const slider = document.querySelector('.cards'),
	slides = Array.from(document.querySelectorAll('.pokemon'));

const landers = document.querySelector('.lander'),
	minis = Array.from(document.querySelectorAll('.mini'));

	
let isDragging = false,
	startPos = 0,
	currentTranslate = 0,
	prevTranslate = 0,
	animationID = 0,
	currentIndex = 0;

// minis.forEach((mini, i) => {
	// const img = mini.querySelector('img')
	// img.addEventListener('dragstart', (el) => el.
	// preventDefault())

	// mini.addEventListener('touchend', changing(i))
	// mini.addEventListener('mouseup', changing(i))
// });	
	
slides.forEach((slide, index) => {
	const slideImage = slide.querySelector('img')
	slideImage.addEventListener('dragstart', (el) => el.
	preventDefault())
	
	slide.addEventListener('touchstart', touchStart(index), {passive: true})
	slide.addEventListener('touchend', touchEnd)
	slide.addEventListener('touchmove', touchMove, {passive: true})
	
	slide.addEventListener('mousedown', touchStart(index), {passive: true})
	slide.addEventListener('mouseup', touchEnd)
	slide.addEventListener('mouseleave', touchEnd)
	slide.addEventListener('mousemove', touchMove, {passive: true})

});

//desativar o menu de contexto
document.querySelector('#deck').oncontextmenu = function(event){
	event.preventDefault();
	event.stopPropagation();
	return false
}

function touchStart(index){
	return function(event){
		currentIndex = index;
		startPos  = getPositionX(event);
		isDragging = true;
		animationID = requestAnimationFrame(animation);
		slider.classList.add('grabbing')
	}
};

function touchEnd(){
	isDragging = false;
	cancelAnimationFrame(animationID);
	const movedby = currentTranslate - prevTranslate;
	if(movedby < -100 && currentIndex < slides.length - 1) {
		currentIndex += 1;
	} else if(movedby < -100 && currentIndex < slides.length){
		currentIndex = 0;
	}
	
	if(movedby > 100 && currentIndex > 0) {
		currentIndex -= 1;
	} else if(movedby > 100 && currentIndex === 0){
		currentIndex = slides.length - 1;
	}
	setPositionByIndex();
	slider.classList.remove('grabbing');
};

function touchMove(event){
	if(isDragging){
		const currentPosition = getPositionX(event);
		currentTranslate = prevTranslate + currentPosition - startPos;
	}
};

function getPositionX(event){
	return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation(){
	setSliderPosition();
	if(isDragging) requestAnimationFrame(animation);
}

function setSliderPosition(){
	slider.style.transform = `translateX(${currentTranslate*wdPokemon()}px)`;
}

function setPositionByIndex(){
	currentTranslate = currentIndex * -window.innerWidth;
	prevTranslate = currentTranslate;
	setSliderPosition();  
}
function changing(i){
	currentIndex = i[1]-1;
	setPositionByIndex();
}

//Slide de Smartphone - end