import "../scss/main.scss";

console.log('I\'m working!');

const planets = document.querySelectorAll('.planet');
const button = document.querySelector('button');

button.addEventListener('click', () => onClick());

function getAnimationName(element) {
    const cssClassName = element.classList[1];
    const firstLetter = cssClassName.substr(0, 1).toUpperCase();
    const restOfWord = cssClassName.substr(1);
    return `${firstLetter}${restOfWord}`;
}

function onClick() {
    planets.forEach((planet) => {

        const isPlaying = !planet.style.animationPlayState
            || planet.style.animationPlayState === 'running';

        const planetState = isPlaying ? 'paused' : 'running';

        planet.style.animationPlayState = planetState;

        button.innerText = isPlaying ? 'Play!' : 'Stop!';

        console.log(`${getAnimationName(planet)} is ${planetState}`);
    });
}
import _ from 'lodash';
console.log("hello, world");


