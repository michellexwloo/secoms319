
function goToRandom(){
    let rng = Math.floor(Math.random() *4);

    console.log(rng);
    if(rng ===1 ){
        window.location.href="./length.html";
    } 
    else if (rng ===2){
        window.location.href="./weight.html";    
    }
    else if (rng ===3){
        window.location.href="./temperature.html";    
    }
    else{
        window.location.href="./time.html";    
    }
}




