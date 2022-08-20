'use strict';

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
let roll;
let displayedScore = 0;

function randomDice() {
  return Math.random() * (6 - 1) + 1;
}

function switchPlayers() {
  displayedScore = 0;
  displayingScore();
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
}

function displayingScore() {
  if (player0.classList.contains('player--active')) {
    current0.textContent = `${displayedScore}`;
  } else {
    current1.textContent = `${displayedScore}`;
  }
}

function addCurrent(num) {
  if (num === 1) {
    switchPlayers();
  } else {
    displayedScore += num;
  }
  displayingScore();
}

function openOrClose() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

document.addEventListener('keydown', function (e) {
  let keyCode = e.keyCode;
  if (keyCode === 27) openOrClose();
});

overlay.addEventListener('click', openOrClose);

closeModal.addEventListener('click', openOrClose);

function winning() {
  openOrClose();
  if (Number(score0.textContent) >= 100) {
    document.querySelector('.message').textContent = `Player 1 wins`;
  } else {
    document.querySelector('.message').textContent = `Player 2 wins`;
  }
}

function reseting() {
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
}

btnRoll.addEventListener('click', function () {
  roll = Math.round(randomDice());
  for (let i = 1; i <= 6; i++) {
    if (roll === i) {
      dice.src = `dice-${i}.png`;
    }
  }
  addCurrent(roll);
});

btnHold.addEventListener('click', function () {
  if (
    document.querySelector('.player--active').querySelector('.current-score')
      .textContent !== '0'
  ) {
    if (player0.classList.contains('player--active')) {
      score0.textContent = Number(score0.textContent) + displayedScore;
    } else {
      score1.textContent = Number(score1.textContent) + displayedScore;
    }
    if (
      Number(
        document.querySelector('.player--active').querySelector('.score')
          .textContent
      ) >= 100
    ) {
      winning();
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', function () {
  reseting();
});
