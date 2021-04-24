// const bar = () => console.log('bar');
// const baz = () => console.log('baz');

// const foo = () => {
//     console.log('foo');
//     baz()
//     bar();
// }
// foo()


// =====================================================================
// Callback ,async and call stack
function getMessage(msg, callback) {
    setTimeout(() => {
        console.log(msg)
        callback()
    }, 100)
}

function displayMessage() {
    console.log('Display Message !!')
}
getMessage('Get Message', displayMessage)  //first get message will be executed and then displaymessage will be executed
