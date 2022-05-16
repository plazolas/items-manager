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
        this.createAnimals();
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
        let animal;
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
            default:
                animal = this.snakes[Math.floor(Math.random() * this.snakes.length)];
        }
        return animal;
    }

}

function liveForest() {
    let live = 100;
    let jungle = new Jungle();
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
    if(str == null || str.length === 0 || Number.isInteger(str) || Number.isNaN(str)) {
        return '';
    }
    const letters = str.split('');
    let newLetters = [];
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((l) => String.fromCharCode(l));
    const reverseAlphabet = alpha.map((l) => String.fromCharCode(l)).reverse();
    letters.forEach(
        l => {
            let upper = l;
            upper = upper.toUpperCase();
            const idx = alphabet.indexOf(upper);
            if( idx > -1) {
                let newLetter = reverseAlphabet[idx];
                newLetter = (isLowerCase(l)) ? newLetter.toLowerCase() : newLetter;
                newLetters.push(newLetter);
            } else {
                // handle non letter
                newLetters.push(l)
            }
        }
    );
    return newLetters.join('');
}

function g(str) {
    if(str == null || str.length === 0 || Number.isInteger(str) || Number.isNaN(str)) {
        return '';
    }
    const hash = [];
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((l) => String.fromCharCode(l));
    alphabet.map((l) => hash.push({
        letter:  l,
        frequency: 0
    }));
    
    const chars = str.split('');
    chars.forEach(
        char => {
            let upper = char;
            upper = upper.toUpperCase();
            let idx = alphabet.indexOf(upper);
            if( idx > -1) {
                let e = hash[idx];
                e.frequency++;
                hash[idx] = e;
            }
        }
    );
    let out = '';
    hash.map(e => {
        out += e.letter + ':' + e.frequency + '\n';
    });
    return out;
}

function isLowerCase(str)
{
    return str === str.toLowerCase() && str !== str.toUpperCase();
}
////////////////////  Unit tests
function testP21 () {
    console.log(f());
    console.log(f(0));
    const str = "Errors in strategy cannot be correct through tactical maneuvers";
    console.log(f(str));
}

function testP22 () {
    console.log(g());
    console.log(g(0));
    const str = "Errors in strategy cannot be correct through tactical maneuvers";
    console.log(g(str));
}
testP21();
testP22();


