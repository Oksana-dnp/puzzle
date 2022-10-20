$(document).ready(function(){
    let items="";
    let counter=0;
    for(let i=0, y=0; i<4; i++,y-=84){
        counter++
       for(let j=0, x=0; j<4; j++, x-=110){
        console.log(`${counter}`, `<div style="background-position: ${x}px ${y}px"></div>`)

        items+=`<div style="background-position: ${x}px ${y}px"></div>`
       }
       $('.puzzle').html(items);
    }
    

})