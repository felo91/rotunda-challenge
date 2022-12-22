const {errorMiddleware, logError, EmailFactory, EnumEmailType} = require('./error_alarm');

const testFunction = async(errorNumber) => {
    let results=[]
    for (let i = 0; i < errorNumber; i++) {
        results.push(await errorMiddleware('error'));
    }
    return results;
}

describe('error middleware', () => {
    it('should send an email if there are more than 10 errors in a minute', async() => {
        let results=await testFunction(20);
        expect(results.filter((res) => (res === 'email sent')).length).toEqual(1)
    });
    it('should not send an email if there are less than 10 errors in a minute', async() => {
        let results=await testFunction(9);
        expect(results.filter((res) => (res === 'email sent')).length).toEqual(0)
    });
    
    // ---- This test will spend 2 minutes to run, its commented because of that. It works ----

    /*it('should send two emails if  there are 10 or more errors at differents minutes', async() => {
        let results=[]
        await new Promise(resolve => setTimeout(async() => {
            results = [...results, ...await testFunction(20)];
            resolve();
        }, 60000));
        await new Promise(resolve => setTimeout(async() => {
            results = [...results, ...await testFunction(20)];
            resolve();
        }, 60000));
        console.log(results)
        expect(results).toEqual(expect.arrayContaining(['email sent']))
        expect(results.filter((res) => (res === 'email sent')).length).toEqual(2)
    }, 130000);*/
});