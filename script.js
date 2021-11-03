function createGrid(gridSize) {
  let divGrid = document.createElement("div");
  divGrid.className = "div-grid";
  document.body.appendChild(divGrid);
  let divRow;
  for (let i = 0; i < gridSize; i++) {
    divRow = document.createElement("div");
    divRow.className = "div-row";
    divGrid.appendChild(divRow);
    let divCell;
    for (let j = 0; j < gridSize; j++) {
      divCell = document.createElement("div");
      divRow.appendChild(divCell);
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
      if ((div.style.backgroundColor = "transparent" && mouseDown == 1)) {
        div.style.backgroundColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
      }
      div.addEventListener("click", (e) => {
        if (div.style.backgroundColor != "transparent") {
          div.style.backgroundColor = "transparent";
          // div.style.backgroundColor = `transparent`;
        }
      });
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

window.onload = () => {
  createGrid(36);
  gridPen();
  let clearButton = document.getElementById("clear-button");
  clearButton.addEventListener("click", gridClear);
};
