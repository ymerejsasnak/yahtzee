$(function(){
    "use strict";

    function Game() {
        this.dice = [null, null, null, null, null];
        this.roll = 0;
        this.held = [false, false, false, false, false];

        this.diceScore = {ones: null,
                          twos: null,
                          threes: null,
                          fours: null,
                          fives: null,
                          sixes: null,
                          threekind: null,
                          fourkind: null,
                          fullhouse: null,
                          smstraight: null,
                          lgstraight: null,
                          yahtzee: null,
                          chance: null}
        this.playerScore = {ones: null,
                          twos: null,
                          threes: null,
                          fours: null,
                          fives: null,
                          sixes: null,
                          threekind: null,
                          fourkind: null,
                          fullhouse: null,
                          smstraight: null,
                          lgstraight: null,
                          yahtzee: null,
                          chance: null}

        this.roll = function() {
            for (var die = 0; die < this.dice.length; die++) {
                if (!this.held[die]) {
                    this.dice[die] = Math.floor(Math.random() * 6) + 1;
                }
            }
        }

        this.showDice = function() {
            for (var die = 0; die < this.dice.length; die++) {
                var dieDiv = $('#' + die);
                dieDiv.text(this.dice[die]); //temp - change to graphical later
            }
        }


         //figure out how current dice would score in each category...
        this.calculate = function() {
            var ones = this.dice.filter(function(die) { return die === 1; });
            this.diceScore.ones = ones.length;

            var twos = this.dice.filter(function(die) { return die === 2; });
            this.diceScore.twos = twos.length * 2;

            var threes = this.dice.filter(function(die) { return die === 3; });
            this.diceScore.threes = threes.length * 3;

            var fours = this.dice.filter(function(die) { return die === 4; });
            this.diceScore.fours = fours.length * 4;

            var fives = this.dice.filter(function(die) { return die === 5; });
            this.diceScore.fives = fives.length * 5;

            var sixes = this.dice.filter(function(die) { return die === 6; });
            this.diceScore.sixes = sixes.length * 6;

        }
        
        //...and put the numbers in
        this.showCalc = function() {
            $('#dice-ones').text(this.diceScore.ones);
            $('#dice-twos').text(this.diceScore.twos);
            $('#dice-threes').text(this.diceScore.threes);
            $('#dice-fours').text(this.diceScore.fours);
            $('#dice-fives').text(this.diceScore.fives);
            $('#dice-sixes').text(this.diceScore.sixes);

        }
        




    }



    var g = new Game();

    $("#roll").on('click', function() {
        g.roll();
        g.showDice();
        g.calculate();
        g.showCalc();
    });

    //hold listener (NEED TO DISABLE UNTIL FIRST ROLL...?)
    $(".die").on('click', function() {
        var selected = $(this);
        var which = selected.attr('id');
        g.held[which] = !g.held[which];
        selected.toggleClass('held');
    })













})