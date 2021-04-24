let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('Run successfully'), 1000);

}); //instance of promise

promise.then(
    result => console.log(result),
    error => console.log(error)
)