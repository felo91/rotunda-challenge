

//We are building a zoo inside a computer. Each animal species in our zoo has lots of different, particular, behaviors, but all animals talk to each other in a similar way. Specifically, they all implement a speak method, the output of which is the arbitrary input string interspersed with an "animal sound" that is particular to thattype of animal. For example, the lion's speak function behaves like so:
//> lion.speak( "I'm a lion" );
//< "I'm roar a roar lion roar"
//The tiger's speak function behaves similarly but with a different sound:
//> tiger.speak( "Lions suck" );
//< "Lions grrr suck grrr"

class Animal {
    constructor(sound) { this.sound = sound;  }

    speak(input="") {
        return input ? input.split(" ").map(word => `${word} ${this.sound}`).join(" ") : this.sound;
    }

    getSound() { return this.sound; }
}

class Lion extends Animal {
    constructor() { super("roar")  }
    getSound() { return super.getSound()}
}

class Tiger extends Animal {
    constructor() { super("grrr")  }
    getSound() { return super.getSound()}
}

module.exports= { Lion, Tiger };