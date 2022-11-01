
$(document).ready(function () {
  let items = "";
  let counter = 0;
  $(".info-win").fadeOut();
  $(".modal__check").fadeOut();
  $(".info-lose").fadeOut();
  function puzzleGenerate() {
    $(".game__puzzle-box").html("");
    $(".game__place-box").html("");
    if (counter != 0) counter = 0;
    if (items) items = "";
    for (let i = 0, y = 0; i < 4; i++, y -= 125) {
      for (let j = 0, x = 0; j < 4; j++, x -= 125) {
        counter++;
        items += `<div class="item" style="background-position: ${x}px ${y}px" data-index= "${counter}"></div>`;
      }
      $(".game__puzzle-box").html(items);
      var parent = $(".game__puzzle-box");
      var divs = parent.children();
      while (divs.length) {
        parent.append(
          divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
        );
      }
    }
    $(".item").draggable({
      containment: ".game__place",
      grid: [125, 125],
    });
  }

  let array = [];

  puzzleGenerate();
  let min, sec;
  let secId;

  let timerStart = false;
  $("#check-result").prop("disabled", true);
  $("#start").on("click", startTimer);

  $("#game__place").droppable({
    accept: ".item",
    drop: function (event, ui) {
      let item = {};
      item.top = ui.offset.top;
      item.left = ui.offset.left;
      item.index = ui.draggable.data("index");
      $(".item").on("dragend", function () {
        console.log('item-->', item);
        console.log('top', ui.offset.top);
        console.log('left', ui.offset.left);
        item.top = ui.offset.top;
        item.left = ui.offset.left;
        console.log(item)
        console.log(array)
      });
      let check = true;
      if (array.length > 0) {
        for (let elem of array) {
console.log('check--<', check)
          if (elem.index == item.index) {
            elem.top = item.top;
            elem.left = item.left;
            check = false;
            if (check == false) console.log(array);
          }
          if(elem.top == item.top && elem.left == item.left){
            console.log('index',elem.index);
            console.log('item', item.left)

          }
        }
      }
      if (check) array.push(item);
      console.log('timerstart', timerStart)
      if (timerStart === false && $("#start").prop("disabled", false)) {
        timerStart = true;
        startTimer();
      }
    },
  });

  //timer functions
  function startTimer() {
    timerStart = true;
    $("#start").prop("disabled", true);
    $("#check-result").prop("disabled", false);
    min = "00";
    sec = 60;
    secId = setInterval(() => {
      sec--;
      if (sec === 0) {
        console.log("sec", sec);
        timerStart = false;
        clearInterval(secId);
        showLoseMessage();
      }
      sec < 10
        ? $("#timer").text(`${min}:0${sec}`)
        : $("#timer").text(`${min}:${sec}`);
      sec < 10
        ? $(".info").text(`Your still have time? you sure? ${min}:0${sec}`)
        : $(".info").text(`Your still have time? you sure? ${min}:${sec}`);
    }, 1000);
  }
  function stopTimer() {
    $("#timer").text("01:00");
    clearInterval(secId);
  }
  function resertTime() {
    timerStart = false;
    min = "00";
    sec = 60;
  }
  let winArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let check = true;
  $("#check-result").on("click", function () {
    $(".modal-window").css("z-index", "3");
    $(".modal__check").fadeIn();
  });
  $("#close").on("click", function () {
    $(".modal-window").css("z-index", "-1");
    $(".modal__check").fadeOut();
  });

  $(".btn-close").on("click", function () {
    if ($(this).data("name") == "lose") $(".info-lose").fadeOut();
    if ($(this).data("name") == "win") $(".info-win").fadeOut();
    $(".modal-window").css("z-index", "-1");
  });

  $("#check").on("click", function () {
    clearInterval(secId);
    $("#check-result").prop("disabled", true);
    timerStart = false;
    array.sort((a, b) => {
      if (a.top === b.top) {
        return parseInt(a.left) - parseInt(b.left);
      }
      return parseInt(a.top) - parseInt(b.top);
    });
    console.log('array', array);
    checkArray = array.map((key) => key.index);
    $(".modal__check").fadeOut();
    for (let i = 0; i < array.length; i++) {
      if (checkArray[i] != winArray[i]) {
        check = false;
        break;
      }
    }
    if (check) {
      showWinMessage();
    } else {
      showLoseMessage();
    }
    check = true;
  });

  function showWinMessage() {
    $(".modal-window").css("z-index", "3");
    $(".info-win").fadeIn("slow");
  }
  function showLoseMessage() {
    $(".modal-window").css("z-index", "3");
    $(".info-lose").fadeIn("slow");
  }

  $("#new-game").on("click", function () {
    puzzleGenerate();
    stopTimer();
    $("#start").prop("disabled", false);
  });
});
