/*

Define the Game class

*/

class Game {
  constructor() {
    this.characters = [skywalker, kenobi, solo, maul];
    this.charCards = ['luke', 'obiwan', 'han', 'darth'];
    this.enemyCards = ['luke2', 'obiwan2', 'han2', 'darth2'];
    this.characterChosen = false;
    this.characterChosenId = '';
    this.enemyEngaged = false;
    this.gameOver = false;
    this.userAP;
    this.userAPRef;
    this.counterAP;
    this.userHP;
    this.enemyHP;
    this.winCount = 0;
  }

  // METHOD: Render HP values to the cards
  initialRender() {
    for (let i = 0; i < this.characters.length; i++) {
      $(`#${this.charCards[i]} span`).text(this.characters[i].hp);
    }
  }

  // METHOD: Handle logic when user selects an enemy to engage in battle
  engageEnemy(id) {
    for (let i = 0; i < this.enemyCards.length; i++) {
      if (id === this.enemyCards[i]) {
        // Grab data from Character class
        let chosenEnemy = this.characters[i];
        let name = chosenEnemy.name;
        let imageHREF = chosenEnemy.imageHREF;

        // Hide the card
        $(`#${id}`).css({ display: 'none' });

        // Assign appropriate values to game variables
        this.enemyEngaged = true;
        this.counterAP = chosenEnemy.attackPointsRef;
        this.enemyHP = chosenEnemy.hp;

        // Render out the arena div and assign values
        $('#arena h3').text(name);
        $('#arena span').text(this.enemyHP);
        $('#arena img').attr('src', imageHREF);
        $('#arena').css({ display: 'flex' });
      }
    }
  }

  // METHOD: Hide unselected characters after user selects a character
  hideUnselectedCards(id) {
    for (let i = 0; i < this.charCards.length; i++) {
      if (id !== this.charCards[i]) {
        $(`#${this.charCards[i]}`).css({ display: 'none' });
      } else {
        // Assign the game's AP and HP per character choice
        this.userAP = this.characters[i].attackPointsRef;
        this.userHP = this.characters[i].hp;
        this.userAPRef = this.characters[i].attackPointsRef;
      }
    }

    // Assign id to this.chosenCharacterId
    this.characterChosenId = id;

    // Also hide the 'Choose a Character' header
    $('#choose-character > h2').text('You chose...');
  };

  // METHOD: Show the enemies section ( and hide the selected character)
  showEnemies(id) {
    // Hide selected character
    let id2 = id + '2';
    for (let i = 0; i < this.enemyCards.length; i++) {
      if (id2 === this.enemyCards[i]) {
        $(`#${this.enemyCards[i]}`).css({ display: 'none' });
      }
    }

    // Show enemies
    $('#enemies').css({ display: 'block' });
  };

  // METHOD: Attack and Counter-attack logic
  attack() {
    this.enemyHP -= this.userAP;
    this.userHP -= this.counterAP;

    // Increase user attackPoints by initial value
    this.userAP += this.userAPRef;

    // Check if user wins battle
    if (this.enemyHP <= 0) {
      this.enemyEngaged = false;
      this.winCount++;

      // Hide the arena
      $('#arena').css({ display: 'none' });
    }

    // Check if user loses battle
    if (this.userHP <= 0) {
      // Send a message, render out screen back to normal, reset variables
      console.log('Game Over');
      this.gameOver = true;

      // Reveal "reset" button
      $('#game-over span').text("You've lost... GAME OVER.");
      $('#game-over').css({ display: 'block' });


    }

    // Check if user wins game
    if (this.winCount === 3) {
      this.gameOver = true;

      $('#game-over span').text("You've WON! The force is strong with you.");
      $('#game-over').css({ display: 'block' });
    }

    this.updateDOM();
  }

  // METHOD: Update the HP values
  updateDOM() {
    let character = this.characterChosenId;

    // Make DOMs HP value dynamic 
    $(`#${character} span`).text(this.userHP);
    $('#arena span').text(this.enemyHP);
  }

  // Reset the game
  reset() {
    // Reset variables
    this.characterChosen = false;
    this.characterChosenId = '';
    this.enemyEngaged = false;
    this.userAP = undefined;
    this.userAPRef = undefined;
    this.counterAP = undefined;
    this.userHP = undefined;
    this.enemyHP = undefined;
    this.gameOver = false;

    // Reset DOM
    $('#choose-character h2').text('Choose a character:');
    $('#luke').css({ display: 'initial' });
    $('#obiwan').css({ display: 'initial' });
    $('#han').css({ display: 'initial' });
    $('#darth').css({ display: 'initial' });
    $('#luke2').css({ display: 'initial' });
    $('#obiwan2').css({ display: 'initial' });
    $('#han2').css({ display: 'initial' });
    $('#darth2').css({ display: 'initial' });
    $('#enemies').css({ display: 'none' });
    $('#game-over').css({ display: 'none' });
    $('#arena').css({ display: 'none' });

  }
}

/*

Define the Character class

*/

class Character {
  constructor(name, hp, attackPoints, imageHREF) {
    this.name = name;
    this.hp = hp;
    this.attackPoints = attackPoints;
    this.attackPointsRef = attackPoints;
    this.imageHREF = imageHREF;
  }
}

/*

Create the game characters

*/

const skywalker = new Character(
  'Luke Skywalker',
  100,
  14,
  'assets/images/luke.jpeg'
);
const kenobi = new Character(
  'Obi-Wan Kenobi',
  150,
  8,
  'assets/images/obi-wan.jpg'
);
const solo = new Character(
  'Han Solo',
  120,
  6,
  'assets/images/han-solo.jpg'
);
const maul = new Character(
  'Darth Maul',
  180,
  20,
  'assets/images/darth-maul.png'
);

/*

Instantiate the game object

*/

const game = new Game();

/*

Main listener function

*/

$(function () {
  // Listen for click on cards to control rendering logic
  $('.card-link').click(e => {
    let id = e.delegateTarget.id;

    // Choose a character
    if (game.characterChosen === false) {
      game.hideUnselectedCards(id);
      game.showEnemies(id);
      game.characterChosen = true;
    }

    // Engage an enemy
    if (id.search('2') !== -1 && !game.enemyEngaged && !game.gameOver) {
      game.engageEnemy(id);
    }
  });

  // Listen for click on attack button
  $('#attack').click(e => {
    if (!game.gameOver) {
      game.attack();
    }
  });

  // Listen for click on reset button
  $('#reset').click(e => {
    game.reset();
    game.initialRender();
  });
});
