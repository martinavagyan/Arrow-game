/**
	Author: Martin Avagyan
*/

function hasClass( elem, klass ) {
     return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
};

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
};
function reindexOf(o,arr){
	var arrayReturn = [];
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {			
			if (arr[[i,j]] == o) {
				arrayReturn.push(i,j);
				return arrayReturn;
				console.log('I have been here');
			}
		}
	}
return -1;
};

function build()
{
    var cont = document.getElementById("container");
    cont.innerHTML = null;
    for(var i = 0; i<36;i++)
    {
        cont.innerHTML += '<div></div>';
    }
};
function randomise ()
{
	var container = document.getElementById("container").children;
	
	for(var i = 0; i<36; i++)
	{
		var x = 1 + Math.floor(Math.random()*4);
		switch(x)
		{
			case 1:		
			container[i].setAttribute("class","cell arrowB");
			break;
			case 2:
			container[i].setAttribute("class","cell arrowL");
			break;
			case 3:
			container[i].setAttribute("class","cell arrowT");
			break;
			case 4:
			container[i].setAttribute("class","cell arrowR");
			break;
			default:
			break;
		}
		if(i == 5 || i==11 || i==17 || i==23 || i==29 || i==35)
		{
			container[i].setAttribute("class",container[i].className+" mgr0");
		}
		if(i == 30 || i==31 || i==32 || i==33 || i==34 || i==35)
		{
			container[i].setAttribute("class",container[i].className+" mgb0");
		}
	}	
};


function randomPoints()
{
	var container = document.getElementById("container").children;
	var x = Math.floor(Math.random()*36);	
	var y = Math.floor(Math.random()*36);
	while(y==x)
	{ y = Math.floor(Math.random()*36);}
    stylePoints([container[x],container[y]]);
}

function stylePoints(elems)
{
    move.arrowRemover(elems[0]);
    move.arrowRemover(elems[1]);
    elems[0].className += " glowA active current";
    elems[1].className += " glowB";
    elems[0].setAttribute('id','current');
    elems[1].setAttribute('id','glowB');
}


var game={
    x: 0,
    y: 0,
    rawCells: document.getElementById("container").children,

    calc: function ()
    {
        var k = 0;
        var cells = new Array;
        for(var i=0;i<6;i++)
        {
            for(var j=0;j<6;j++)
            {
                cells[[i,j]] = game.rawCells[k];
                k++;
            }
        }
        return cells;
    },

    current: function()
    {
        var current = document.getElementById('current');
        var cells = game.calc();
        var arrayReturn = reindexOf(current,cells);
        this.x = arrayReturn[0];
        this.y = arrayReturn[1];
    }

};


var move={
    left: false,
    up: false,
    right: false,
    down: false,

    change: 0,

    arrowFalse: function()
    {
        move.left = false;
        move.up = false;
        move.right = false;
        move.down = false;
    },
    possibleMoves: function()
    {
        var arrayReturn = new Array();
        if(game.x < 5)
        {
            arrayReturn.push( [game.x + 1,game.y]);
            move.down = true;
        }
        if(game.x > 0)
        {
            arrayReturn.push( [game.x - 1,game.y]);
            move.up = true;
        }
        if(game.y < 5)
        {
            arrayReturn.push( [game.x,game.y+ 1]);
            move.right = true;
        }
        if(game.y > 0)
        {
            arrayReturn.push( [game.x,game.y - 1]);
            move.left = true;
        }
        return arrayReturn;
    },
    glowChecker: function(elemNew)
    {
        console.log('I am now Chaking for glow');
        if(elemNew.id == 'glowB')
        {
            alert("Count of the Moves " + move.change);
            start();
            return true;
        }
        else return false;
    },
    arrowRemover: function(elemOld)
        {
            var currentArrow = '';
            if(hasClass(elemOld,'arrowR'))
                currentArrow = 'arrowR';
            if(hasClass(elemOld,'arrowB'))
                currentArrow = 'arrowB';
            if(hasClass(elemOld,'arrowL'))
                currentArrow = 'arrowL';
            if(hasClass(elemOld,'arrowT'))
                currentArrow = 'arrowT';
            removeClass(elemOld,currentArrow);
        },

    arrowChanger: function(key)
    {
        var t0 = performance.now();

        var allow = false;
        var remove = false;
        var newArrow = '';
        var elemNew = undefined;
        var elemOld =  game.calc()[[game.x,game.y]];
        console.log('L: '+move.left+' | R: '+move.right+' | U: '+move.up+' | D: '+move.down + ' allow: '+allow+' | remove: '+remove);
        switch(key)
        {
            case 37:

                if(move.left === true){
                    elemNew = game.calc()[ [game.x,game.y - 1]];
                }
                else{
                    elemNew = game.calc()[ [game.x,game.y + 5]];
                }



                if(!hasClass(elemOld,'arrowL') && !hasClass(elemOld,'glowA'))
                {
                    newArrow = 'arrowL';
                    move.change++; alert('Change = '+move.change);
                    remove = true;
                }
                if(move.glowChecker(elemNew)) break;
                allow = true;

                break;
            case 38:

                if(move.up === true){
                    elemNew = game.calc()[ [game.x - 1,game.y]];
                }
                else{
                    elemNew = game.calc()[ [game.x + 5,game.y]];
                }

                 if(!hasClass(elemOld,'arrowT') && !hasClass(elemOld,'glowA'))
                {
                    newArrow = 'arrowT';
                    move.change++; alert('Change = '+move.change);
                    remove = true;
                }
                if(move.glowChecker(elemNew)) break;
                allow = true;

                break;
            case 39:

                if(move.right !== false){
                    elemNew = game.calc()[ [game.x,game.y + 1]];
                }
                else{
                    elemNew = game.calc()[ [game.x,game.y - 5]];
                }

                if(!hasClass(elemOld,'arrowR') && !hasClass(elemOld,'glowA'))
                {
                    newArrow = 'arrowR';
                    move.change++; alert('Change = '+move.change);
                    remove = true;
                }
                if(move.glowChecker(elemNew)) break;
                allow = true;
                break;
            case 40:
                if(move.down !== false){
                    elemNew = game.calc()[ [game.x + 1,game.y]];
                }
                else{
                    elemNew = game.calc()[ [game.x - 5,game.y]];
                }

                if(!hasClass(elemOld,'arrowB') && !hasClass(elemOld,'glowA'))
                {
                    newArrow = 'arrowB';
                    move.change++; alert('Change = '+move.change);
                    remove = true;
                }
                if(move.glowChecker(elemNew)) break;
                allow = true;
                break;
        }
        if(allow === true)
        {
            console.log('I am allowed to process further ');
            if(remove)
            {
               move.arrowRemover(elemOld);
            };
            elemOld.id = null;
            elemNew.id = 'current';
            elemOld.className+= ' active ' + newArrow;
            semiStart();
        }

        var t1 = performance.now();
        console.log(t1 - t0);
    }
}

/**
 * Movement Engine
 */
document.addEventListener('keydown', function(e){
    move.arrowChanger(e.keyCode);
});



function start()
{
    var t0 = performance.now();

    move.change = 0;
    build();
    randomise();
    randomPoints();
    game.current();
    move.arrowFalse();
    move.possibleMoves();

    var t1 = performance.now();
    console.log(t1 - t0);
}


function semiStart()
{
    game.current();
    move.arrowFalse();
    move.possibleMoves();
}
start();