const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true},
    bio: {type: String, required: false},
    name: {type: String, required: true},
    theme: {
        type: String,
        enum: ['light', 'dim', 'dark'],
        required: false
    },
    accent: {
        type: String,
        enum: ['blue', 'yellow', 'pink', 'purple', 'orange', 'green'],
        required: false
    },
    website: {type: String, required: false},
    location: {type: String, required: false},
    username: {type: String, required: true},
    photoURL: {type: String, required: false},
    verified: {type: Boolean, default: false},
    following: {type: [String], required: false},
    followers: {type: [String], required: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    totalTweets: {type: Number, default: 0, required: true},
    totalPhotos: {type: Number, default: 0, required: true},
    pinnedTweet: {type: String, required: false},
    coverPhotoURL: {type: String, required: false},
    bookmarks: {
        type: [
            {
                id: String,
                createdAt: Date,
            }
        ], required: false
    },
    stats: {
        type: {
            likes: [String],
            sits: [String],
            updatedAt: Date
        }, required: false
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

