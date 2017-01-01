//Return to initial state.
initState = function() {
	for (let key in dagN) dagN[key].count = 0;
	for (let key in dagP) dagP[key].prob = 0.5;
	svgN.selectAll('.count').remove();
	svgP.selectAll('.prob').remove();
	displayCounts();
	displayProbs();
}
