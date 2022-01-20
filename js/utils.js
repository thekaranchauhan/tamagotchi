// Code is seperated into different sections for easier reading and evaluation.

import { elements } from '/js/constants.js';
import { Pet } from './script.js';
// Global Variables /////////
let gameStarted = false;
let pet;
let names = {
  user: '',
  pet: '',
};
let data = '/assets/data.json';
let bubbleTimer;

// Functions /////////
export const setUI = () => {
  if (!gameStarted) {
    elements.restartBtn.classList.replace('d-flex', 'd-none');
    elements.actionButtons.classList.replace('d-flex', 'd-none');
    // elements.petContainer.classList.replace('d-grid', 'd-none');
    elements.playBtn.classList.replace('d-none', 'd-flex');
  } else {
    elements.restartBtn.classList.replace('d-none', 'd-flex');
    elements.actionButtons.classList.replace('d-none', 'd-flex');
    // elements.petContainer.classList.replace('d-none', 'd-grid');
    elements.playBtn.classList.replace('d-flex', 'd-none');
  }
};

export const showForm = () => {
  elements.inputForm.classList.replace('d-none', 'd-flex');
};
export const hideForm = () => {
  elements.inputForm.classList.replace('d-flex', 'd-none');
};

export const stargGame = () => {
  gameStarted = true;
  pet && pet.die();
  hideForm();
  createPet();
  setUI();
  showBubble();
};

export const handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  names = {
    user: formData.get('user'),
    pet: formData.get('pet'),
  };
  stargGame();
};

// Pet Functons /////////
export const createPet = () => {
  pet = new Pet(names.pet, names.user, elements.petContainer, data);
};

export const eat = () => {
  pet.eatRandomFood();
  showBubble();
};
export const party = () => {
  pet.party();
  showBubble();
};
export const speedMetabolism = () => {
  pet.speedMetabolism();
  showBubble();
  showBubble();
};
export const slowMetabolism = () => {
  pet.slowMetabolism();
  showBubble();
};
export const getCompliment = () => {
  pet.getCompliment();
  showBubble();
};

export const showBubble = () => {
  clearTimeout(bubbleTimer);
  elements.bubble.style.display = 'none';
  elements.bubble.style.display = 'block';
  elements.bubble.innerText = pet.message;
  bubbleTimer = setTimeout(() => {
    elements.bubble.style.display = 'none';
  }, 2000);
};
