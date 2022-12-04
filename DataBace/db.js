const mongoose =require('mongoose')



async function connectDataBace() {

    return new Promise((resolve, reject) => {
        const uri = 'mongodb://127.0.0.1:27017/cointab'
        mongoose.connect(uri, (err) => {
            if (err) {
                console.log('error conncating to databace ', err)
                return reject(err)
            }
            console.log('successfuly connected to databace')
            resolve()
        })


    })
}

module.exports =connectDataBace