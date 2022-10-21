$(document).ready(function(){
    let items="";
    let counter=0;
    for(let i=0, y=0; i<4; i++,y-=125){
        counter++
       for(let j=0, x=0; j<4; j++, x-=125){
          items+=`<div style="background-position: ${x}px ${y}px"></div>`
       }
       $('.game__puzzle-box').html(items);
    }
    $( ".sort" ).sortable({
        connectWith: '.game__puzzle-box, .game__place-box'
    })
   /*  $( ".game__puzzle-box div" ).draggable({
        containment: ".game__place-box",
        distance: 10,
    })
    $('.game__puzzle-box div').on('mouseup', function(){
        let postionTop = parseInt($(this).css('top'));
        let postionLeft = parseInt($(this).css('left'));
        if(postionTop != 0 || postionLeft != 0 ) {
            $(this).css('margin', '0px');
        }
        console.log('ddd',postionTop)
        console.log('ddd',postionLeft)
    }) */


})