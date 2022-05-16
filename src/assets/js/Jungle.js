class Animal {
    type = ''
    energy = 0;
    activities = []
    constructor(type) {
        this.energy = 20;
        this.activities = ['sleep', 'eat', 'sound', 'play'];
        this.type = type;
    }
    
    act(action){
        switch (action) {
            case 'sleep':
                this.doSleep();
                break;
            case 'ear':
                this.doEat();
                break;
            case 'sound':
                this.doSound();
                break;
            case 'play':
                this.doPlay();
                break;    
        }
    }

    doSound() {
        let e = 0;
        if (this.energy < 3) {
            this.tooTired();
            return;
        }
        if (this.energy < 4 && this.type === 'monkey' ) {
            this.tooTired();
            return;
        }
        e = (this.type === 'monkey' ) ? 4 : 3;
        this.energy -= e;
        this.reportEnergy();
    }

    doSleep() {
        this.energy += (this.type === 'tiger' ) ? 5 : 10;
        this.reportEnergy();
    }

    doEat(food) {
        if(food === 'grain' && this.type === 'tiger' ) {
            console.log(this.type + ' does not ear grain.');
            return;
        }
        this.energy += (this.type === 'monkey') ? 2 : 5;
        this.reportEnergy();
    }

    doPlay() {
        if (!(this.type === 'monkey')){ 
            console.log(this.type + ' does not play.');
        } else {
            if(this.energy < 8) {
               this.tooTired();
               return;
            }
            this.energy -= 8;
            
            this.reportEnergy();
        }
    }

    reportEnergy() {
        console.log(this.type + " now has this energy: " + this.energy);
    }

    tooTired() {
        console.log(this.type + " is too tired");
    }
}

class Tiger extends Animal {
    constructor() {
        super('tiger');
    }

    doSound() {
        super.doSound();
        console.log('Roar!');
    }
    
}

class Monkey extends Animal {
    constructor() {
        super('monkey');
    }

    doPlay() {
        super.doPlay();
        console.log(this.type + " Oooooo Ooooooo Oooooo");
    }

    doSound() {
        super.doSound();
        console.log(this.type + " grunting/squeaking");
    }
}

class Snake extends Animal {
    constructor() {
        super('snake');
    }
    doSound() {
        super.doSound();
        console.log(this.type + " hiss.");
    }
}

class Jungle {
    constructor() {
        this.types = ['tiger', 'monkey', 'snake'];
        this.foods = ['meat', 'fish', 'bugs', 'grain'];
        this.acts = ['sleep', 'eat', 'sound', 'play'];
        this.tigers = [];
        this.monkeys = [];
        this.snakes = [];
    }

    createAnimals() {
        let ran = Math.round(10 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            let tiger = new Tiger();
            this.tigers.push(tiger)
        }
        ran = Math.round(10 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            let monkey = new Monkey();
            this.monkeys.push(monkey)
        }
        ran = Math.round(10 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            let snake = new Snake();
            this.snakes.push(snake)
        }
    }

    soundOff() {
        console.log('SOUND OFF!!!!');
        this.tigers.forEach(
            a => {
                a.doSound();
            }
        );
        this.monkeys.forEach(
            a => {
                a.doSound();
            }
        );
        this.snakes.forEach(
            a => {
                a.doSound();
            }
        )
    }

    performActivity(animal, activity) {
            let ranAnimal = this.getRandomAnimal(animal);
            ranAnimal.act(activity);
    }


    getRandomAnimal(a) {
        let animal = null;
        switch (a) {
            case 'tiger':
                animal = this.tigers[Math.floor(Math.random() * this.tigers.length)];
                break;
            case 'monkey':
                animal = this.monkeys[Math.floor(Math.random() * this.monkeys.length)];
                break;
            case 'snake':
                animal = this.snakes[Math.floor(Math.random() * this.snakes.length)];
                break;
        }
        return animal;

    }

}

function liveForest() {
    let live = 100;
    let jungle = new Jungle();
    jungle.createAnimals();
    console.log('tigers: '+jungle.tigers.length);
    console.log('monkeys: '+jungle.monkeys.length);
    console.log('snakes: '+jungle.snakes.length);
    while (live > 0) {
        let type_idx =  Math.floor(Math.random() * jungle.types.length);
        let act_idx = Math.floor(Math.random() * jungle.acts.length)
        console.log(type_idx,act_idx);
        
        let animalType = jungle.types[type_idx];
        let act = jungle.acts[act_idx];
        let animal = jungle.getRandomAnimal(animalType);

        jungle.performActivity(animal, act);

        if (live % 9) jungle.soundOff();
        
        live--;
    }
}

// liveForest();


////////////////////  PART 2 //////////////////////////////
function f(str) {
    if(str == null || str.length === 0) {
        return '';
    }
    const letters = str.split('');
    let newLetters = [];
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((l) => String.fromCharCode(l));
    const reverseAlphabet = alpha.map((l) => String.fromCharCode(l)).reverse();
    letters.forEach(
        l => { 
            const u = l.toUpperCase();
            const idx = alphabet.indexOf(u);
            if( idx > -1) {
                newLetters.push(reverseAlphabet[idx]);
            } else {
                // handle non letter
                newLetters.push(l)
            }
        }
    );
    return newLetters.join('');
}
