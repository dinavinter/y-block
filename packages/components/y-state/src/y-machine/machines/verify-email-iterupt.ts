import {createMachine} from "xstate";

//first, user trying to subscribe to a communication topic that requires verification
// event: Interrupt with `Authentication Required`
// the user is prompted to verify their email.
// the email is sent to the user wit a code.
// the user verify email with otp code .
// event: Interrupt with `Email Verified`
// the interaction is completing: the application saves the user email and opt-in communication topics . 
// goodbye and thanks


const machine = createMachine({
    id: "verify-email-dependent",
    initial: "idle",
    states: {
        idle:{
            on:{
                submit: "submit"
            }
        },
        submit: { 
            on: {
                "authentication-required": {
                    target:"authentication",
                
                },
                "ok" : "complete"
            }
        },
        authentication: {
            meta:{
                message: "Please verify your email",
                href: "authorize?resource=verify-email"
            },
            on: {
                "token": "submit"
            }
        },
        complete: {
            type: "final"
        }
    }
})