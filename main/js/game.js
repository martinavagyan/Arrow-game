/**
	Author: Martin Avagyan
*/

/*
// Hover



var hoverEngine ={
	fistMove: true,
	currentPosition: undefined,	
	acceptedCell: function()
	{
		console.log('I am inside Accepted Cell');
		if (hoverEngine.firstMove === true){
			console.log('on glow');
			hoverEngine.firstMove = false;
			return game.glowACord();			
		}
		else if(this.firstMove === false)
			return currentPosition();
	},
	
	
	possibleMoves: function()
	{	
		var arrayReturn = [];
		arrayReturn.push( [this.acceptedCell[0] + 1,this.acceptedCell[1]]);
		arrayReturn.push( [this.acceptedCell[0] - 1,this.acceptedCell[1]]);
		arrayReturn.push( [this.acceptedCell[0],this.acceptedCell[1] + 1]);
		arrayReturn.push( [this.acceptedCell[0],this.acceptedCell[1] - 1]);
		
		return arrayReturn;
	}
	
	
}
//console.log(hoverEngine.acceptedCell);


document.addEventListener('mouseover', function(e) {
	console.log(hoverEngine.acceptedCell());
	var arr = hoverEngine.possibleMoves();
	var translate = game.calc();	
	//console.log(arr);
	for(index in arr){
		if(e.target == translate[index])
		{
			e.target.style.boxShadow = "0px 0px 15px black";
		}
	}
});		
**/
















