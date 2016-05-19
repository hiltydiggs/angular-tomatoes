/***************************
  PRE-PLAN SKETCH
  ---------------
  
  ON PAGE LOAD -
    ^REQUEST JSON AND SAVE TO VARIABLE
    CREATE LIST OF GAMES FOR DROPDOWN MENU
    INIT NEW GAME FROM NEWEST DATE
    
  INIT NEW GAME -
    RESET ANY NECESSARY DATA (SCOREBOARD,)
    FILL IN MOVIE CARDS
    
  SUBMIT EACH GUESS -
    HIDE SLIDER AND BUTTON
  ++IT MIGHT BE EASIER AND MORE ATTRACTIVE TO USE A HEIGHT ADJUSTMENT FOR A COLLAPSING EFFECT
  ++NOPE. NG-HIDE ANIMATION
    SHOW OTHER PLAYER GUESSES
    SHOW TOMATO SCORE
   ?SHOW VARIANCE IN SCORE
    UPDATE SCOREBOARD
    
    
  JSON MODEL
  ----------
DATA.
  {DATABASE:
    {
      CATEGORY:
      DATE:
      MOVIES: [
        {
          TITLE:
          URL:
          SCORE:
          GUESSES: [
            ACE:
            BRYAN:
            GINA:
          ]
        }
      ]
    }
  }
***************************/

var app = angular.module('gameApp', []);

app.controller('gameCtrl', function($http) {
  var gameScope = this;
  console.log(gameScope);

  $http.get('https://angular-tomatoes.azurewebsites.net/json/strung.json')
  .then(function(response) {
    gameScope.movie = response.data;
  });

});
