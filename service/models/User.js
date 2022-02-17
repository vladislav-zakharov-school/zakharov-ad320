import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    deckId: mongoose.Types.ObjectId
})

export const User = mongoose.model('User', UserSchema)