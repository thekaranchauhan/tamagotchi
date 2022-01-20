// Code is seperated into different sections for easier reading and evaluation.

import {
  showForm,
  hideForm,
  handleFormSubmit,
  setUI,
  eat,
  party,
  speedMetabolism,
  slowMetabolism,
  getCompliment,
} from '/js/utils.js';
import { elements } from '/js/constants.js';
// Show and hide some elements conditionally
setUI();
elements.playBtn.addEventListener('click', showForm);
elements.restartBtn.addEventListener('click', showForm);
elements.inputFormCloseBtn.addEventListener('click', hideForm);
elements.inputForm.addEventListener('submit', handleFormSubmit);
elements.feedBtn.addEventListener('click', eat);
elements.partyBtn.addEventListener('click', party);
elements.speedMetabolismBtn.addEventListener('click', speedMetabolism);
elements.slowMetabolismBtn.addEventListener('click', slowMetabolism);
elements.complimentBtn.addEventListener('click', getCompliment);
