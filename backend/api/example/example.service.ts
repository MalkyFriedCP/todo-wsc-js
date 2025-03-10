function getAllExamples() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                example:
                    'this is example of MVC app build in typescript that runs on Docker',
            })
        }, 300)
    })
}

export { getAllExamples }
