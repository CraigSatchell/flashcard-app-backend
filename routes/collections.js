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
            return res.status(400).send(`The card deck with id "${req.params.id}" d
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
            title: req.body.title,
            description: req.body.description,
            cards: req.body.cards,
        });
        await cardDeck.save();
        return res.send(cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


// Get flashcard collection by cardDeck id
router.get('/:deckId/cards', async (req, res) => {
    try {
        const cardDeck = await CardDeck.findById(req.params.deckId);
        if (!cardDeck)
            return res.status(400).send(`The card deck with id "${req.params.deckId}" d
   oes not exist.`);
        return res.send(cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


// Get flashcard collection by cardDeck & flashCard id
router.get('/:deckId/cards/:cardId', async (req, res) => {
    try {
        const cardDeck = await CardDeck.findById(req.params.deckId);
        if (!cardDeck)
            return res.status(400).send(`The card deck with id "${req.params.deckId}" d
   oes not exist.`);
        const flashCard = await FlashCard.findById(req.params.cardId);
        if (!cardDeck)
            return res.status(400).send(`The flashcard with id "${req.params.cardId}" d
   oes not exist.`);
        return res.send(cardDeck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// Add new flashcard to selected card deck
router.post('/:deckId/cards', async (req, res) => {
    try {
        const cardDeck = await CardDeck.findById(req.params.deckId);
        if (!cardDeck)
            return res.status(400).send(`The card deck with id "${req.params.deckId}" d
   oes not exist.`);

        // Need to validate body before continuing
        const { error } = validateFlashCard(req.body);
        if (error)
            return res.status(400).send(error);

        const flashCard = new FlashCard({
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        });
        await flashCard.save();
        return res.send(flashCard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;