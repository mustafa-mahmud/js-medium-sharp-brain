'use strict';

const cards = document.querySelectorAll('.card');
const fronts = document.querySelectorAll('.card .front');
const hscoreEl = document.querySelector('.hscore i');
const start = document.getElementById('start');
const scoreEl = document.querySelector('.score i');
const clickedEl = document.querySelector('.clicked i');

let youLeft = 50;
let nums1 = [];
let nums2 = [];
let randomNums = [];
let howManyOpened = 0;
let index = {};
let score = 0;

const fetchHScore = async () => {
  const res = await fetch('get.php');
  const data = await res.text();

  hscoreEl.textContent = data;
};

const randoms = () => {
  const loopLength = randomNums.length === 0 ? 19 : randomNums.length;
  for (let i = 1; i < loopLength; i++) {
    const rand = Math.floor(Math.random() * 18) + 1;
    if (!randomNums.includes(rand)) randomNums.push(rand);
  }

  if (randomNums.length < 18) randoms();

  return randomNums;
};

const matched = (el, div) => {
  score++;
  el.classList.add('matched');
  div.classList.add('matched');
  scoreEl.textContent = score;

  index = {};
};

const resetHScore = async (sc) => {
  const res = await fetch('update.php', {
    method: 'post',
    body: sc,
    headers: {
      'Content-type': 'application/txt',
    },
  });

  const data = await res.text();

  if (data === 'Success') {
    alert(`You have a high score ${sc}`);
  }
};

const gameOver = () => {
  setTimeout(() => {
    location.reload();
  }, 10000);

  makeSound('gameover');
  if (score > +hscoreEl.textContent) {
    resetHScore(score);
  }
};

const showHide = (div, ind) => {
  if (youLeft === 0) return gameOver();

  if (howManyOpened === 2) return;
  div.classList.remove('show');
  makeSound('flip');

  setTimeout(function () {
    div.classList.add('show');
    howManyOpened--;
  }, 2000);

  if (index.key === ind) {
    matched(index.el, div);
  } else {
    index = {
      key: ind,
      el: div,
    };
  }

  howManyOpened++;
  youLeft--;

  clickedEl.textContent = youLeft;
};

const makeSound = (type) => {
  const sound = new Audio(`./sounds/${type}.mp3`);
  sound.play();
};

const displayUI = (datas) => {
  fronts.forEach((front, ind) => {
    cards[ind].addEventListener(
      'click',
      () => {
        showHide(cards[ind], datas[ind]);
      },
      true
    );
    front.innerHTML = `<img src="img/${datas[ind]}.png" alt="${datas[ind]}" />`;
  }, 100);
};

const startGame = () => {
  start.style.display = 'none';
  youLeft = 50;
  score = 0;
  randomNums = [];
  nums1 = randoms();
  randomNums = [];
  nums2 = randoms();
  const datas = nums1.concat(nums2);
  clickedEl.textContent = youLeft;
  scoreEl.textContent = score;

  displayUI(datas);
};

////////////////////
randoms();
fetchHScore();
start.addEventListener('click', startGame);
hscore.addEventListener('click', fetchHScore);
