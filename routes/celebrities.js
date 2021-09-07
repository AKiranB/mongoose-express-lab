const router = require("express").Router()

// const { render } = require('../app')

const { render } = require('../models/celebrity')

const Celebrity = require('../models/celebrity')


router.get('/celebrities', (req, res, next) => {

    Celebrity.find()
        .then(celebrities => {
            // console.log(celebrities)
            res.render('celebrities', { celebrities: celebrities })

        })
        .catch(err => {
            next(err)
        })

})

router.get('/celebrities/new', (req, res, next) => {

    console.log('at celeb page')
    res.render('new')

})

router.post('/celebrities', (req, res, next) => {

    // console.log(req.body)
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
        .then(thisArtist => {

            res.redirect(`/celebrities/${thisArtist.id}`)
            // console.log(thisArtist)

        })
        .catch(err => next(err))

})

router.get('/celebrities/delete/:id', (req, res, next) => {

    const artistId = req.params.id
    console.log(artistId)

    Celebrity.findByIdAndDelete(artistId)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => next(err))

})

router.get('/celebrities/edit/:id', (req, res, next) => {

    const artistId = req.params.id

    Celebrity.findById(artistId)
        .then(artist => {
            res.render('celebrityEdit', { artist: artist })
        })
        .catch(err => next(err))


})

router.post('/celebrities/edit/:id', (req, res, next) => {

    const artistId = req.params.id
    console.log(artistId)
    console.log(req.body)
    Celebrity.findByIdAndUpdate(artistId, {

        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase

    }, { new: true })
        .then(thisArtist => {

            res.redirect(`/celebrities/${thisArtist.id}`)
        })
        .catch(err => {
            next(err)
        })


})

router.get('/celebrities/:id', (req, res, next) => {

    const artistId = req.params.id

    // console.log(artistId)

    Celebrity.findById(artistId)
        .then(celebrity => {
            console.log(celebrity)
            res.render('show', { celebrity: celebrity })
        })
        .catch(err => next(err))
})



module.exports = router