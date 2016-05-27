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

angular.module('gameApp', [])
  .controller('DatabaseController', ['$scope', 'databaseFactory', 'scoreService', DatabaseController])
  .controller('SubmitController', ['$scope', 'scoreService', SubmitController])
  .controller('ScoreController', ['$scope', 'scoreService', ScoreController])
  .service('scoreService', [scoreService])
  .factory('databaseFactory', ['$http', databaseFactory]);

function DatabaseController($scope, databaseFactory, scoreService) {
  databaseFactory.getDatabase()
    .then(function(response) {
      var scorePath = response.data.database[0].movies[0].scores;
      $scope.movie = response.data;
      angular.forEach(scorePath, function(value, key){
        scoreService.addNames(key);
      });
    });
}

function SubmitController($scope, scoreService) {
  $scope.userGuess = 50;
  $scope.isSubmitted = false;
  $scope.submit = function () {
    scoreService.addScore('You', $scope.userGuess, $scope.movie.tomatoScore);
    angular.forEach($scope.movie.scores, function(value, key){
      scoreService.addScore(key, value, $scope.movie.tomatoScore);
    });
    console.log(scoreService.returnNames());
    $scope.isSubmitted = true;
  }
}

function ScoreController($scope, scoreService) {
  $scope.scoreboard = scoreService.returnNames();
}

function scoreService() {
  var scores = {'You': 0};

  return {
    addNames: function(name) {
      scores[name] = 0;
    },
    returnNames: function() {
      return scores;
    },
    addScore: function(player, guess, actual) {
      if (parseInt(guess) === parseInt(actual)) {
        scores[player] -= 5;
      } else {
        scores[player] += Math.abs(guess - actual);
      }
    }
  }
}

function databaseFactory($http) {
  return {
    getDatabase: function() {
      return $http.get('https://angular-tomatoes.azurewebsites.net/json/movie-database.json');
    }
  }
}
