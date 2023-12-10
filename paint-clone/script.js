const activeToolEl = document.getElementById("active-tool");
const brushColorBtn = document.getElementById("brush-color");
const brushIcon = document.getElementById("brush");
const brushSize = document.getElementById("brush-size");
const brushSlider = document.getElementById("brush-slider");
const bucketColorBtn = document.getElementById("bucket-color");
const eraser = document.getElementById("eraser");
const clearCanvasBtn = document.getElementById("clear-canvas");
const saveStorageBtn = document.getElementById("save-storage");
const loadStorageBtn = document.getElementById("load-storage");
const clearStorageBtn = document.getElementById("clear-storage");
const downloadBtn = document.getElementById("download");
const { body } = document;

// Global Variables
const canvas = document.createElement("canvas");
canvas.id = "canvas";
const context = canvas.getContext("2d");
let currentSize = 10;
let bucketColor = "#FFFFFF";
let currentColor = "#A51DAB";
let isEraser = false;
let isMouseDown = false;
let drawnArray = [];

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}
