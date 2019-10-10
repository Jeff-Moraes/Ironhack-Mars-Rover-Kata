// === ROVERS ===
const rover1 = {
  name: "Rover1",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  position: {}
};

const rover2 = {
  name: "Rover2",
  direction: "S",
  x: 9,
  y: 9,
  travelLog: [],
  position: {}
};

// === GRID ===
const grid = [];
function createGrid(numColumn, numRow) {
  for (let i = 0; i <= numColumn; i++) {
    grid[i] = [];
  }
  for (let i = 0; i <= numRow; i++) {
    grid.forEach((column, index) => column.push({ x: index, y: null }));
  }
  grid.map(column => {
    column.map((item, index) => {
      item.y = index;
    });
  });
}
createGrid(9, 9);

// === OBSTACLES ===
const gridObstacles = [];
function createObstacles(numObstacles) {
  for (let i = 0; i < numObstacles; i++) {
    let randomNumX = Math.floor(Math.random() * 10);
    let randomNumY = Math.floor(Math.random() * 10);
    if (
      (randomNumX === 0 && randomNumY === 0) ||
      (randomNumX === 9 && randomNumY === 9)
    ) {
      createObstacles(numObstacles);
    } else {
      if (gridObstacles.length === 3) {
        return;
      } else {
        grid.map(column => {
          column.map(item => {
            if (item.obstacle === true) {
              return;
            } else {
              item.obstacle = false;
            }
          });
        });
        grid[randomNumX][randomNumY].obstacle = true;
        gridObstacles.push({ x: randomNumX, y: randomNumY });
      }
    }
  }
}
createObstacles(3);

// === TURNLEFT ===
function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  console.log(`Rover turned left to ${rover.direction} direction`);
}

// === TURNRIGHT ===
function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log(`Rover turned right to ${rover.direction} direction`);
}

// === MOVEFORWARD ===
function moveForward(rover) {
  if (rover.direction === "N" && rover.x !== 0) {
    rover.x--;
    roverMoved(rover, "Forward");
  } else if (rover.direction === "E" && rover.y !== 9) {
    rover.y++;
    roverMoved(rover, "Forward");
  } else if (rover.direction === "S" && rover.x !== 9) {
    rover.x++;
    roverMoved(rover, "Forward");
  } else if (rover.direction === "W" && rover.y !== 0) {
    rover.y--;
    roverMoved(rover, "Forward");
  } else {
    console.log("Rover can't run outside of the grid!");
  }
}

// === MOVEBACKWARD ===
function moveBackward(rover) {
  if (rover.direction === "N" && rover.x !== 9) {
    rover.x++;
    roverMoved(rover, "Backward");
  } else if (rover.direction === "E" && rover.y !== 0) {
    rover.y--;
    roverMoved(rover, "Backward");
  } else if (rover.direction === "S" && rover.x !== 0) {
    rover.x--;
    roverMoved(rover, "Backward");
  } else if (rover.direction === "W" && rover.y !== 9) {
    rover.y++;
    roverMoved(rover, "Backward");
  } else {
    console.log("Rover can't run outside of the grid!");
  }
}

// === ROVER MOVED ===
function roverMoved(rover, direction) {
  console.log(`Rover moved ${direction}`);
  rover.travelLog.push({ x: rover.x, y: rover.y });
  rover.position = { x: rover.x, y: rover.y };
  gridObstacles.map(obstacle => {
    if (obstacle.x === rover.x && obstacle.y === rover.y) {
      console.log(
        `Rover has found an obstacle at x:${rover.position.x} y:${rover.position.y}.`
      );
      alert(`Rover has found an obstacle, can't cross it.`);
      if (direction === "Forward") {
        moveBackward(rover);
      } else if (direction === "Backward") {
        moveForward(rover);
      }
    }
    if (rover1.x === rover2.x && rover1.y === rover2.y) {
      console.log(
        `Rover has found another rover at x:${rover.position.x} y:${rover.position.y}.`
      );
      alert(`Rover can't across another rover`);
      if (direction === "Forward") {
        moveBackward(rover);
      } else if (direction === "Backward") {
        moveForward(rover);
      }
    }
  });
}

// === COMMANDS ===
function commands(rover, commandsString) {
  for (let i = 0; i < commandsString.length; i++) {
    switch (commandsString[i]) {
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      default:
        console.log(
          `Command: ${commandsString[i]} is not accept. Commands must be: f, b, r, or l.`
        );
    }
  }
}

// === COMMANDS CALL ===
// commands(rover1, "rffrfflfrfflrbrfffrbbrfffrffrfflfrfflrbrfffrbbrfff");
// commands(rover2, "fflrbrfrfrffffrfflfrffrbrfbbrffffrbbrfffrflffrflfr");

console.log(rover1);
console.log(rover2);
console.log(gridObstacles);

// === ROVER POSITION ===
function roverPosition(rover1, rover2) {
  grid.map(column => {
    column.map(item => {
      item.rover1 = false;
      item.rover2 = false;
    });
  });
  grid[rover1.x][rover1.y].rover1 = true;
  grid[rover2.x][rover2.y].rover2 = true;
}
roverPosition(rover1, rover2);

// === SHOW MAP ===
function showMap() {
  const mapDiv = document.querySelector(".mapDiv");
  mapDiv.innerHTML = "";
  grid.forEach(column => {
    column.forEach(item => {
      mapDiv.innerHTML += `<span
          class="grid
          ${item.obstacle ? "obstacle " : ""}
          ${item.rover1 ? "rover1" : ""} ${item.rover2 ? "rover2" : ""}
          ">
          ${item.rover1 ? '<span id="rv1' + rover1.direction + '"></span>' : ""}
          ${item.rover2 ? '<span id="rv2' + rover2.direction + '"></span>' : ""}
          </span>`;
    });
  });
}
showMap();

// === KEYPRESS - COMMAND CALL ===
document.addEventListener("keypress", function(event) {
  let { key } = event;
  let rover;
  let keyError;
  if (key === "w" || key === "s" || key === "a" || key === "d") {
    rover = rover1;
  } else if (key === "i" || key === "k" || key === "j" || key === "l") {
    rover = rover2;
  } else {
    keyError = true;
    alert(
      `Command: ${key} is not accept. Commands for rover1 must be w, s, a or d, and of rover2 i, k, j and l.`
    );
  }
  if (key === "w" || key === "i") {
    key = "f";
  } else if (key === "s" || key === "k") {
    key = "b";
  } else if (key === "a" || key === "j") {
    key = "l";
  } else if (key === "d" || key === "l") {
    key = "r";
  }
  if (!keyError) {
    commands(rover, key);
    roverPosition(rover1, rover2);
    showMap();
  }
});
