// Define the Game class
class Game {
  constructor() {
    this.characters = [skywalker, kenobi, solo, maul];
    this.charCards = ['luke', 'obiwan', 'han', 'darth'];
    this.enemyCards = ['luke2', 'obiwan2', 'han2', 'darth2'];
    this.characterChosen = false;
    this.characterChosenId = '';
    this.enemyChosen = false;
    this.enemyEngaged = false;
  }

  // Hide unselected characters after user selects a character
  hideUnselectedCards(id) {
    for (let i = 0; i < this.charCards.length; i++) {
      if (id !== this.charCards[i]) {
        $(`#${this.charCards[i]}`).css({ display: 'none' });
      }
    }

    // Assign id to this.chosenCharacterId
    this.characterChosenId = id;

    // Also hide the 'Choose a Character' header
    $('#choose-character > h2').text('You chose...');
  };

  // Show the enemies section ( and hide the selected character)
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
}

// Define the Character class
class Character {
  constructor(name, hp, attackPoints, imageHREF) {
    this.name = name;
    this.hp = hp;
    this.attackPoints = attackPoints;
    this.attackPointsRef = attackPoints;
    this.imageHREF = imageHREF;
  }

  attack() {
    this.attackPoints += this.attackPointsRef;
  }
}

// Create all game characters
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

// Create the game object
const game = new Game();

// Main listener function that initiates gameplay after user selects a character
$(function () {
  $('.card-link').click(e => {
    let id = e.delegateTarget.id;

    if (game.characterChosen === false) {
      game.hideUnselectedCards(id);
      game.showEnemies(id);
      game.characterChosen = true;
    } else if (id.search('2') !== -1 && !game.enemyEngaged) { // Checks for the number '2' in the id and if an enemy is engaged
      for (let i = 0; i < game.enemyCards.length; i++) {
        if (id === game.enemyCards[i]) {
          // Grab data from Character class
          let chosenEnemy = game.characters[i];
          let name = chosenEnemy.name;
          let hp = chosenEnemy.hp;
          let imageHREF = chosenEnemy.imageHREF;

          // Hide the enemy card
          $(`#${id}`).css({ display: 'none' });

          // Logic switch
          game.enemyEngaged = true;

          // Render out the arena div and assign values
          $('#arena h3').text(name);
          $('#arena span').text(hp);
          $('#arena img').attr('src', imageHREF);
          $('#arena').css({ display: 'flex' });
        }
      }
    }
  });
});
