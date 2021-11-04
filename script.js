"use strict";

function createGrid(gridSize) {
  let divGrid = document.createElement("div");
  divGrid.className = "div-grid";
  divGrid.id = "grid";
  let toolBar = document.getElementById("toolbar");
  document.body.insertBefore(divGrid, toolBar);
  let divCol;
  for (let i = 0; i < gridSize; i++) {
    divCol = document.createElement("div");
    divCol.className = "div-col";
    divGrid.appendChild(divCol);
    let divCell;
    for (let j = 0; j < gridSize; j++) {
      divCell = document.createElement("div");
      divCol.appendChild(divCell);
      divCell.className = "div-cell";
    }
  }
}

function gridPen() {
  // Create a counter to track whether the mouse left-click is being held down.
  let mouseDown = 0;
  document.body.onmousedown = function () {
    if (mouseDown == 0) {
      ++mouseDown;
    }
  };

  document.body.onmouseup = function () {
    if (mouseDown == 1) {
      --mouseDown;
    }
  };

  let divs = Array.from(document.getElementsByClassName("div-cell"));

  for (const div of divs) {
    div.addEventListener("mousemove", (e) => {
      if (penColor == "rainbow" && mouseDown == 1) {
        div.style.backgroundColor = rainbowPen();
      } else if (penColor == "black" && mouseDown == 1) {
        div.style.backgroundColor = "rgb(0, 0, 0)";
      } else if (penColor == "eraser" && mouseDown == 1) {
        div.style.backgroundColor = "transparent";
      }
    });
  }
}

function gridClear() {
  let divs = Array.from(document.getElementsByClassName("div-cell"));
  for (const div of divs) {
    div.style.backgroundColor = "transparent";
  }
}

function randomRGB() {
  return Math.floor(Math.random() * 255);
}

function rainbowPen() {
  return `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
}

function changeToRainbow() {
  penColor = "rainbow";
}

function changeToBlack() {
  penColor = "black";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// window.onload = () => {
let penColor = "rainbow";
createGrid(16);
gridPen();
let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", gridClear);
let blackButton = document.getElementById("black-button");
blackButton.addEventListener("click", changeToBlack);
let rainbowButton = document.getElementById("rainbow-button");
rainbowButton.addEventListener("click", changeToRainbow);

let slider = document.getElementById("grid-size-slider");
let number = document.getElementById("grid-size-number");

slider.oninput = function () {
  // let oldGrid = document.querySelector("#container");
  // removeAllChildNodes(container);

  let oldGrid = document.getElementById("grid");
  oldGrid.innerHTML = "";
  oldGrid.remove();

  number.value = this.value;
  createGrid(number.value);
  gridPen();
};

number.oninput = function () {
  // let oldGrid = document.querySelector("#container");
  // removeAllChildNodes(container);

  let oldGrid = document.getElementById("grid");
  oldGrid.innerHTML = "";
  oldGrid.remove();

  number.value = this.value;
  createGrid(number.value);
  gridPen();
};
// };
