$(document).ready(function(){
    let items="";
    let counter=0;
    for(let i=0, y=0; i<4; i++,y-=125){
       for(let j=0, x=0; j<4; j++, x-=125){
        counter++;
          items+=`<div class="item" style="background-position: ${x}px ${y}px" data-index= "${counter}"></div>`
       }
       $('.game__puzzle-box').html(items);
       var parent = $(".game__puzzle-box");
       var divs = parent.children();
       while (divs.length) {
           parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
       }
    }
    $( ".sort" ).sortable({
        connectWith: '.game__puzzle-box, .game__place-box'
    })
  
    $('#start').on('click', function(){
        $('#start').prop('disabled', true)
        let min = '00';
        let sec= 60;
        let secId = setInterval(()=>{
            sec--;
            if(sec==0) clearInterval(secId);
            sec > 10 ?  $('#timer').text(`${min}:${sec}`) :  $('#timer').text(`${min}:0${sec}`)
        },1000)
    })
   let winArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
   let check = true;
   $('#check-result').on('click', function(){
    $('.modal-window').css('z-index', '3')
    $('.modal__check').fadeIn();

    for(let i =0; i < $('.item').length; i++){
       if($('.game__place-box div').eq(i).data('index')!= winArray[i]){
        console.log($('.game__place-box div').eq(i).data('index'));
        console.log('winArray[i]',winArray[i])
        check = false;
        break
       }
    }
/*     if(check) alert("You're win")
    else alert("you're lose") */
    check= true;
   })
   $('#new-game').on('click', function(){
    var parent = $(".game__puzzle-box");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
   })
   $('.info').text(`Your still have time? you sure? ${$('#timer').text()}`);
   $('.modal__check').fadeOut()
})