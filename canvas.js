function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.style = 'black';

function drawCircle(circle) {
    c.beginPath();
    c.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2);
    c.fillStyle = circle.color;
    c.fill();
}

function drawCircles(circles) {
    for (var i = 0; i < circles.length; i++) {
        drawCircle(circles[i]);
    }
}

circles = [];
for (var i = 0; i < 100; i++) {
    var r = Math.random() * 80 + 2;
    var x = Math.random() * (canvas.width - r * 2) + r;
    var y = Math.random() * (canvas.height - r * 2) + r;
    var horSpeed = (Math.random() * 3 + 1) * ((Math.random() > 0.5) ? 1 : -1);
    var verSpeed = (Math.random() * 3 + 1) * ((Math.random() > 0.5) ? 1 : -1);

    var color = getRandomColor();

    circles.push( {centerX: x, centerY: y, radius: r, color: color, deltaX: horSpeed, deltaY: verSpeed} );
}

function animate() {
    requestAnimationFrame(animate);
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.fill();

    drawCircles(circles);
    for (var i = 0; i < circles.length; i++) {
        //If hitting a horizontal wall, change horizontal direction
        if ((circles[i].centerX + circles[i].deltaX + circles[i].radius > canvas.width) || (circles[i].centerX + circles[i].deltaX - circles[i].radius < 0)) {
            circles[i].deltaX *= (-1);
        }
        //If hitting a vertical wall, change vertical direction
        if ((circles[i].centerY + circles[i].deltaY + circles[i].radius > canvas.height) || (circles[i].centerY + circles[i].deltaY - circles[i].radius < 0)) {
            circles[i].deltaY *= (-1);
        }

        circles[i].centerX += circles[i].deltaX;
        circles[i].centerY += circles[i].deltaY;
    }
}

animate();
