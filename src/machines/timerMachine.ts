import { assign, createMachine } from "xstate";

export const timerMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMAnABAWTAGMALVAOzADotIAZVKAF2IEFDHUA3MAYgAUWAVQDKAUQDaABgC6iUAAcA9rFQdFZOSAAeiAMwAWAByUAbLoDsAVkvmAjACZdlp-YA0IAJ6JDtyrskBkrb6-uaGZvYAvpHuaJi4BCTkVDQQ9Eys7Fy88jScwowAhoxgUrJIIEoqahoVOggGxmZWNg5OLu5eCG2++gEO1rYAnEPm5ibRsRjY+ESkFNR0DMxsHNw8FFqMBcWlMppVqqjqmvWNphbWdo7Olm6eiHYmfoEmkiZDkpa2JraTIHEZol5iklhlVtkeFpYEUSpRCgAzEpYAAUtkCAEoeICEnNkos0stMms9uUFMojic6oh9L4RvSGQzwp1EGZLJRDPpzPZaYYhrohjzDP8cbMkgtUukVll1tDYVREci0ZjsdNceLQYTwTLSrYyZUKTVTnojBcWtd2ncWQgfL4TJYAuYQgFvrZdCK1WKQQThOhCgAbf38IRiMoHQ3HWqgepDWzs2yGcZcob6exhLnW+2+QLvEz2YKcj4e+Je-GpX0BoO5MD5eVhiqHI3UhpDdkmRPWQUjWzmSS6TP2SSUVsBLmSQxffPFoF4iWQCuBjZgLY7Er18nVSPGhCx+OJkzJ1Pp8zWkbGQLog9hXQfYUxAGe4Fl+d+xdy3bwpHYZUBLGip9zhAC7+uuBqblS0ask4HKBK2tIOGYtjWuYui6H4VjvChKH2JYJgTPe-6zpqwFQjCH6Kt+6K-qqJYAcRr4gXq4bgVG2iILulAJkm5gpmmnIng8O5fKYDqSEMvxjHBljTuq3pQDQYBkFKxKQgIIgSPsDYRhBbHdH0viOGMlhcroPb3F0PH6JxGEoUEQycvo0kEY+RGUPJYCKcpELrNWta7KBjZbs2-K+LYCEhBYDghPo1o+EO-gBIYOEmDxlitjJpYLO5nlEt5vCbNsdaaRulKsfUwRBJQhlWCZZmxXylB3A6KYTo5HzmBldFuQpSm5TqpHyp+SqiZIf4uRq3Ueb12okgF2llYgFUGRYNUoXVgn2VZHbopywS4VynWuR4YCBooADuUp5cG6lzSx24Jt8lB9H2uiJp8CaGNaVHPOiRifClCY9odE3HadF3LFdvmrqSzGlfdfRWZ8kg8mYArjKhX2SGMVU4WFibBPZwPeqD-rnZd-UFdDt1w82wQ9pxebjPaYlmEMX0WFZNjfLojg8qM3xE-iJNkxD-XvnCFGooO1GESDJ2k+DTB5dTTaQXp9M-GmeHNaz1o3uYImjmMaNBLhgsLPIhQAK6wJAPAAEqiMIgh4Bp+qBTp5XvaYAQGI4ozDPy1o8gbCWSEY7zJcEHXObRrmWzbduO87rviExWl3bThjWJQ45hL8qY-HmJhfTyaH2Ljg6vTYaPm1QCe2xADtOy7Ej2O7833dnvS+69PFBIYn2CWFlWOfonypj4PhRLHM4TQ3Sct6nugd5nasJiludWPrPP2CMlhD10zhDsz7z6OPfQ8jPUxx-P1uNzwUNFavNNq1Z9gRPte1vG8thgAAtMEa0-80JBA-m6MIuF7CtTvDfOe3oF5N0ps-WGqtdJ0idOJV6yNxIoTwuZRA-8fDDnPqhAu2tjL6GiPeMgigIBwE0LLEEqCgpq3-lyYcjIuHiWAT8IYVVSH5nsoKMYMc4GyWfFqaUJIWGe3Yvw7OxcjLhAJv2QSKE0LDG5OMOw2d-DXwfLfb05YGKyIWggOwQ4+SvTeFcYY2dYr+EoNyB0YwUr62GHXSaOUZrZDMfdQcocHQb0cF8AYmMwovCCHTNMB8K5eOForRgeV-G0xSvYKq29kZ5h7KZASXR0StmHHYYyWNAkpnwuIzK9d76QFSWrfMDVkbOBHGYN4IRS4f04v4PCvYp5BBjtEIAA */
    context: {
        timer: 8   as number,
        activeLight: 'red' as string,
        timerStatus: 'play'
    },

    schema: {
        events: {} as  {
            type: 'pause';
        } |  {
            type: 'resume';
        } | {
            type: 'redLigthActive'
        } | {
            type: 'greenLigthActive'
        } | {
            type: 'yellowLigtActive'
        } | {
            type: "redSmallActive"
        } | {
            type: "prevState"
        } | {
            type: "nextState"
        }
    },

    id: "Timer Mechine",
    initial: 'redLigthActive',
    states:{
        redLigthActive: {
            on: {
                pause: {
                    target: "paused",
                    actions: 'assignToContextPausedValue'
                },
                prevState: {
                    target: "yellowLigtActive",
                    actions: "assignToContextYellowActive"
                },
                nextState: {
                    target: "redSmallActive",
                    actions: "assignToContextRedSmallActive"
                },
                resume: {
                    target: "redLigthActive",
                    actions: "assignToContextResume"
                }
            },

            after: {
                "1000": [{
                    cond: "timerAction"
                },{
                    target: 'redLigthActive',
                    actions: 'assignToContextStartTimer',
                    cond: "isGraterThenThree"
                },{
                    target: "redSmallActive",
                    actions: 'assignToContextRedSmallActive'
                }],
            }
        },

        redSmallActive: {
            on: {
                pause: {
                    target: "paused",
                    actions: 'assignToContextPausedValue'
                },
                prevState: {
                    target: "redLigthActive",
                    actions: "assignToContextRedActive"
                },
                nextState: {
                    target: "greenLigthActive",
                    actions: "assignToContextGreenActive"
                },
                resume: {
                    target: "redSmallActive",
                    actions: "assignToContextResume"
                }
            },
            after: {
                "1000": [{
                    cond: "timerAction"
                },{
                    target: 'redSmallActive',
                    actions: 'assignToContextStartTimer',
                    cond: "isGraterThenZero"
                },{
                    target: "greenLigthActive",
                    actions: 'assignToContextGreenActive'
                }],
            }
        },

        greenLigthActive: {
            after: {
                "5000":[{
                    cond: "timerAction"
                },{
                    target: "yellowLigtActive",
                    actions: 'assignToContextYellowActive'
                }]
            },

            on: {
                pause: {
                    target: "paused",
                    actions: 'assignToContextPausedValue'
                },
                prevState: {
                    target: "redSmallActive",
                    actions: "assignToContextRedSmallActive"
                },
                nextState: {
                    target: "yellowLigtActive",
                    actions: "assignToContextYellowActive"
                },
                resume: {
                    target: "greenLigthActive",
                    actions: "assignToContextResume"
                }
            }
        },

        yellowLigtActive: {
            on: {
                pause: {
                    target: "paused",
                    actions: 'assignToContextPausedValue'
                },
                prevState: {
                    target: "greenLigthActive",
                    actions: "assignToContextGreenActive"
                },
                nextState: {
                    target: "redLigthActive",
                    actions: "assignToContextRedActive"
                },
                resume: {
                    target: "yellowLigtActive",
                    actions: "assignToContextResume"
                }
            },
            after: {
                "2000": [{
                    cond: "timerAction"
                },{
                    target: "redLigthActive",
                    actions: 'assignToContextRedActive'
                }]
            }
        },

        paused: {
            on: {
                resume: [{
                    target: 'redLigthActive',
                    actions: "assignToContextResume",
                    cond: "isRedLight"
                }, {
                    target: "greenLigthActive",
                    actions: "assignToContextResume",
                    cond: "isGreenLight"
                },{
                    target: "yellowLigtActive",
                    actions: "assignToContextResume",
                    cond: "isYellowLight"
                },{
                    target: "redSmallActive",
                    actions: "assignToContextResume",
                    cond: "isRedSmall"
                }],
                prevState: [{
                    target: "yellowLigtActive",
                    actions: "assignToContextYellowActive",
                    cond: "isRedLight"
                },{
                    target: "greenLigthActive",
                    actions: "assignToContextGreenActive",
                    cond: "isYellowLight"
                },{ 
                    target: "redSmallActive",
                    actions: "assignToContextRedSmallActive",
                    cond: 'isGreenLight'
                },{
                    target: "redLigthActive",
                    actions: "assignToContextRedActive",
                    cond: "isRedSmall"
                }],
                nextState: [{
                    target: "redSmallActive",
                    actions: "assignToContextRedSmallActive",
                    cond: "isRedLight"
                },{
                    target: "greenLigthActive",
                    actions: "assignToContextGreenActive",
                    cond: "isRedSmall"
                },{
                    target: "yellowLigtActive",
                    actions: "assignToContextYellowActive",
                    cond: "isGreenLight"
                }, {
                    target: "redLigthActive",
                    actions: "assignToContextRedActive",
                    cond: "isYellowLight"
                }]
            }
        },
    }
}, {
    guards: {
        "isGraterThenThree": (context, event) => {
            return context.timer > 4 
        },
        "isGraterThenZero": (context, event) => {
            return context.timer > 1 
        },
        "isRedLight": (context, event) => {
            return context.activeLight === 'red'
        },
        "isRedSmall": (context, event) => {
            return context.activeLight === 'redsmall'
        }, 
        "isGreenLight": (context, event) => {
            return context.activeLight === 'green'
        },
        "isYellowLight": (context, event) => {
            return context.activeLight === 'yellow'
        },
        "timerAction": (context, event) => {
            return context.timerStatus === "pause"
        }
    },
    actions: {
        assignToContextStartTimer: assign((context, event) => {
            return{
                timer: context.timer - 1
            }
        }),
        assignToContextPausedValue: assign((context: any, event) => {
            if (context.activeLight === "red"){
                return{
                    timer: 8,
                    timerStatus: 'pause'
                }
            }else if(context.activeLight === "redsmall"){
                return{
                    timer: 3,
                    timerStatus: 'pause'
                }
            }else{
                return{
                    timer: 0,
                    timerStatus: 'pause'
                }
            }
        }),

        assignToContextGreenActive: assign((context, event) => {
            return{
                activeLight: 'green',
                timer: 0
            }
        }),
        assignToContextYellowActive: assign((context, event) => {
            return{
                activeLight: 'yellow',
                timer: 0
            }
        }),
        assignToContextRedActive: assign((context, event) => {
            return{
                activeLight: 'red',
                timer: 8
            }
        }),
        assignToContextRedSmallActive: assign((context, event) => {
            return{
                activeLight: 'redsmall',
                timer: 3
            }
        }), 
        assignToContextResume: assign((context, event) => {
            return{
                timerStatus: "play"
            }
        })
    }
});