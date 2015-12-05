'use strict';

var elem = document.getElementById('pushscroll');

elem.addEventListener('click', skip);

function skip() {
	var vh = window.innerHeight*0.9;
	window.scroll(0, vh);
}