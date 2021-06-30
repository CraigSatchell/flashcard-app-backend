const mongoose = require('mongoose');
const Joi = require('joi');

const cardDeckSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true },
    cards: { type: Array },
    dateModified: { type: Date, default: Date.now },
});

const CardDeck = mongoose.model('CardDeck', cardDeckSchema);

function validateCardDeck(cardDeck) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        cards: Joi.array(),
    });
    return schema.validate(cardDeck);
}


exports.CardDeck = CardDeck;
exports.validateCardDeck = validateCardDeck;
exports.cardDeckSchema = cardDeckSchema;
