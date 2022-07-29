const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const fileInput = document.getElementById("file");
const saveBtn = document.getElementById("save-btn");
const modeBtn = document.getElementById("mode-btn");
const eraserAllBtn = document.getElementById("eraser-all-btn");
const eraserModeBtn = document.getElementById("eraser-btn");
const lineWidth = document.getElementById("line-width");
const lineColor = document.getElementById("line-color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textInput = document.getElementById("text");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isFilling = false;
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
  isPainting = true;
}

function onMouseUp(event) {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.beginPath();
  ctx.lineWidth = event.target.value;
}

function onLineColorChange(event) {
  ctx.beginPath();
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onLineColorClick(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  lineColor.value = event.target.dataset.color;
}

function onModeClick(event) {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onEraserAllClick(event) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(event) {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
  ctx.lineWidth = event.target.value;
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null; // 새로운 이미지를 받기위한 비우기
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;

    ctx.font = "45px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick(event) {
  const url = canvas.toDataURL(); // base64 인코드
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
lineColor.addEventListener("change", onLineColorChange);
colorOptions.forEach((color) =>
  color.addEventListener("click", onLineColorClick)
);
saveBtn.addEventListener("click", onSaveClick);
modeBtn.addEventListener("click", onModeClick);
eraserAllBtn.addEventListener("click", onEraserAllClick);
eraserModeBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
