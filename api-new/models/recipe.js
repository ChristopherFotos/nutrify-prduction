const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    label: { type: String },
    img: { type: String },
    ingredientLines: { type: Array },
    digest: { type: Array },
    url: { type: String },
    calories: { type: Number }
    // this model needs to be expanded to include nutrition info and link to instructions
})

module.exports = mongoose.model('Recipe', recipeSchema)