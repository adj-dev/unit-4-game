// class Skywalker {
//   constructor() {
//     this.name = 'Luke Skywalker';
//     this.hp = 100;
//     this.attackPoints = 14;
//   }
// }

// class Kenobi {
//   constructor() {
//     this.name = 'Obi-Wan Kenobi';
//     this.hp = 150;
//     this.attackPoints = 8;
//   }
// }

// class Solo {
//   constructor() {
//     this.name = 'Han Solo';
//     this.hp = 120;
//     this.attackPoints = 6;
//   }
// }

// class Maul {
//   constructor() {
//     this.name = 'Darth Maul';
//     this.hp = 180;
//     this.attackPoints = 20;
//   }
// }

// Define the Character class

class Character {
  constructor(name, hp, attackPoints) {
    this.name = name;
    this.hp = hp;
    this.attackPoints = attackPoints;
    this.attackPointsRef = attackPoints;
  }

  attack() {
    this.attackPoints += this.attackPointsRef;
  }
}

// Create all game characters

const skywalker = new Character('Luke Skywalker', 100, 14);
const kenobi = new Character('Obi-Wan Kenobi', 150, 8);
const solo = new Character('Han Solo', 120, 6);
const maul = new Character('Darth Maul', 180, 20);

// Define the Game class

class Game {
  characters;
  charCards;

  constructor() {
    this.characters = [skywalker, kenobi, solo, maul];
    this.charCards = ['luke', 'obiwan', 'han', 'darth'];
  }
}

const game = new Game();

// Main listener function that initiates gameplay after user selects a character
$(function() {
  $('.card-link').click(e => {
    let id = e.delegateTarget.id;

    hideUnselectedCards(id);
  });
});

// Hide unselected characters after user selects a character
const hideUnselectedCards = id => {
  for (let i = 0; i < game.charCards.length; i++) {
    if (id !== game.charCards[i]) {
      $(`#${game.charCards[i]}`).css({ display: 'none' });
    }
  }

  // Also hide the 'Choose a Character' header
};
