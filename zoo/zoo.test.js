const {Tiger, Lion} = require('./zoo');

describe('zoo', () => {
    it('should return sentence with "roar"', () => {
        const lion = new Lion();
        expect(lion.speak("I'm a lion")).toEqual("I'm roar a roar lion roar");
    });
    it('should return sentence with "grrr"', () => {
        const tiger = new Tiger();
        expect(tiger.speak("Lions suck")).toEqual("Lions grrr suck grrr");
    });
    it('should return the original sound', () => {
        const tiger = new Tiger();
        expect(tiger.speak()).toEqual(tiger.getSound());
    });
});