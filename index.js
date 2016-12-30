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
//Numbers of visitors and responses. Updated as program runs.
//The following identities hold:
//vTot = i1Tot + i2Tot
//i1Tot = i1Up + i1Dn
//I2Tot = i2Up + i2Dn
let numbs = {
	vTot: 0, //Total visitors.
	i1Tot: 0, //Total Item 1 responses.
	i1Up: 0, //Thumbs up responses.
	i1Dn: 0, //Thumbs down responses.
	i2Tot: 0, //Total Item 2 responses.
	i2Up: 0, //Thumbs up responses.
	i2Dn: 0 //Thumbs down responses.
};
//Probabilities. Updated as program runs.
let probs = {
	p1: 0.5, //Probability of selecting Item 1.
	p1Up: 0.5, //For Item 1, probability of thumbs up.
	p2Up: 0.5	 //For Item 2, probability of thumbs up.
};
//Update probability given y heads and n trials.
//Assume a uniform prior.
function upProb(y, n) {
	return (y + 1) / (n + 2);
}

//Set up the nodes in #numbs as ellipses, intended hold counts.
//The nodes correspond to the fields in the numbs object.
const xRad = '40px'; //The x radius of a node.
const yRad = '20px'; //The y radius of a node.
//The following object stores the centers of the svgN ellipses, which will also serve as the end points of the paths between ellipses.
const centers = {
	vTot: {
		cx: parseInt(xRad) + 0.05 * wN,
		cy: hN / 2
	},
	i1Tot: {
		cx: 0.45 * wN,
		cy: (1/3) * hN
	},
	i2Tot: {
		cx: 0.45 * wN,
		cy: (2/3) * hN
	},
	i1Up: {
		cx: 0.8 * wN,
		cy: 0.15 * hN
	},
	i1Dn: {
		cx: 0.8 * wN,
		cy: 0.38 * hN
	},
	i2Up: {
		cx: 0.8 * wN,
		cy: 0.62 * hN
	},
	i2Dn: {
		cx: 0.8 * wN,
		cy: 0.85 * hN
	}
};
svgN.append('line')
	.attr('id', 'line0_1')
	.attr('x1', centers.vTot.cx)
	.attr('y1', centers.vTot.cy)
	.attr('x2', centers.i1Tot.cx)
	.attr('y2', centers.i1Tot.cy);
svgN.append('line')
	.attr('id', 'line0_2')
	.attr('x1', centers.vTot.cx)
	.attr('y1', centers.vTot.cy)
	.attr('x2', centers.i2Tot.cx)
	.attr('y2', centers.i2Tot.cy);
svgN.append('line')
	.attr('id', 'line1_1')
	.attr('x1', centers.i1Tot.cx)
	.attr('y1', centers.i1Tot.cy)
	.attr('x2', centers.i1Up.cx)
	.attr('y2', centers.i1Up.cy);
svgN.append('line')
	.attr('id', 'line1_2')
	.attr('x1', centers.i1Tot.cx)
	.attr('y1', centers.i1Tot.cy)
	.attr('x2', centers.i1Dn.cx)
	.attr('y2', centers.i1Dn.cy);
svgN.append('line')
	.attr('id', 'line1_3')
	.attr('x1', centers.i2Tot.cx)
	.attr('y1', centers.i2Tot.cy)
	.attr('x2', centers.i2Up.cx)
	.attr('y2', centers.i2Up.cy);
svgN.append('line')
	.attr('id', 'line1_4')
	.attr('x1', centers.i2Tot.cx)
	.attr('y1', centers.i2Tot.cy)
	.attr('x2', centers.i2Dn.cx)
	.attr('y2', centers.i2Dn.cy);
svgN.selectAll('line').attr('class', 'line');

//Draw ellipses after lines so that lines are covered.
svgN.append('ellipse')
	.attr('cx', centers.vTot.cx)
	.attr('cy', centers.vTot.cy);
svgN.append('ellipse')
	.attr('cx', centers.i1Tot.cx)
	.attr('cy', centers.i1Tot.cy);
svgN.append('ellipse')
	.attr('cx', centers.i2Tot.cx)
	.attr('cy', centers.i2Tot.cy);
svgN.append('ellipse')
	.attr('cx', centers.i1Up.cx)
	.attr('cy', centers.i1Up.cy);
svgN.append('ellipse')
	.attr('cx', centers.i1Dn.cx)
	.attr('cy', centers.i1Dn.cy);
svgN.append('ellipse')
	.attr('cx', centers.i2Up.cx)
	.attr('cy', centers.i2Up.cy);
svgN.append('ellipse')
	.attr('cx', centers.i2Dn.cx)
	.attr('cy', centers.i2Dn.cy);
//Set common characteristics of ellipses in svgN.
svgN.selectAll('ellipse')
	.attr('class', 'node')
	.attr('rx', xRad )
	.attr('ry', yRad );

//Draw text after ellipses.
//Text representing counts.
svgN.append('text')
	.attr('id', 'vTot')
	.attr('class', 'count')
	.attr('x', centers.vTot.cx)
	.attr('y', centers.vTot.cy);
svgN.append('text')
	.attr('id', 'i1Tot')
	.attr('class', 'count')
	.attr('x', centers.i1Tot.cx)
	.attr('y', centers.i1Tot.cy);
svgN.append('text')
	.attr('id', 'i2Tot')
	.attr('class', 'count')
	.attr('x', centers.i2Tot.cx)
	.attr('y', centers.i2Tot.cy);
svgN.append('text')
	.attr('id', 'i1Up')
	.attr('class', 'count')
	.attr('x', centers.i1Up.cx)
	.attr('y', centers.i1Up.cy);
svgN.append('text')
	.attr('id', 'i1Dn')
	.attr('class', 'count')
	.attr('x', centers.i1Dn.cx)
	.attr('y', centers.i1Dn.cy);
svgN.append('text')
	.attr('id', 'i2Up')
	.attr('class', 'count')
	.attr('x', centers.i2Up.cx)
	.attr('y', centers.i2Up.cy);
svgN.append('text')
	.attr('id', 'i2Dn')
	.attr('class', 'count')
	.attr('x', centers.i2Dn.cx)
	.attr('y', centers.i2Dn.cy);
svgN.selectAll('text').text(0)
	.attr('dy', '0.3em');

//Append labels.
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.vTot.cx)
	.attr('y', centers.vTot.cy)
	.text('Visitors');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i1Tot.cx)
	.attr('y', centers.i1Tot.cy)
	.text('Item 1');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i2Tot.cx)
	.attr('y', centers.i2Tot.cy)
	.text('Item 2');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i1Up.cx)
	.attr('y', centers.i1Up.cy)
	.text('Thumbs Up');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i1Dn.cx)
	.attr('y', centers.i1Dn.cy)
	.text('Thumbs Down');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i2Up.cx)
	.attr('y', centers.i2Up.cy)
	.text('Thumbs Up');
svgN.append('text')
	.attr('class', 'label')
	.attr('x', centers.i2Dn.cx)
	.attr('y', centers.i2Dn.cy)
	.text('Thumbs Down');

svgN.selectAll('text')
	.attr('text-anchor', 'middle');
svgN.selectAll('text.label')
	.attr('dy', '2.1em');


//Flip a coin with probability of heads p.
//Return a logical value, i.e., true or false.
function flip(p) {
	return Math.random() <= p ? true : false;
}

d3.select('#visit').on('click', () => {
	console.log('--- visit ---');
	svgN.select('#vTot').text(++numbs.vTot);
	if (flip(probs.p1)) { //Visiting Item 1.
		svgN.select('#i1Tot').text(++numbs.i1Tot);
		if (flip(probs.p1Up)) {
			svgN.select('#i1Up').text(++numbs.i1Up);		
		} else {
			svgN.select('#i1Dn').text(++numbs.i1Dn);
		}
	} else { //Visiting Item 2.
		svgN.select('#i2Tot').text(++numbs.i2Tot);
		if (flip(probs.p2Up)) {
			svgN.select('#i2Up').text(++numbs.i2Up);		
		} else {
			svgN.select('#i2Dn').text(++numbs.i2Dn);
		}		
	}
	//Update probabilities.
	probs.p1 = upProb(numbs.i1Tot, numbs.vTot);
	probs.p1Up = upProb(numbs.i1Up, numbs.i1Tot);
	probs.p2Up = upProb(numbs.i2Up, numbs.i2Tot);
	console.log('probs:');
	console.log(probs);
	
});
