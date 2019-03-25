let promise = new Promise((resolve, reject) =>{
    let isDone = true
    if(isDone) {
        resolve("work is done. you can proceed futhur")
    } else {
        reject("work is not done. due to technical issue.")
    }
});

promise.then((result) => {
    console.log(result)
}).catch((error) =>{
    console.log(error)
});