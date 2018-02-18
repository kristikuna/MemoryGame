$(function () {
    //                                                   VARIABLES
    //  DOM
    var $startButton = $('.startButton');
    var $playerInfo = $('.playerInfo');
    var $grid = $('content');
    var $resetButton = $('.reset');
    var $cardsFront = $('.front');
    var $cardsBack = $('.back');
    var $winForm = $('.winForm');
    var $loseForm = $('.loseForm');
    var $attempts = $('.attempts');
    var $cell = $('.cell');
    var $cell1 = $('.cell1');
    var $cell2 = $('.cell2');
    var $cell3 = $('.cell3');
    var $cell4 = $('.cell4');
    var $cell5 = $('.cell5');
    var $cell6 = $('.cell6');
    var $cell7 = $('.cell7');
    var $cell8 = $('.cell8');
    var $cell9 = $('.cell9');
    var $cell10 = $('.cell10');
    var $cell11 = $('.cell11');
    var $cell12 = $('.cell12');
    var $cell13 = $('.cell13');
    var $cell14 = $('.cell14');
    var $cell15 = $('.cell15');
    var $cell16 = $('.cell16');
    //  deck of cards
    var cellArray = [$cell1, $cell2, $cell3, $cell4, $cell5, $cell6, $cell7, $cell8,
        $cell9, $cell10, $cell11, $cell12, $cell13, $cell14, $cell15, $cell16
    ]
    var cardColors = ['maroon', 'maroon', 'navy', 'navy', 'chocolate', 'chocolate', 'forestgreen', 'forestgreen',
        'gold', 'gold', 'lightcoral', 'lightcoral', 'darkmagenta', 'darkmagenta', 'slategray', 'slategray'
    ]
    //  global variables
    var cardsFlipped = 0;
    var colorArray = [];
    var cardArray = [];
    var tryCounter = 0;
    var winCounter = 0;
    var thisCard;
    //                                                   PROGRAM START
    $grid.hide();
    $playerInfo.hide();
    $cardsBack.hide();
    $winForm.hide();
    $loseForm.hide();
    //                                                   FUNCTIONS
    //  shuffle the color array
    function shuffle(array) {
        var counter = array.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;

            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    //  assign each card a class from the color array
    function setColors(colors, array) {
        for (var i = 0; i < array.length; i++) {
            array[i].children('.back').attr('class', 'back')
            array[i].children('.back').addClass(colors[i]).attr('data-color', colors[i]);
        }
    }
    //                                                   EVENT FUNCTIONS
    //  start button to begin the game
    $startButton.click(function () {
    //  manipulate DOM
        $playerInfo.slideDown(200);
        $grid.slideDown(200);
        $startButton.hide();
    //  populate board
        shuffle(cardColors);
        setColors(cardColors, cellArray);
    //  shows the grid and player info form
    })

    //  runs on play again also
    $resetButton.click(function () {
    //  manipulate DOM
        $grid.hide();
        $playerInfo.hide();
        $winForm.hide();
        $loseForm.hide();
        $cardsFront.show();
        $cardsBack.hide();
        $startButton.slideDown(800);
    //  reset counters
        winCounter = 0;
        tryCounter = 0;
        $attempts.text('0/10');
    })


    $cardsFront.click(function () {
        thisCard = $(this);
    //  flips card to back
        thisCard.hide();
    //  shows sibling div (with color class)
        thisCard.siblings('.back').show();
    //  store info to feed into cardChecker()
        cardsFlipped++;
        colorArray.push(thisCard.siblings('.back').attr('data-color'));
        cardArray.push(thisCard);
        cardChecker();
    //  see if you won or lost
        winChecker();
    //  update try count on page
        updateAttempts();
    })
    //  checks if the two cards have a match
    function cardChecker() {
    //  triggers every time 2 cards are flipped
        if (cardsFlipped === 2) {
    //  store arrays into individual variables
            var color1 = colorArray[0];
            var color2 = colorArray[1];
            var card1 = cardArray[0];
            var card2 = cardArray[1];
            if (color1 !== color2) {
    // if no match, hide cells
                setTimeout(function () {
                    card1.slideDown(1500);
                    card2.slideDown(1500);
                    $('.' + color1).slideUp(1500);
                    $('.' + color2).slideUp(1500);
                }, 500);
                tryCounter++;
            } else if (color1 === color2) {
    //  if match, only hide back, wins++
                setTimeout(function () {
                        $('.' + color1).slideUp(1500);
                    },
                    500);
                winCounter++;
            }
        //reset cardchecker
            cardsFlipped = 0;
            cardArray = [];
            colorArray = [];
        }
    }
    function winChecker() {
    //  if 8 matches, show win form and reset counters
        if (winCounter === 8) {
            $playerInfo.hide();
            $grid.hide();
            $winForm.show();
            winCounter = 0;
            tryCounter = 0;
            console.log("you won!");
        }
    //  if 10 tries, show lose form and reset counters
        if (tryCounter === 10) {
            $playerInfo.hide();
            $grid.hide();
            $loseForm.show();
            winCounter = 0;
            tryCounter = 0;
            console.log("you lose!");
        }
    }
    //  turns the attempt number into string to show on screen
    function updateAttempts() {
        tryCounter.toString;
        $attempts.text(tryCounter + '/10');
    }
});
