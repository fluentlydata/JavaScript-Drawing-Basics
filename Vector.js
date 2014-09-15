var NULL = 0.00000001; // numerical stability (division by zero)

function Vector(x,y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(val1, val2) {
	this.x += val1;
	this.y += val2;
	return this;
}

Vector.prototype.add = function(anotherVector) {
	this.x += anotherVector.x;
	this.y += anotherVector.y;
	return this;
}

Vector.prototype.scale = function(value) {
	this.x *= value;
	this.y *= value;
	return this;
}

Vector.prototype.length = function() {
	return Math.sqrt( Math.pow(this.x,2) + Math.pow(this.y,2) );
}

Vector.prototype.normalize = function() {
	var l = this.length();
	if (l > NULL) {	
		this.x *= 1.0/(l);
		this.y *= 1.0/(l);
	}
	return this;
}

// returns a new Vector in direction AB with length 1
// A and B are vectors, too.
var getUnitVector = function(A, B) {
	var unit = new Vector(B.x-A.x, B.y-A.y);
	var l = unit.length();
	if (l > NULL) {
		unit.scale(1.0/(unit.length()));
	}
	return unit;
}