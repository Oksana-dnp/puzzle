$(document).ready(function(){
    let items="";
    let counter=0;


     for (let i = 0, y = 0; i < 4; i++, y -= 125) {
      console.log(i);
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
    $(".sort").sortable({
      connectWith: ".game__puzzle-box, .game__place-box",
    });

}
generatePuzzle()

  let min, sec;
  let secId;
  $('#check-result').prop('disabled', true);
    $('#start').on('click', function(){
        $('#start').prop('disabled', true);
        $('#check-result').prop('disabled', false);
        min = '00';
        sec= 60;
            secId = setInterval(()=>{
            sec--;
            if(sec==0) clearInterval(secId);
            sec > 10 ?  $('#timer').text(`${min}:${sec}`) :  $('#timer').text(`${min}:0${sec}`);
            $('.info').text(`Your still have time? you sure? ${min}:${sec}`);
        },1000)
    })

    function stopTimer(){
        $('#timer').text('01:00');
        clearInterval(secId);
    }
    function resertTime(){
        min = '00';
        sec= 60;
    }
   let winArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
   let check = true;
   $('.info-lose').fadeOut();
   $('#check-result').on('click', function(){
    $('.modal-window').css('z-index', '3')
    $('.modal__check').fadeIn();
   })
   $('#close').on('click', function(){
        $('.modal__check').fadeOut();     
        $('.modal-window').css('z-index', '-1')
   })
   $('.info-lose_btn').on('click', function(){
    $('.info-lose').fadeOut();     
    $('.modal-window').css('z-index', '-1');
})
   $('#check').on('click', function(){
    clearInterval(secId);
    for(let i =0; i < $('.item').length; i++){
        if($('.game__place-box div').eq(i).data('index')!= winArray[i]){
         check = false;
         break
        }
     }
     $('.modal__check').fadeOut();
     $('.modal-window').css('z-index', '-1')

     if(check) {
        $('.modal-window').css('z-index', '3');
        $('.info-win').fadeIn();   
     }
     else {
        $('.modal-window').css('z-index', '3');
        $('.info-lose').fadeIn();
        $('#check-result').prop('disabled', true)
     }
     check= true;
   })
  
   $('#new-game').on('click', function(){
   // $('.game__puzzle-box').html('');
   // $('.game__place-box').html('');
    //generatePuzzle(); 
    var parent = $(".game__puzzle-box");
    var divs = parent.children();
    stopTimer();
    $('.btns__item').each(function(){
       $('.btns__item').prop('disabled', false) 
    });
   while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
   })

   $('.info-win').fadeOut();
   $('.modal__check').fadeOut();
})