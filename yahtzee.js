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
                this.dice[die] = Math.floor(Math.random() * 6) + 1;
            }
        }

        this.showDice = function() {
            for (var die = 0; die < this.dice.length; die++) {
                var dieDiv = $('#' + die);
                dieDiv.text(this.dice[die]); //temp - change to graphical later
            }

        }
        




    }



    var g = new Game();

    $("#roll").on('click', function() {
        g.roll();
        g.showDice();
    });













})