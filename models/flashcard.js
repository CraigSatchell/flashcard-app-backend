const mongoose = require('mongoose');
const Joi = require('joi');

// Define cardDeck schema and data validation
const cardDeckSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true },
    cards: { type: Array },
    dateModified: { type: Date, default: Date.now },
});

const CardDeck = mongoose.model('CardDeck', cardDeckSchema);

function validateCardDeck(cardDeck) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().required(),
        cards: Joi.array(),
    });
    return schema.validate(cardDeck);
}


// Define cardDeck schema and data validation
const flashCardSchema = new mongoose.Schema({
    cardFront: { type: String, required: true, minlength: 15, maxlength: 255 },
    cardBack: { type: String, required: true, minlength: 2, maxlength: 255 },
    dateModified: { type: Date, default: Date.now },
});

const FlashCard = mongoose.model('FlashCard', flashCardSchema);

function validateFlashCard(flashCard) {
    const schema = Joi.object({
        cardFront: Joi.string().min(15).max(255).required(),
        cardBack: Joi.string().min(2).max(255).required(),
    });
    return schema.validate(flashCard);
}



exports.CardDeck = CardDeck;
exports.validateCardDeck = validateCardDeck;
exports.cardDeckSchema = cardDeckSchema;
exports.FlashCard = FlashCard;
exports.validateFlashCard = validateFlashCard;
exports.flashCardSchema = flashCardSchema;
