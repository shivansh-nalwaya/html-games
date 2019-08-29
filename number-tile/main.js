let assignedBoxes = {},
  swaps = 0;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function insertValues(array, num) {
  const random = Math.floor(Math.random() * array.length);
  let i = 0,
    flag = 0;
  while (i <= array.length) {
    const row = parseInt(i / num);
    const column = i % num;
    if (i != random) {
      $(`#c${row}${column}`).text(array[i - flag]);
      assignedBoxes[`#c${row}${column}`] = array[i - flag];
    } else {
      flag = 1;
      assignedBoxes[`#c${row}${column}`] = "";
    }
    i++;
  }
}

function startGame() {
  const num = $("#number").val();
  swaps = 0;
  let toInsert = "";
  let array = [...Array(num * num - 1).keys()].map(x => x + 1);

  for (let i = 0; i < num; i++) {
    let row = `<tr class="row" id=r${i}>`;
    for (let j = 0; j < num; j++) {
      row += `<td id="c${i}${j}" class="column" draggable="true" ondragend="moveBox(event)" />`;
    }
    row += `</tr>`;
    toInsert += row;
  }
  $("#board").html(toInsert);
  $("#swaps").html(`Total swaps - ${swaps}`);

  insertValues(shuffle(array), num);
}

function moveBox(event) {
  const { offsetX, offsetY, target } = event;
  const sourceId = "#" + target.id;
  let targetId = "";

  const x = offsetX < 0 ? parseInt(sourceId[3]) - 1 : parseInt(sourceId[3]) + 1;
  const xId = `#c${sourceId[2]}${x}`;
  const y = offsetY < 0 ? parseInt(sourceId[2]) - 1 : parseInt(sourceId[2]) + 1;
  const yId = `#c${y}${sourceId[3]}`;

  if ($(xId).length === 1 && $(xId).text() === "") targetId = xId;
  else if ($(yId).length === 1 && $(yId).text() === "") targetId = yId;

  if ($(targetId).length === 1 && $(sourceId).length === 1) {
    let s = $(sourceId).text();
    let t = $(targetId).text();
    $(sourceId).text(t);
    $(targetId).text(s);
    assignedBoxes[sourceId] = t;
    assignedBoxes[targetId] = parseInt(s);
    swaps += 1;
    if (gameComplete()) $("#swaps").html(`Game completed in ${swaps} swaps`);
    else $("#swaps").html(`Total swaps - ${swaps}`);
  }
}

function gameComplete() {
  const num = $("#number").val();
  let prev = -1;
  for (let i = 0; i < num * num; i++) {
    const row = parseInt(i / num);
    const column = i % num;
    const current = assignedBoxes[`#c${row}${column}`];
    if (current === "") continue;
    if (current < prev) return false;
    prev = current;
  }
  return true;
}
