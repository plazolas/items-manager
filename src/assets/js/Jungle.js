class Animal {
    constructor(type) {
        this.energy = 10;
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
        if(this.type.equal('snake')) {
            console.log(this.type + ' dont sound.');
            return;
        }
        if (this.energy < 3) {
            this.tooTired();
            return;
        }
        if (this.energy < 4 && this.type.equals('monkey')) {
            this.tooTired();
            return;
        }
        e = (this.type.equal('monkey')) ? 4 : 3;
        this.energy -= e;
        this.reportEnergy();
    }

    doSleep() {
        this.energy += (this.type.equal('tiger')) ? 5 : 10;
        this.reportEnergy();
    }

    doEat(food) {
        if(food.equal('grain') && this.type.equal('tiger')) {
            console.log(this.type + ' does not ear grain.');
            return;
        }
        this.energy += (this.type.equals('monkey')) ? 2 : 5;
        this.reportEnergy();
    }

    doPlay() {
        if(!this.type.equal( 'monkey')) { 
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
        this.energy = 5;
    }

    doSound() {
        super.doSound();
        console.log('Roar!');
    }
    
}

class Monkey extends Animal {
    constructor() {
        super('monkey');
        this.energy = 5;
        this.activities.push('play')
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
        this.energy = 5;
        this.activities = this.activities.filter(a => a === 'sound')
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

    createJungle() {
        let ran = Math.round(100 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            this.tigers.add(new Tiger())
        }
        ran = Math.round(100 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            this.tigers.add(new Tiger())
        }
        ran = Math.round(100 * Math.random() + 1);
        for (let i = 1; i < ran; i++) {
            this.tigers.add(new Tiger())
        }
    }

    soundOff() {
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
        this.tigers.forEach(
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
                animal = this.monkeys[Math.floor(Math.random() * this.tigers.length)];
                break;
            case 'snake':
                animal = this.snakes[Math.floor(Math.random() * this.tigers.length)];
                break;
        }
        return animal;

    }

}

function liveForest() {
    let live = 1000;
    let jungle = new Jungle();
    while (live > 0) {
        let animal = jungle.types[Math.floor(Math.random() * this.type.length)];
        let act = jungle.acts[Math.floor(Math.random() * jungle.acts.length)];

        jungle.performActivity(animal, act);

        if (live % 5) jungle.soundOff();
        
        live--;
    }
}

liveForest();
