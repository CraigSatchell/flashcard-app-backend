const { CardDeck, FlashCard, validateFlashCard, validateCardDeck } = require('../models/flashcard')
const express = require('express');
const router = express.Router();

// Get all card collections
router.get('/', async (req, res) => {
    try {
        const cardDecks = await CardDeck.find();
        return res.send(cardDecks);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// Get card collection by id
router.get('/:id', async (req, res) => {
    try {
        const cardDeck = await CardDeck.findById(req.params.id);
        if (!cardDeck)
            return res.status(400).send(`The product with id "${req.params.id}" d
   oes not exist.`);
        return res.send(cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        // Need to validate body before continuing
        const { error } = validateCardDeck(req.body);
        if (error)
            return res.status(400).send(error);

        const cardDeck = new CardDeck({
            name: req.body.name,
            description: req.body.description,
            cards: req.body.cards,
        });
        await cardDeck.save();
        return res.send(cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;