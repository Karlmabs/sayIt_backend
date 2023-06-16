const mongoose = require("mongoose");

const SitSchema = new mongoose.Schema({
    text: {type: String, required: true},
    images: {
        type: [{
            id: String,
            src: String,
            alt: String
        }],
        required: false
    },
    parent: {type: {id: String, username: String}, required: false},
    userLikes: {type: [String], required: false},
    createdBy: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    userReplies: {type: Number, default: 0, required: false},
    userResits: {type: [String], required: false}
});


const Sit = mongoose.model("Sit", SitSchema);
module.exports = Sit;
