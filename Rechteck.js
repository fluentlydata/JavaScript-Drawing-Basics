var ctx;

var loadCanvas = function() {
	var c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
}

var main = function() {
	loadCanvas();
	ctx.beginPath();
	ctx.fillStyle="#FF0000";
	// ctx.rect(0,0,200,300);
	ctx.fillRect(0,0,200,300);
	ctx.stroke();
}