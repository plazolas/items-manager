class Animal {
    type = '';
    id = 0;
    energy = 0;
    constructor(type) {
        this.energy = 20;
        this.type = type;
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
        switch (this.type) {
            case 'monkey' :
                console.log(this.type + ' ' + this.id + ": grunt/squeal!");
                break;
            case 'tiger' :
                console.log(this.type + ' ' + this.id + ": roar!");
                break;
            case 'snake' :
                console.log(this.type + ' ' + this.id + ": hiss!");
                break;
        }
        this.energy -= e;
        this.reportEnergy();
    }

    doSleep() {
        this.energy += (this.type === 'tiger' ) ? 5 : 10;
        console.log(this.type + ' ' + this.id + ' just slept');
        this.reportEnergy();
    }

    doEat(food) {
        if(food == 'grain' && this.type == 'tiger' ) {
            console.log(this.type + ' does not eat grain.');
            return;
        }
        this.energy += (this.type === 'monkey') ? 2 : 5;
        console.log(this.type + ' ' + this.id + ' just ate ' + food);
        this.reportEnergy();
    }

    doPlay() {
        if (this.type === 'monkey') {
            if(this.energy < 8) {
               this.tooTired();
               return;
            }
            this.energy -= 8;
            this.doSound();
            this.reportEnergy();
        }
    }

    act(action, food){
        switch (action) {
            case 'sleep':
                this.doSleep();
                break;
            case 'eat':
                this.doEat(food);
                break;
            case 'sound':
                this.doSound();
                break;
            case 'play':
                this.doPlay();
                break;
        }
    }

    reportEnergy() {
        console.log(this.type + ' ' + this.id + ' now has this energy: ' + this.energy);
    }

    tooTired() {
        console.log(this.type + ' ' + this.id + ' is too tired');
    }
}

class Tiger extends Animal {
    constructor(id) {
        super('tiger');
        this.id = id;
    }
    
}

class Monkey extends Animal {
    constructor(id) {
        super('monkey');
        this.id = id;
    }
}

class Snake extends Animal {
    constructor(id) {
        super('snake');
        this.id = id;
    }
}

class Jungle {
    t = 0
    s = 0
    m = 0
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
        let ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            this.t++;
            let tiger = new Tiger(this.t);
            this.tigers.push(tiger)
        }
        ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            this.m++;
            let monkey = new Monkey(this.m);
            this.monkeys.push(monkey)
        }
        ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            this.s++;
            let snake = new Snake(this.s);
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
        console.log('END SOUND OFF!!!!');
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

function liveJungle() {
    let count = 1;
    let live = 100;
    let jungle = new Jungle();
    console.log('tigers: '+jungle.t);
    console.log('monkeys: '+jungle.m);
    console.log('snakes: '+jungle.s);
    while (live > 0) {
        let type_idx =  Math.floor(Math.random() * jungle.types.length);
        let act_idx = Math.floor(Math.random() * jungle.acts.length)
        let food_idx = Math.floor(Math.random() * jungle.foods.length)
        
        
        let type = jungle.types[type_idx];
        let activity = jungle.acts[act_idx];
        let food = jungle.foods[food_idx];
        let animal = jungle.getRandomAnimal(type);

        console.log('activity : ' + count++,type,activity, food);
        animal.act(activity, food);

        if (live % 9 === 0) jungle.soundOff();
        
        live--;
    }
}


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
liveJungle();
testP21();
testP22();


