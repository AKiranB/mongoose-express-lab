

const mongoose = require('mongoose')

const Celebrity = require('./models/celebrity')

mongoose.connect('mongodb://localhost/library')

const celebrities = [

    {
        name: 'Bladee',
        occupation: "Auto-tune Singer",
        catchPhrase: "Drain Ganggggg"

    },
    {
        name: 'Ecco2k',
        occupation: 'All-round artist',
        catchPhrase: 'Eeeeeeee'
    },
    {

        name: 'Yung-Lean',
        occupation: 'Rap-god',
        catchPhrase: "Woooooo"

    }

]


Celebrity.insertMany(celebrities)
    .then(celebrities => {

        console.log(`Successful! We added ${celebrities.length} celebrities to the Database`)
        mongoose.connection.close()

    })
    .catch(err => {
        console.log(err)
    })
