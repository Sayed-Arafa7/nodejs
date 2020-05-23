const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("Promise 1");
        reject(new Error("SOmething went wrong...."))
    }, 2000)
})



console.log("Going to consume..");

async function task() {
    try {
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.log(error.message);

    }
}

task()
console.log("after task ");





// promise.then(result => {
//     console.log(result);
// }).catch(error => {
//     console.log(error);
// })