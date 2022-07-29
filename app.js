const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = [
  "#27ae60",
  "#9b59b6",
  "#e74c3c",
  "#d35400",
  "#bdc3c7",
  "#f1c40f",
];
canvas.width = 800;
canvas.height = 800;

canvas.addEventListener("click", onClick);

function onClick(event) {
  ctx.beginPath();
  ctx.moveTo(400, 400);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

canvas.addEventListener("mousemove", onClick);
