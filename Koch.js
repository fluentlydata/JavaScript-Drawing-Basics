var ctx; // global variable for the canvas context
var data; // global array which holds the linesegments
var NULL = 0.00000001; // numerical stability (division by zero)

var main = function() {
	loadCanvas();
	var it = document.getElementById("iterations").value;
	console.log("number of iterations: ", it);
	run(it, 1000);
}

var loadCanvas = function() {
	var c = document.getElementById("myCanvas");
	c.width = document.body.clientWidth; //document.width is obsolete
    c.height = document.body.clientHeight; //document.height is obsolete
	ctx = c.getContext("2d");
}

// runs the computation
// iterations: depth of the computation
// length length of the first linesegment (in iteration 0)
var run = function(iterations, length) {
	A = new Vector(0.0, 0.0);
	B = new Vector(length, 0.0);
	data = [new Line(A, B)]
	
	i = 0;
	while (i<iterations) {
		var newData = [];
		for(k=0;k<data.length;k++) {
			computeKochLines(data[k], newData);
		}
		data = newData.slice(0); // copies newData into data
		drawLines(data);
		i++;
	}
}

// computes the koch curve
// line a linesegment of the current koch curve
// list the output array which holds the new line segments
var computeKochLines = function (line, list) {
	var A = line.A;
	var B = line.B;
		
	var s = getDistanceBetween(A, B);
		
	var C = new Vector(A.x, A.y);
	C.add(getUnitVector(A,B).scale(s/3));
	
	var D = new Vector(A.x, A.y);
	D.add(getUnitVector(A,B).scale(s*2/3));

	var U = getUnitVector(A,B);
	
	var a = (1.0 + Math.pow(U.y/U.x,2));
	if (a<= 0) console.log(a);
	var b = 1.0 / a;
	if (b<= 0) console.log(b);
	var Ey = Math.sqrt( b );
	var c = 1.0 - b;
	if (c<= 0) console.log(c);
	var Ex = Math.sqrt(c);
	
	if (U.y == 0) {
		if (U.x < 0) {
			Ey *= -1;
		}
	}
	else if (U.y > 0) { 
		Ex *= -1; 
		
		if (U.x < 0) {
			Ey *= -1;
		}
	}
	else if (U.y < 0) { 
		
		if (U.x < 0) {
			Ey *= -1;
		}
	}
	
	var normal = new Vector(Ex, Ey);
	normal.normalize();
	
	var E = new Vector(A.x, A.y);
	E.add(getUnitVector(A,B).scale(s/2));
	E.add(normal.scale(Math.sqrt(3)/2*s/3));
	list.push(new Line(A,C));
	list.push(new Line(C,E));
	list.push(new Line(E,D));
	list.push(new Line(D,B));
}

var drawLines = function(lines) {	
	ctx.beginPath();
	lines.forEach(drawLineSegment);
	ctx.stroke();
}

var drawLineSegment = function(element, index, array) {
	var A = element.A;
	var B = element.B;
	
	ctx.moveTo(A.x, A.y);
	ctx.lineTo(B.x, B.y);
}

var getDistanceBetween = function(A, B) {
	return Math.sqrt( Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2) );
}
