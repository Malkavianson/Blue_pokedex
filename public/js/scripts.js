let names = [];


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

if(document.querySelector('#deck')!=null){
	document.querySelector('#deck').oncontextmenu = function(event){
		event.preventDefault();
		event.stopPropagation();
		return false
	};
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
	currentIndex = i.slice(1) - 1;
	setPositionByIndex();
}

class validation {
    constructor() {
        this.form = document.querySelector('#enterPoke');
        this.events();
    }
  
    events() {
        this.form.addEventListener('submit', e => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
        e.preventDefault();
        const valid = this.validPoke();

        if(valid === true) {
            this.form.submit();
        }
    }

    validPoke() {
        const pokemon = this.form.querySelector("#name");
        const text = `${pokemon.value} is already included`;
        let registred = false;

        for(let name of names) {
            if(name.toLowerCase() === pokemon.value.toLowerCase().trim()){
                pokemon.value = "";
                pokemon.placeholder = text;
                pokemon.style.animation = "mvc .3s linear 1 backwards";
                pokemon.addEventListener("webkitAnimationEnd", () => pokemon.style.animation = null);
                pokemon.addEventListener("animationend", () => pokemon.style.animation = null);
                registred = true;
                break;
            }
        }

        if(registred === false) {
            return true;
        }

        return false
    }
}
  
if(document.querySelector("#enterPoke")){
    const valid = new validation();
	names = pk.map((e) => e.name)
}