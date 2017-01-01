'use strict';
//Find the width of the body.
const body = d3.select('body').node();
const width = body.getBoundingClientRect().width;
const mBtw = '3px'; //A margin to insert between the two SVG els.
const wN = Math.floor((3/5) * width) - parseInt(mBtw);
const wP = Math.floor((2/5) * width) - parseInt(mBtw);
const hN = Math.round((2/3) * wN);
const hP = Math.round((2/3) * wP);
const svgN = d3.select('#numbs');
const svgP = d3.select('#probs');
svgN.style('margin-right', mBtw);
svgP.style('margin-left', mBtw);
svgN.attr('height', hN).attr('width', wN);
svgP.attr('height', hP).attr('width', wP);
//Draw a rectangle at the border of each SVG.
svgN.append('rect')
	.attr('height', hN)
	.attr('width', wN)
	.style('fill', 'none')
	.style('stroke', 'black')
	.style('stroke-width', '1px');
svgP.append('rect')
	.attr('height', hP)
	.attr('width', wP)
	.style('fill', 'none')
	.style('stroke', 'black')
	.style('stroke-width', '1px');

//Set up nodes as ellipses.
const xRad = '40px'; //The x radius of a node.
const yRad = '20px'; //The y radius of a node.

//========== Titles ==========
svgN.append('text')
	.attr('class', 'title')
	.text('Counts')
	.attr('text-anchor', 'start')
	.attr('x', '10px')
	.attr('y', '30px');
svgP.append('text')
	.attr('class', 'title')
	.text('Probabilities')
	.attr('text-anchor', 'start')
	.attr('x', '10px')
	.attr('y', '30px');

//========== svgN setup ==========
//Characterize the directed acyclic graph rendered in the '#numbs' SVG.
const dagN = {
	vTot: {
		count: 0,
		cx: parseInt(xRad) + 0.05 * wN,
		cy: hN / 2,
		links: ['i1Tot', 'i2Tot'],
		label: 'Visitors'
	},
	i1Tot: {
		count: 0,
		cx: 0.45 * wN,
		cy: (1/3) * hN,
		links: ['i1Up', 'i1Dn'],
		label: 'Item 1'
	},
	i2Tot: {
		count: 0,
		cx: 0.45 * wN,
		cy: (2/3) * hN,
		links: ['i2Up', 'i2Dn'],
		label: 'Item 2'
	},
	i1Up: {
		count: 0,
		cx: 0.8 * wN,
		cy: 0.15 * hN,
		links: [],
		label: 'Thumbs Up'
	},
	i1Dn: {
		count: 0,
		cx: 0.8 * wN,
		cy: 0.38 * hN,
		links: [],
		label: 'Thumbs Down'
	},
	i2Up: {
		count: 0,
		cx: 0.8 * wN,
		cy: 0.62 * hN,
		links: [],
		label: 'Thumbs Up'
	},
	i2Dn: {
		count: 0,
		cx: 0.8 * wN,
		cy: 0.85 * hN,
		links: [],
		label: 'Thumbs Down'
	}
};

//Draw lines between nodes.
for (let key0 in dagN) {
	let nodeX = dagN[key0];
	for (let index in nodeX.links) {
		svgN.append('line')
			.attr('class', 'line')
			.attr('x1', dagN[key0].cx)
			.attr('y1', dagN[key0].cy)
			.attr('x2', dagN[nodeX.links[index]].cx)
			.attr('y2', dagN[nodeX.links[index]].cy);			
	}
}

//Draw ellipses after lines so that lines are covered.
for (let key in dagN) {
	svgN.append('ellipse')
		.attr('cx', dagN[key].cx)
		.attr('cy', dagN[key].cy);	
}

//Text representing counts.
//Draw after ellipses so that text appears inside ellipses.
//Wrapped in a function so that display of counts can be easily updated.
function displayCounts() {
	for (let key in dagN) {
		svgN.append('text')
			.attr('id', key)
			.attr('class', 'count')
			.text(dagN[key].count)
			.attr('x', dagN[key].cx)
			.attr('y', dagN[key].cy)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.32em');
	}	
}
displayCounts();

//Append labels.
for (let key in dagN) {
	svgN.append('text')
		.attr('class', 'label')
		.attr('x', dagN[key].cx)
		.attr('y', dagN[key].cy)
		.text(dagN[key].label);	
}

//========== svgP setup ==========

//Characterize the directed acyclic graph rendered in the '#probs' SVG.
const yDelta = 0.3;
const dagP = {
	p1: {
		prob: 0.5,
		cx: parseInt(xRad) + 0.10 * wP,
		cy: hP / 2,
		links: ['p1Up', 'p2Up'],
		label: 'Choose Item 1'
	},
	p1Up: {
		prob: 0.5,
		cx: 0.7 * wP,
		cy: yDelta * hP,
		links: [],
		label: 'Item 1: Thumbs Up'
	},
	p2Up: {
		prob: 0.5,
		cx: 0.7 * wP,
		cy: (1 - yDelta) * hP,
		links: [],
		label: 'Item 2: Thumbs Up'
	}
};

//Draw lines between nodes.
for (let key0 in dagP) {
	//debug:
	console.log(key0);
	let nodeX = dagP[key0];
	console.log(nodeX);
	for (let index in nodeX.links) {
		svgP.append('line')
			.attr('class', 'line')
			.attr('x1', dagP[key0].cx)
			.attr('y1', dagP[key0].cy)
			.attr('x2', dagP[nodeX.links[index]].cx)
			.attr('y2', dagP[nodeX.links[index]].cy);
	}
}

//Draw ellipses after lines so that lines are covered.
for (let key in dagP) {
	svgP.append('ellipse')
		.attr('cx', dagP[key].cx)
		.attr('cy', dagP[key].cy);	
}

//Draw text representing probabilities.
//Draw after ellipses that so text appears inside ellipses.
//Wrapped in a function so that display of probabilities can be easily updated.
function displayProbs() {
	for (let key in dagP) {
		svgP.append('text')
			.attr('id', key)
			.attr('class', 'prob')
			.text(dagP[key].prob)
			.attr('x', dagP[key].cx)
			.attr('y', dagP[key].cy)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.3em');
	}	
}
displayProbs();

//Append labels.
for (let key in dagP) {
	svgP.append('text')
		.attr('class', 'label')
		.attr('x', dagP[key].cx)
		.attr('y', dagP[key].cy)
		.text(dagP[key].label);	
}

//========== Adjust label positions ==========
d3.selectAll('.label')
	.attr('text-anchor', 'middle')
	.attr('dy', '2.2em');

//========== Set common characteristics of ellipses ==========
d3.selectAll('ellipse')
	.attr('class', 'node')
	.attr('rx', xRad )
	.attr('ry', yRad );

//========== Buttons ==========

//Flip a coin with probability of heads p.
//Return true if heads, false if tails.
function flip(p) {
	return Math.random() <= p ? true : false;
}

//Format probabilities.
function fmt(p, digits) {
	const factor = Math.pow(10, digits);
	const result = Math.round(p * factor) / factor;
	//Convert to string with the indicated number of trailing digits.
	//This may seem redundant with the previous line but it causes round fractions like 0.5 to be formatted as, say, 0.500 when digits = 3.
	return result.toFixed(digits);
}

//Update probability given y heads and n trials.
//Assume a uniform prior.
function upProb(y, n) {
	return (y + 1) / (n + 2);
}

function visit() {
	console.log('--- visit ---');
	svgN.select('#vTot').text(++dagN.vTot.count);
	if (flip(probs.p1)) { //Visiting Item 1.
		svgN.select('#i1Tot').text(++dagN.i1Tot.count);
		if (flip(probs.p1Up)) { //Thumbs up.
			svgN.select('#i1Up').text(++dagN.i1Up.count);		
		} else {
			svgN.select('#i1Dn').text(++dagN.i1Dn.count);
		}
	} else { //Visiting Item 2.
		svgN.select('#i2Tot').text(++dagN.i2Tot.count);
		if (flip(probs.p2Up)) { //Thumbs up.
			svgN.select('#i2Up').text(++dagN.i2Up.count);		
		} else {
			svgN.select('#i2Dn').text(++dagN.i2Dn.count);
		}		
	}
	//Update probabilities.
	const digits = 3;
	probs.p1 = upProb(dagN.i1Tot.count, dagN.vTot.count);
	svgP.select('#p1').text(fmt(probs.p1, digits));
	probs.p1Up = upProb(dagN.i1Up.count, dagN.i1Tot.count);
	svgP.select('#p1Up').text(fmt(probs.p1Up, digits));
	probs.p2Up = upProb(dagN.i2Up.count, dagN.i2Tot.count);
	svgP.select('#p2Up').text(fmt(probs.p2Up, digits));	
}

d3.select('#visit').on('click', visit);

d3.select('#visit100').on('click', () =>{
	for (let ii = 0; ii < 100; ++ii) visit();
});

d3.select('#visit1000').on('click', () =>{
	for (let ii = 0; ii < 1000; ++ii) visit();
});

d3.select('#clear').on('click', () => {
	initState();
});
