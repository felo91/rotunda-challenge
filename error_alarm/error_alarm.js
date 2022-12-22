/*Suppose we have a web application that runs on a single server. Errors that
occur from time to time during normal operation of the application are logged to a
text file that is stored in the file system on the server.
We are not concerned about these errors when their frequency is low. However,
when lots of errors occur in a short period of time, there may be a problem with
the application and we want to be notified immediately. Specifically, when more
than ten errors occur in one minute, we want to receive an email notification.
In general terms or pseudo code, how would you implement such an alarm?
Please assume:
1. The general paradigm of logging errors to a text file will be kept in place.
2. There exists a function
function logError( error )
This function is called each time there is an error and appends the error to
the end of the log file.
3. We never want to receive more than one email notification per minute*/



// this objet should be stored in a db or a cache
let errorsLogs = {
    perMinute: 0,
    minute: new Date().getMinutes()
}

// this could be a middleware
async function errorMiddleware(error) {
    try{ await logError(error); }
    catch(error) { console.log(error); }
    finally{
        if (errorsLogs.minute !== new Date().getMinutes()) {
            errorsLogs.perMinute = 0;
            errorsLogs.minute = new Date().getMinutes();
        }
    
        errorsLogs.perMinute++;

        if(errorsLogs.perMinute === 10) {
            const toManyErrorEmail = new EmailFactory({type: EnumEmailType.TO_MANY_ERRORS});
            return toManyErrorEmail.sendEmail();
        }
        return "error logged";
    }
}


// utils

const EnumEmailType = {
    TO_MANY_ERRORS: "TO_MANY_ERRORS",
    ANOTHER_TYPE: "ANOTHER_TYPE"
}


class EmailFactory {
    #mailData = {};
    #mailLibrary = { sendEmail: (data)=>{ return "email sent"} } //this should be a library

    constructor({type}) {
        switch(type) {
            case EnumEmailType.TO_MANY_ERRORS : 
                this.#mailData = {
                    from: "system.rotunda@gmail.com",
                    to: "admin.rotunda@gmail.com",
                    subject: "TO MANY ERRORS IN THE LAST MINUTE",
                    html: `<p>Your system is not in god health, please contact the thecnical team</p>` //this could be a template
                }; 
            break;
            case EnumEmailType.ANOTHER_TYPE : this.data = new AnotherTypeOfMail(); break;
        }
    }

    sendEmail() {
        return this.#mailLibrary.sendEmail(this.#mailData);
    }
}

function logError( error ){
    // write error to file
    return
}

module.exports = {errorMiddleware, logError, EmailFactory, EnumEmailType};
