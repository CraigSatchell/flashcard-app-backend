const { CardDeck, FlashCard, validateFlashCard, validateCardDeck } = require('../models/flashcard')
const express = require('express');
const router = express.Router();

// Get all card decks
router.get('/', async (req, res) => {
   try {
      const cardDecks = await CardDeck.find();
      return res.send(cardDecks);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

// Get card decks by id
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

// create new card deck
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
      return res.send(cardDeck.cards);
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

      const flashCard = cardDeck.cards.filter((card) => card._id == req.params.cardId);

      if (flashCard.length === 0)
         return res.status(400).send(`The flashcard with id "${req.params.cardId}" d
   oes not exist.`);
      return res.send(flashCard[0]);
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

      // add flashcard to card deck
      cardDeck.cards.push(flashCard);

      // save updates
      await cardDeck.save();
      await flashCard.save();

      return res.send(flashCard);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


// Get flashcard collection by cardDeck & flashCard id and update flashCard
router.post('/:deckId/cards/:cardId', async (req, res) => {
   try {
      const cardDeck = await CardDeck.findById(req.params.deckId);
      if (!cardDeck)
         return res.status(400).send(`The card deck with id "${req.params.deckId}" d
   oes not exist.`);

      const flashCardIndex = cardDeck.cards.findIndex((card) => card._id == req.params.cardId);

      if (flashCardIndex == -1)
         return res.status(400).send(`The flashcard with id "${req.params.cardId}" d
   oes not exist.`);

      // store changes to flashcard
      //cardDeck[flashCardIndex].cardFront = req.body.cardFront;
      //cardDeck[flashCardIndex].cardBack = req.body.cardBack;
      console.log(cardDeck[flashCardIndex])
      //await cardDeck.save();

      return res.send(cardDeck[flashCardIndex]);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

module.exports = router;