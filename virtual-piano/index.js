const piano = document.querySelector('.piano');
const fullscreenButton = document.querySelector('.fullscreen');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');


function playAudioKey(e){
    const audio = document.querySelector(`audio[data-keycode="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-keycode="${e.keyCode}"]`);
    if(e.repeat) return;
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('piano-key-active');
    key.classList.add('piano-key-active-pseudo');
}

function stopAudioKey(e){
    const key = document.querySelector(`div[data-keycode="${e.keyCode}"]`);
    key.classList.remove('piano-key-active-pseudo');
    key.classList.remove('piano-key-active');
}

function playAudioMouse(e){
    const audio = document.querySelector(`audio[data-keycode="${e.target.dataset.keycode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    e.target.classList.add('piano-key-active-pseudo');
    e.target.classList.add('piano-key-active');
    pianoKeys.forEach((pianoKey) => {
        pianoKey.addEventListener('mouseover', play);
        pianoKey.addEventListener('mouseout', stop);
    });
}

function stopAudioMouse(e){
    e.target.classList.remove('piano-key-active-pseudo');
    e.target.classList.remove('piano-key-active');
    pianoKeys.forEach((pianoKey) => {
        pianoKey.removeEventListener('mouseover', play);
        pianoKey.removeEventListener('mouseout', stop);
    });
}

function play(e){
    const key = document.querySelector(`div[data-keycode="${e.target.dataset.keycode}"]`);
    const audio = document.querySelector(`audio[data-keycode="${e.target.dataset.keycode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('piano-key-active-pseudo');
    key.classList.add('piano-key-active');
}

function stop(e){
    const key = document.querySelector(`div[data-keycode="${e.target.dataset.keycode}"]`);
    key.classList.remove('piano-key-active-pseudo');
    key.classList.remove('piano-key-active');
}

function letterNotes(btn){
    if(btn.target.classList.contains('btn-letters')){
        btnLetters.classList.add('btn-active');
        btnNotes.classList.remove('btn-active')
        pianoKeys.forEach(e => e.classList.add('piano-key-letter'));
    }
    else if(btn.target.classList.contains('btn-notes')){
        btnNotes.classList.add('btn-active');
        btnLetters.classList.remove('btn-active')
        pianoKeys.forEach(e => e.classList.remove('piano-key-letter'));
    }
}

function getFullScreenElement(){
    return document.fullscreenElement || document.webkitFullscreenElement;
}

function toggleScreen(){
    if(!getFullScreenElement()){
        document.documentElement.requestFullscreen();
    }else if(getFullScreenElement()){
        document.exitFullscreen();
    }
}

fullscreenButton.addEventListener('click', toggleScreen)

btnLetters.addEventListener('click', letterNotes);
btnNotes.addEventListener('click', letterNotes);

piano.addEventListener('mousedown', playAudioMouse);
window.addEventListener('mouseup', stopAudioMouse);

window.addEventListener('keydown', playAudioKey);
window.addEventListener('keyup', stopAudioKey)

