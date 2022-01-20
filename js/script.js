// Code is seperated into different sections for easier reading and evaluation.
// Karan Chauhan 100768601
import { petPaths } from './constants.js';

export class Pet {
  constructor(petName, owner, htmlElement, data) {
    this.fetchData(data).then((data) => {
      this.petFoods = data.foods;
      this.petMoods = data.petMood;
      this.compliments = data.compliments;
      this.htmlElement = htmlElement;
      this.hatch();
      htmlElement.classList.replace('d-none', 'd-grid');
    });
    this.owner = owner;
    this.petName = petName;
    this.tl = new TimelineMax({});
    this.message = `Hi ${this.owner}, my name is ${this.petName}`;
    this.foodDisplay.style.color = 'green';
  }
  _owner = '';
  paths = petPaths;
  initialFood = 60;
  _message = '';
  _food = this.initialFood;
  _petName;
  mood = 'Neutral';
  htmlElement = '';
  currentFood = {};
  metabolismRate = 1000;
  foodDisplay = document.getElementById('count');
  petFoods = [];
  petMoods = [];
  compliments = [];
  tl;
  metabolism;
  // Prevent food value from ever going to zero
  set food(amt) {
    amt > 0 ? (this._food = amt) : (this._food = 0);
  }
  get food() {
    return this._food;
  }

  get message() {
    return this._message;
  }
  set message(msg) {
    this._message = msg;
  }
  get owner() {
    let userName = this._owner.toLowerCase();
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    return userName;
  }
  set owner(owner) {
    this._owner = owner.trim();
  }
  get petName() {
    const name = this._petName.toLowerCase();
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted;
  }
  set petName(name) {
    this._petName = name.trim();
  }

  async fetchData(data) {
    const response = await fetch(data);
    const res = await response.json();
    return res;
  }

  resetFood() {
    this.food = this.initialFood;
  }

  hatch() {
    this.resetFood();
    this.startMetabolism();
  }

  getCompliment() {
    if (!!this.food) {
      this.generateCompiment(this.owner);
      this.animateHappy();
    } else {
      this.message = 'I am dead and cant give you compliments!';
    }
  }
  // function that takes in a name and substitutes the holder text in a random compliment
  generateCompiment(user) {
    const randomCompliment =
      this.compliments[Math.floor(Math.random() * this.compliments.length)];
    const compliment = randomCompliment.replace('$user', user);
    this.message = compliment;
  }

  startMetabolism() {
    this.animateReset();
    this.metabolism = setInterval(() => {
      this.food -= 1;
      this.foodDisplay.innerHTML = this.food;
      // Change the color of the food points based on remaining food
      if (this.food < 20) {
        this.foodDisplay.style.color = 'red';
      } else if (this.food > 49) {
        this.foodDisplay.style.color = 'green';
      } else if (this.food < 50) {
        this.foodDisplay.style.color = 'orange';
      }
      if (!this.food) {
        this.die();
      }
    }, this.metabolismRate);
  }
  speedMetabolism() {
    //   Increase metabolism rate by 100%
    if (this.food) {
      //   Decrease metabolism rate by 50%
      this.metabolismRate *= 0.5;
      clearInterval(this.metabolism);
      this.startMetabolism();
      this.message = 'I am using a lot of energy! I might die soon!';
    } else {
      this.message = "I am dead and can't speed up metabolism!";
    }
  }
  slowMetabolism() {
    if (this.food) {
      //   Decrease metabolism rate by 50%
      this.metabolismRate *= 1.5;
      clearInterval(this.metabolism);
      this.startMetabolism();
      this.message = 'I am using a little less energy! ';
    } else {
      this.message = "I am dead and can't slow down metabolism!";
    }
  }

  eatRandomFood() {
    if (this.petFoods.length > 0) {
      const foodIndex = Math.floor(Math.random() * this.petFoods.length);
      const randomFood = this.petFoods[foodIndex];
      const poisoningChance = Math.random();
      if (this.food > 0) {
        this.currentFood = randomFood;
        //   Deduct food points if poisoned, else, add food points
        if (randomFood.sick > poisoningChance) {
          this.message = `I got poisoned eating ${randomFood.name} and lost ${randomFood.foodPoints} food points`;
          this.animateSad();
          this.food -= randomFood.foodPoints;
        } else {
          this.food += randomFood.foodPoints;
          this.message = `I just ate ${randomFood.name} and gained ${randomFood.foodPoints} food points`;
          this.animateHappy();
        }
        this.foodDisplay.innerHTML = this.food;
        //   Decrease food quantity
        this.petFoods[foodIndex].quantity--;
        //   Remove the food if the quantity hits Zero
        this.petFoods[foodIndex].quantity < 1 &&
          this.petFoods.splice(foodIndex, 1);
      } else {
        this.message = "I'm already dead and can't take " + randomFood.name;
        clearInterval(this.metabolism);
      }
    } else {
      this.message = `We've partied and now there's no food in the store. I'll die when the food points run out`;
    }
  }

  party() {
    if (this.petFoods.length > 0 && this.food > 0) {
      console.log(this.petFoods.length);
      while (this.petFoods.length > 0 && this.food > 0) {
        this.eatRandomFood();
        this.message = 'I am having a party!';
      }
      this.animateHappy();
    } else if (this.food > 0) {
      this.message = 'No food in the store to party with!';
      this.animateAngry();
    } else {
      this.die();
      this.message = "I'm dead and can't party!";
    }
  }
  die() {
    clearInterval(this.metabolism);
    this.message = 'I am dead!';
    this.animateDead();
  }

  //////////// Animations ///////////////
  // Happy
  animateHappy() {
    TweenMax.to(petPaths.leftEyebrow, 1, {
      attr: {
        d: 'M176.8,286 Q260,235 280,286',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEyebrow, 1, {
      attr: {
        d: 'M329,286 Q349,235 433.7,286',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.lip, 1, {
      attr: {
        d: 'M236,453 Q310,521.5 392.6,453',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
  }
  // Sad
  animateSad() {
    TweenMax.to(petPaths.leftEyebrow, 1, {
      attr: {
        d: 'M176.8,286 Q178,255 280,255',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEyebrow, 1, {
      attr: {
        d: 'M329,255 Q423.7,255 433.7,286',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.lip, 1, {
      attr: {
        d: 'M236,453 Q310,401.5 392.6,453',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
  }
  // Dead
  animateAngry() {
    TweenMax.to(petPaths.leftEyebrow, 1, {
      attr: {
        d: 'M176.8,255 Q178,215 280,286',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEyebrow, 1, {
      attr: {
        d: 'M329,286 Q423.7,215 433.7,255',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftEye, 1, {
      fill: 'red',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEye, 1, {
      fill: 'red',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.lip, 1, {
      attr: {
        d: 'M236,453 Q402,413.5 392.6,453',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
  }
  // Dead
  animateDead() {
    TweenMax.to(petPaths.leftEyebrow, 1, {
      attr: {
        d: 'M176.8,286 Q178,255 280,255',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEyebrow, 1, {
      attr: {
        d: 'M329,255 Q423.7,255 433.7,286',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.lip, 1, {
      attr: {
        d: 'M236,453 Q310,401.5 392.6,453',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftDeadEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightDeadEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
  }
  // Resets face to neutral
  animateReset() {
    TweenMax.to(petPaths.leftEyebrow, 1, {
      attr: {
        d: 'M176.8,286 Q260,250 280,286',
      },
      opacity: 1,
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEyebrow, 1, {
      attr: {
        d: 'M329,286 Q349,250 433.7,286',
      },
    });
    TweenMax.to(petPaths.lip, 1, {
      attr: {
        d: 'M236,453 Q310,471.5 392.6,453',
      },
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightEye, 1, {
      fill: 'black',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.leftDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
    TweenMax.to(petPaths.rightDeadEye, 1, {
      fill: 'transparent',
    });
    this.tl.tweenFromTo('start', 'end');
  }
}
