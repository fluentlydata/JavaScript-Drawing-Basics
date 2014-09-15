// equilateral triangle with centroid at zero and circumcircle 1
function Triangle() {
	this.points = [];
	this.points.push(new Vector(0.0, 1.0));
	this.points.push(new Vector(Math.sin(Math.PI/3), -Math.cos(Math.PI/3)));
	this.points.push(new Vector(-Math.sin(Math.PI/3), -Math.cos(Math.PI/3)));
}

// draws the triangle onto the context ctx
Triangle.prototype.draw = function(ctx) {
	ctx.beginPath();
	var p = this.points[0];
	ctx.moveTo(p.x, p.y);
	for (var i=1;i<this.points.length;i++) {
		var p = this.points[i];
		ctx.lineTo(p.x, p.y);
	}
	var p = this.points[0];
	ctx.lineTo(p.x, p.y);
	ctx.strokeStyle = this.color;
	ctx.stroke();
	ctx.restore();
}

Triangle.prototype.move = function(dx,dy) {
	for (var i=0;i<this.points.length;i++) {
		var p = this.points[i];
		p.x += dx;
		p.y += dy;
	}
}

// angle in radiant
Triangle.prototype.rotate = function(angle) {
	this.angle = angle;
	for (var i=0;i<this.points.length;i++) {
		var p = this.points[i];
		var pxTemp = p.x;
		p.x = p.x * Math.cos(angle) - p.y * Math.sin(angle);
		p.y = pxTemp * Math.sin(angle) + p.y * Math.cos(angle);
	}
}

Triangle.prototype.color = function(r,g,b) {
	this.color = "rgb(".concat(r,",",g,",",b,")");
}

Triangle.prototype.scale = function(value) {
	for (var i=0;i<this.points.length;i++) {
		var p = this.points[i];
		console.log(p);
		p.x *= value;
		p.y *= value;
		console.log(p);
	}
}