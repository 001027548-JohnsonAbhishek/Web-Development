var playing=false;
var score;
var trialsLeft;
var step;
var action;//used for setInterval
var fruits=['apple','grape','mango','orange','peach','pear','watermelon','pineapple'];
 $(function(){//click on start reset button
    $("#startreset").click(function(){//we are playing 
        if(playing==true){//reload page
            location.reload();
        }else{//we are not playing
        playing=true;
        score=0;
        $("#scorevalue").html(score);
//show trials left
        $("#trialsLeft").show();
        trialsLeft=3;
        addHearts();
 //hide game over box
        $("#gameOver").hide();
 //change button text to reset game
        $("#startreset").html("Reset Game");//start sending fruits
         startAction();
    }
 });
 //slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    $("#slicesound")[0].play();//play sound//stop fruit
    clearInterval(action);//hide fruit
    $("#fruit1").hide("explode",500);//slice fruit//send new fruit
    setTimeout(startAction,500);
});

function addHearts(){
    $("#trialsLeft").empty();
    for(i=0;i<trialsLeft;i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){

    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left': Math.round(550*Math.random()),'top':-50});
    step=1+Math.round(5*Math.random());

    action = setInterval(function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);
        if($("#fruit1").position().top>$("#fruitsContainer").height()){//check if we have trials left
        if(trialsLeft>1){//generate a fruit
        $("#fruit1").show();
        chooseFruit();//choose a random fruit
        $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});//random position//generate a random step
        step=1+Math.round(5*Math.random());
        trialsLeft--;
        addHearts();
    }else{
        playing=false;
        $("#startreset").html("Start Game");
        $("#gameOver").show();
        $("#gameOver").show();
        $("#gameOver").html('<p>Game Over!</p><p>Your score is '+score+'</p>');
        $("#trialsLeft").hide();
        stopAction();
    }
}
},10);
}
    function chooseFruit(){
        $("#fruit1").attr('src','images/'+fruits[Math.round(8*Math.random())]+'.png');
    }

    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});


