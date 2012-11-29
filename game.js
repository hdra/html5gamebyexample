$(document).ready(function(){
    var KEY = {
        UP: 38,
        DOWN: 40,
        W: 87,
        S: 83
    }

    var pingpong = {
        scoreA: 0,
        scoreB: 0
    };
    pingpong.pressedKeys = [];
    pingpong.ball = {
        speed: 5,
        x : 150,
        y : 100,
        directionX : 1,
        directionY : 1
    }

    pingpong.timer = setInterval(gameloop, 30);

    $(document).keydown(function(e){
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e){
        pingpong.pressedKeys[e.which] = false;
    });

    function gameloop(){
        moveBall();
        movePaddles();
    }

    function moveBall(){
        var playGroundHeight = parseInt($("#playground").height());
        var playGroundWidth = parseInt($("#playground").width());
        var ball = pingpong.ball;

        // check bottom edge
        if (ball.y + ball.speed * ball.directionY > playGroundHeight){
            ball.directionY = -1;
        }
        // check top edge
        if (ball.y + ball.speed * ball.directionY < 0){
            ball.directionY = 1;
        }
        // check right edge
        if( ball.x + ball.speed * ball.directionX > playGroundWidth){
            // playerB lost
            // reset the ball
            pingpong.scoreA++;
            $("#scoreA").html(pingpong.scoreA);
            ball.x = 250;
            ball.y = 100;
            $("#ball").css({
                "top": ball.x,
                "left": ball.y
            });
            ball.directionX = -1;
        }
        // check left edge
        // check right edge
        if( ball.x + ball.speed * ball.directionX < 0){
            // playerA lost
            // reset the ball
            pingpong.scoreB++;
            $("#scoreB").html(pingpong.scoreB);
            ball.x = 250;
            ball.y = 100;
            $("#ball").css({
                "top":ball.x,
                "left":ball.y
            });
            ball.directionX = 1;
        }

        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        //check for left paddle
        var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
        var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
        var paddleAYTop = parseInt($("#paddleA").css("top"));

        if(ball.x + ball.speed*ball.directionX < paddleAX){
            if(ball.y+ball.speed*ball.directionY <= paddleAYBottom &&
                ball.y + ball.speed*ball.directionY >= paddleAYTop){
                ball.directionX = 1;
            }
        }

        //check for right paddle
        var paddleBX = parseInt($("#paddleB").css("left"))+parseInt($("#paddleB").css("width"));
        var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
        var paddleBYTop = parseInt($("#paddleB").css("top"));

        if(ball.x + ball.speed*ball.directionX >= paddleBX){
            if(ball.y+ball.speed*ball.directionY <= paddleBYBottom &&
                ball.y + ball.speed*ball.directionY >= paddleBYTop){
                ball.directionX = -1;
            }
        }

        // move the ball
        $("#ball").css({
            "left" : ball.x,
            "top": ball.y
        });
    }

    function movePaddles(){
        if(pingpong.pressedKeys[KEY.UP]){
            var top = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top",top-5);
        }

        if(pingpong.pressedKeys[KEY.DOWN]){
            var top = parseInt($("#paddleB").css("top"));
            $("#paddleB").css("top",top+5);
        }

        if(pingpong.pressedKeys[KEY.W]){
            var top = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top",top-5);
        }

        if(pingpong.pressedKeys[KEY.S]){
            var top = parseInt($("#paddleA").css("top"));
            $("#paddleA").css("top",top+5);
        }
    }

});