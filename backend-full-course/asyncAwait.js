function clone() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Smile')
        }, 2000);
    })
}

const msg = async () => {
    const msg = await clone()
    console.log('Message', msg)
}
msg()