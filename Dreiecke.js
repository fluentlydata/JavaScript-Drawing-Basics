var loadCanvas = function() {
	var c = document.getElementById("myCanvas");
	c.width = document.body.clientWidth; //document.width is obsolete
    c.height = document.body.clientHeight; //document.height is obsolete
	ctx = c.getContext("2d");
	return ctx;
}

var main = function() {
	var ctx = loadCanvas();
	var triangles = [];
	nTriangles = 100;
	var i=0;
	while(i<nTriangles) {
		var t = new Triangle();
		t.scale(Math.random()*100);
		t.rotate(Math.random()*Math.PI*2);
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		t.color(r,g,b);
		t.move(Math.random()*500,Math.random()*500);
		t.draw(ctx);
		triangles.push(t);
		i++;
	}
}