'use strict';

const cards = document.querySelectorAll('.card');
const fronts = document.querySelectorAll('.card .front');
const hscoreEl = document.querySelector('.hscore i');
const scoreEl = document.querySelector('.score i');
const clickedEl = document.querySelector('.clicked i');

let youLeft = 20;
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
  const loopLength = randomNums.length === 0 ? 9 : randomNums.length;
  for (let i = 1; i < loopLength; i++) {
    const rand = Math.floor(Math.random() * 8) + 1;
    if (!randomNums.includes(rand)) randomNums.push(rand);
  }

  if (randomNums.length < 8) randoms();

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
  console.log(data);
};

const gameOver = () => {
  makeSound('gameover');

  if (score > +hscoreEl.textContent) {
    resetHScore(score);
  }
};

const showHide = (div, ind) => {
  if (youLeft === 0) return gameOver();

  if (howManyOpened === 2) return;
  div.classList.remove('show');

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
  console.log(type);
};

const displayUI = (datas) => {
  console.log(datas);
  fronts.forEach((front, ind) => {
    cards[ind].addEventListener('click', () => {
      makeSound('flip');
      showHide(cards[ind], datas[ind]);
    });
    front.innerHTML = `<img src="img/${datas[ind]}.png" alt="${datas[ind]}" />`;
  });
};

const startGame = () => {
  randomNums = [];
  nums1 = randoms();
  randomNums = [];
  nums2 = randoms();
  const datas = nums1.concat(nums2);

  displayUI(datas);
};

////////////////////
randoms();
hscore.addEventListener('click', startGame);
hscore.addEventListener('click', fetchHScore);
