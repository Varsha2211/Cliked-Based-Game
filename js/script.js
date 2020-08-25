function BoxGame() {
    var score = 0;
    var timeLimit = 60;
    var timerInterval;
    var boxGenerateInterval;
    var scoreArray = ScoreConfig().scoreData;

    $('.play-area').on('click', 'div', function (event) {
        let className = event.target.className;
        let scoreGained = getScoreByClassName(className);
        score += scoreGained;
        $('.score-val').text(score);
    });

    function startGame(boxDisplayTime) {
        $('.score-val').text(score);
        timerInterval = setInterval(function () {
            timeLimit = timeLimit - 1;
            $('.timer').text(timeLimit);
            if (timeLimit === 0) {
                endGame();
            }
        }, boxDisplayTime);

        boxGenerateInterval = setInterval(function () {
            var boxPosition = generateRandomPosition();
            var boxObj = generateRandomBoxes();
            $('.play-area').html(`<div class="${boxObj.className}"></div>`);
            $('.' + boxObj.className).css({
                position: 'absolute',
                left: boxPosition.x + 'px',
                top: boxPosition.y + 'px'
            });
        }, boxDisplayTime);
    }
    
    function endGame() {
        clearInterval(timerInterval);
        clearInterval(boxGenerateInterval);
        $('h1').text('Game over');
    }

    function generateRandomPosition() {
        var y = Math.floor((Math.random() * $('.play-area').height()-5) + 1);
        var x = Math.floor((Math.random() * $('.play-area').width()-5) + 1);
        return {
            x: x,
            y: y
        }
    }

    function generateRandomBoxes() {
        var scoreConfigLen = scoreArray.length;
        var randomIndex = Math.floor((Math.random() * scoreConfigLen) + 0);
        return scoreArray[randomIndex];
    }

    function getScoreByClassName(className) {
        let scoreArr = scoreArray.filter(function (ele) {
            if (ele.className === className) {
                return true;
            }
            return false;
        });

        if (scoreArr.length > 0) {
            return scoreArr[0].score;
        }
        return 0;
    }

    return {
        startGame: startGame
    }
}

// Initialize the Box game
$(document).ready(function () {
    $("#easylevel").on("click", function () {
        $('#start').click(function () {
            var boxGameInstance = BoxGame();
            boxGameInstance.startGame(1200);
            $('.play-area').css('width' ,'600px ' ,'height', '480px');
        });
    });

    $("#mediumlevel").on("click", function () {
        $('#start').click(function () {
            var boxGameInstance = BoxGame();
            boxGameInstance.startGame(1000);
            $('.play-area').css('width' ,'800px ' ,'height', '600px');
        });
    });
    
    $("#hardlevel").on("click", function () {
        $('#start').click(function () {
            var boxGameInstance = BoxGame();
            boxGameInstance.startGame(750);
            $('.play-area').css('width' ,'1024px ' ,'height', '768px');
        });
    });

});