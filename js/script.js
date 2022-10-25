$(document).ready(function () {
  let items = "";
  let counter = 0;
  
 
  function puzzleGenerate() {
    if(counter !=0 ) counter=0;
    if(items) items = "";
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

    $(".sort").sortable({
      connectWith: ".game__puzzle-box, .game__place-box",
    });
  }
 puzzleGenerate();
  let min, sec;
  let secId;
  $("#check-result").prop("disabled", true);
  $("#start").on("click", function () {
    $("#start").prop("disabled", true);
    $("#check-result").prop("disabled", false);
    min = "00";
    sec = 60;
    secId = setInterval(() => {
      sec--;
      if (sec == 0) {
        showLoseMessage();
        clearInterval(secId);
      }
      sec < 10
        ? $("#timer").text(`${min}:0${sec}`)
        : $("#timer").text(`${min}:${sec}`);
        sec < 10 ? $(".info").text(`Your still have time? you sure? ${min}:0${sec}`) : $(".info").text(`Your still have time? you sure? ${min}:${sec}`);
    }, 1000);
  });


 
  function stopTimer() {
    $("#timer").text("01:00");
    clearInterval(secId);
  }
  function resertTime() {
    min = "00";
    sec = 60;
  }
  let winArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  let check = true;
  $(".info-lose").fadeOut();
  $("#check-result").on("click", function () {
    $(".modal-window").css("z-index", "3");
    $(".modal__check").fadeIn();
  });
  $("#close").on("click", function () {
    $(".modal__check").fadeOut();
    $(".modal-window").css("z-index", "-1");
  });

  $('.btn-close').on('click', function(){
    if($(this).data('name') == 'lose')  $(".info-lose").fadeOut();
    if($(this).data('name') == 'win') $(".info-win").fadeOut();
    $(".modal-window").css("z-index", "-1");
  })

  $("#check").on("click", function () {
    clearInterval(secId);
    for (let i = 0; i < $(".item").length; i++) {
      if ($(".game__place-box div").eq(i).data("index") != winArray[i]) {
        check = false;
        break;
      }
    }
    $(".modal__check").fadeOut();
    //$(".modal-window").css("z-index", "-1");

    if (check) {
      showWinMessage()
    } else {
      showLoseMessage()
    }
    check = true;
  });

  function showWinMessage(){
    $(".modal-window").css("z-index", "3");
    $(".info-win").fadeIn();
  }
  function showLoseMessage(){
    $(".modal-window").css("z-index", "3");
    $(".info-lose").fadeIn();
    $("#check-result").prop("disabled", true);
  }

  $("#new-game").on("click", function () {
    $(".game__puzzle-box").html("");
    $(".game__place-box").html("");
    puzzleGenerate();
    stopTimer();
    $("#start").prop("disabled", false);
  });

  $(".info-win").fadeOut();
  $(".modal__check").fadeOut();
});
