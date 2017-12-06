"use strict";

//Keypress
var slide;
var slideNumber;
var crossedDown = false;
var crossedUp = false;

var downButtons = document.querySelectorAll('div.buttons .down a');
var upButtons = document.querySelectorAll('div.buttons .up a');

function key(e) {
	if (e.keyCode === 40) {
		slide = window.location.hash;
		if (slide.length > 0) {
			if (slide === "#p13b") {
				crossedDown = true;
			}
			if (!crossedDown) {
				slideNumber = Number(slide.substring(2, 4));
				downButtons[slideNumber - 1].click();
			} else {
				slideNumber = Number(slide.substring(2, 4)) + 1;
				downButtons[slideNumber - 1].click();
			}
		} else {
			window.location.href = "#p1"
		}
	}
	if (e.keyCode === 38) {
		slide = window.location.hash;
		if (slide.length > 0) {
			if (slide === "#p13b") {
				crossedUp = true;
			}
			if (!crossedUp) {
				slideNumber = Number(slide.substring(2, 4));
				upButtons[slideNumber - 2].click();
			} else {
				slideNumber = Number(slide.substring(2, 4)) + 1;
				upButtons[slideNumber - 2].click();
			}
		} else {
			return;
		}
	}
}

//Smooth Scroll
var scroll = new SmoothScroll('a[href*="#"]');


//Program
var textBox = document.querySelector('#textBox');
var densityOut = document.querySelector('#density');
var speedOut = document.querySelector('#speed');
var timeOut = document.querySelector('#time');

var arr1 = [
	[0, 1, 1],
	[0, 1, 0],
	[0, 1, 0],
	[0, 1, 1],
	[0, 0, 1],
	[0, 0, 1],
	[1, 0, 0],
	[1, 0, 0],
	[1, 0, 1]
]

const G = 1200;
const Y = 2400;
const O = 4800;
const R = 7200;

let trafficDensity = [
	[G, G, G, O, G, Y, G, G, G, O, O],
	[Y, Y, Y, Y, Y, G, G, Y, O, O, O],
	[G, Y, O, O, O, G, Y, G, O, O, O],
	[G, Y, O, Y, Y, Y, G, G, R, O, O],
	[G, G, G, G, G, Y, Y, Y, O, O, O],
	[Y, Y, G, G, Y, G, G, G, G, Y, O],
	[Y, Y, G, G, Y, G, G, G, G, Y, O],
	[G, G, Y, O, O, Y, Y, Y, Y, O, O],
	[G, G, G, Y, O, G, G, G, G, Y, O],
	[G, G, G, Y, G, Y, O, Y, Y, O, G],
	[Y, Y, O, O, Y, R, R, O, O, R, R],
]

let distance = [0.7, 0.5, 0.6, 0.3, 0.4, 1.1, 1, 1, 1.3, 2.5]
let route = [
	[0, 1, 2, 3, 4],
	[0, 5, 6, 4],
	[9, 8, 7]
]
let average = [];
let distSum = [2.5, 3.1, 4.8];

function submit () {
	var input = (Number(textBox.value) / 100) - 10;
	main(input);
}

function main (input) {
	function averageDensity () {
		let densitySum = [0, 0, 0];
		for (let i = 0; i < route.length; i++) {
			for (let j = 0; j < route[i].length; j++) {
				densitySum[i] += trafficDensity[route[i][j]][input] * distance[route[i][j]];
			}
			average[i] = densitySum[i] / distSum[i];
			console.log(average[i]);
		}
	}
	averageDensity(time)

	let y = [];
	let finalTime = [];
	function calcY() {
		for (let i = 0; i < average.length; i++) {
			y[i] = (-2)*Math.pow(10, -10)*Math.pow(average[i], 3) + 3*Math.pow(10, -6)*Math.pow(average[i], 2) - 0.016*average[i] + 51;
			finalTime[i] = distSum[i]*120/y[i];
			console.log(y[i])	
		}
	}
	calcY()

	let min = Math.min.apply(null, finalTime);
	console.log(min)

	function output () {
		var h2 = document.getElementsByTagName('h2');
		for (let i = 0; i < h2.length; i++) {
			h2[i].style.display = 'block'
		}
		densityOut.innerHTML = "";
		speedOut.innerHTML = "";
		timeOut.innerHTML = "";
		for (let i = 0; i < average.length; i++) {
			densityOut.innerHTML += "<strong>Route" + " " + (i+1) + ":</strong> " + Math.round(average[i]*100)/100 + "<br>";
		}
		for (let i = 0; i < y.length; i++) {
			speedOut.innerHTML += "<strong>Route" + " " + (i+1) + ":</strong> " + Math.round(y[i]*100)/100 + "<br>";
		}
		timeOut.innerHTML += Math.round(min*100)/100 + " minutes on Route " + (finalTime.indexOf(min) + 1);
	}
	
	output()
}