class Foods {
    constructor(diet) {
        this.diet =  (diet === null || diet === undefined) ? ['meat', 'fish', 'bugs', 'grain']  : diet;
    }
    add(food) {
        this.diet.push(food)
    }
    remove(food) {
        this.diet = this.diet.filter(f => f === food)
    }
    getDiet() { return this.diet }
}


class Animal {
    constructor(jungle, id, type, diet) {
        this.type = (type === null || type.length === 0) ? 'snake' : type;
        this.id = id;
        this.energy = 10;
        this.sound = '';
        this.foods = new Foods(diet).getDiet();
        this.jungle = jungle;
    }
    
    doSound() {
        if (this.energy < 3) {
            this.tooTired();
            return;
        }
        console.log(this.type + ' ' + this.id + ': ' + this.sound + '!');
        this.energy -= 3;
        this.reportEnergy();
    }

    doSleep() {
        this.energy +=  10;
        console.log(this.type + ' ' + this.id + ' just slept.');
        this.reportEnergy();
    }

    doEat(food) {
        if(!(this.foods.includes(food))) {
            console.log(this.type + ' does not eat ' + food);
            return;
        }
        this.energy += 5;
        console.log(this.type + ' ' + this.id + ' just ate ' + food);
        this.reportEnergy();
    }

    doPlay() {
        if (this.type !== 'monkey') {
            console.log(this.type + "s do not play.");
        }
    }

    reportEnergy() {
        let a = this.type;
        a = a && a[0].toUpperCase() + a.slice(1);
        console.log(a + ' ' + this.id + ' new energy: ' + this.energy);
    }

    tooTired() {
        let a = this.type;
        a = a && a[0].toUpperCase() + a.slice(1);
        console.log(a + ' ' + this.id + ' is too tired!');
    }
}

class Tiger extends Animal {
    constructor(jungle, id) {
        super(jungle, id,'tiger', ['meat', 'fish', 'bugs']);
        this.kin = (this.kin > 0) ? this.kin++ : 1;
        this.sound = ' roar!';
    }

    doSleep() {
        this.energy +=  5;
        console.log(this.type + ' ' + this.id + ' just slept.');
        this.reportEnergy();
    }
    logKins() {
        console.log(this.type + ' has ' + this.jungle.getTigersCount() + ' kins');
    }
    
}

class Monkey extends Animal {
    constructor(jungle, id) {
        super(jungle, id,'monkey');
        this.kin = (this.kin > 0) ? this.kin++ : 1;
        this.sound = ' grunts-squeals!';
    }
    doPlay() {
        if (this.energy < 8) {
            this.tooTired();
        } else {
            console.log(this.type + ' ' + this.id + ' plays: Oooooo Ooooo Oooooo!');
            this.energy -= 8;
            this.reportEnergy();
        }
    }
    doSound(sound) {
        if (this.energy < 4) {
            this.tooTired();
            return;
        }
        console.log(this.type + ' ' + this.id + ': ' + this.sound + '!');
        this.energy -= 4;
        this.reportEnergy();
    }
    logKins() {
        console.log(this.type + ' has ' + this.jungle.getMonkeysCount() + ' kins');
    }
    
}

class Snake extends Animal {
    constructor(jungle, id) {
        super(jungle, id,'snake');
        this.kin = (this.kin > 0) ? this.kin++ : 1;
        this.sound = ' hiss!';
    }
    logKins() {
        console.log(this.type + ' has ' + this.jungle.getSnakesCount() + ' kins');
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
    getTigersCount() {
        return this.tigers.length - 1;
    }
    getMonkeysCount() {
        return this.monkeys.length - 1;
    }
    getSnakesCount() {
        return this.snakes.length - 1;
    }

    createAnimals() {
        let ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            let tiger = new Tiger(this, this.tigers.length + 1);
            this.tigers.push(tiger)
        }
        ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            let monkey = new Monkey(this, this.monkeys.length + 1);
            this.monkeys.push(monkey)
        }
        ran = Math.round(10 * Math.random()) + 1;
        for (let i = 1; i <= ran; i++) {
            let snake = new Snake(this, this.snakes.length + 1);
            this.snakes.push(snake)
        }
    }

    soundOff() {
        console.log('SOUND OFF!!!!');
        this.tigers.forEach(a => {a.doSound();});
        this.monkeys.forEach(a => {a.doSound();});
        this.snakes.forEach(a => {a.doSound();})
        console.log('END SOUND OFF!!!!');
    }
    
    getRandomAnimal(type) {
        let animal;
        switch (type) {
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
    
    performActivity(animal, activity, food){
            switch (activity) {
                case 'sleep':
                    animal.doSleep();
                    break;
                case 'eat':
                    animal.doEat(food);
                    break;
                case 'sound':
                    animal.doSound();
                    break;
                case 'play':
                    animal.doPlay();
                    break;
            }
    }
}

function liveJungle() {
    let actionCount = 1;
    let live = 100;
    let jungle = new Jungle();
    console.log('tigers: ' + jungle.tigers.length);
    console.log('monkeys: ' + jungle.monkeys.length);
    console.log('snakes: ' + jungle.snakes.length);
    while (live > 0) {

        let type = jungle.types[Math.floor(Math.random() * jungle.types.length)];
        let activity = jungle.acts[Math.floor(Math.random() * jungle.acts.length)];
        let food = jungle.foods[Math.floor(Math.random() * jungle.foods.length)];
        
        let animal = jungle.getRandomAnimal(type);
        
        console.log(actionCount + ' PERFORM : ' + ' ' + type + ' ' + activity + ' ' + food);
        jungle.performActivity(animal, activity, food);
        actionCount++;

        if (live % 25 === 0) jungle.soundOff();
        if (live % 20 === 0) animal.logKins();
        
        live--;
    }
    console.log('-- end --');
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
//liveJungle();
//testP21();
//testP22();


