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
            var ones = this.dice.filter(function(die) { return die === 1; }).length;
            this.diceScore.ones = ones;

            var twos = this.dice.filter(function(die) { return die === 2; }).length;
            this.diceScore.twos = twos * 2;

            var threes = this.dice.filter(function(die) { return die === 3; }).length;
            this.diceScore.threes = threes * 3;

            var fours = this.dice.filter(function(die) { return die === 4; }).length;
            this.diceScore.fours = fours * 4;

            var fives = this.dice.filter(function(die) { return die === 5; }).length;
            this.diceScore.fives = fives * 5;

            var sixes = this.dice.filter(function(die) { return die === 6; }).length;
            this.diceScore.sixes = sixes * 6;

            //three of a kind
            if (ones >= 3 || twos >= 3 || threes >= 3 || fours >= 3 || fives >= 3 || sixes >= 3) {
                this.diceScore.threekind = this.dice.reduce(function(a, b) { return a + b; });
            } else {
                this.diceScore.threekind = 0;
            }

            //four of a kind
            if (ones >= 4 || twos >= 4 || threes >= 4 || fours >= 4 || fives >= 4 || sixes >= 4) {
                this.diceScore.fourkind = this.dice.reduce(function(a, b) { return a + b; });
            } else {
                this.diceScore.fourkind = 0;
            }

            //full house
            var totals = [ones, twos, threes, fours, fives, sixes];
            if (totals.indexOf(3) > -1 && totals.indexOf(2) > -1) {
                this.diceScore.fullhouse = 25;
            } else {
                this.diceScore.fullhouse = 0;
            }

            //small straight 
            var sortedDice = this.dice.concat().sort().toString();
            if (sortedDice.indexOf('1,2,3,4') > -1 || sortedDice.indexOf('2,3,4,5') > -1 || sortedDice.indexOf('3,4,5,6') > -1) {
                this.diceScore.smstraight = 30;
            } else {
                this.diceScore.smstraight = 0;
            }

            //large straight
            if (sortedDice === '1,2,3,4,5' || sortedDice === '2,3,4,5,6') {
                this.diceScore.lgstraight = 40;
            } else {
                this.diceScore.lgstraight = 0;
            }

            //yahtzee
            if (totals.indexOf(5) > -1) {
                this.diceScore.yahtzee = 50;
            } else {
                this.diceScore.yahtzee = 0;
            }

            //chance
            this.diceScore.chance = this.dice.reduce(function(a, b) { return a + b; });

        }
        
        //...and put the numbers in
        this.showCalc = function() {
            $('#dice-ones').text(this.diceScore.ones);
            $('#dice-twos').text(this.diceScore.twos);
            $('#dice-threes').text(this.diceScore.threes);
            $('#dice-fours').text(this.diceScore.fours);
            $('#dice-fives').text(this.diceScore.fives);
            $('#dice-sixes').text(this.diceScore.sixes);
            $('#dice-threekind').text(this.diceScore.threekind);
            $('#dice-fourkind').text(this.diceScore.fourkind);
            $('#dice-fullhouse').text(this.diceScore.fullhouse);
            $('#dice-smstraight').text(this.diceScore.smstraight);
            $('#dice-lgstraight').text(this.diceScore.lgstraight);
            $('#dice-yahtzee').text(this.diceScore.yahtzee);
            $('#dice-chance').text(this.diceScore.chance);

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