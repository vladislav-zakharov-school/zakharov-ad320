import mongoose from 'mongoose'
import { Deck } from '../models/Deck.js'

import decks from '../testData/decks.json'
import cards from '../testData/cards.json'

const sleepAndQuit = new Promise((resolve) => {
  setTimeout(() => {
    mongoose.connection.close()
    resolve()
  }, 5000)
})

const initDB = async () => {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bf91m.mongodb.net/notoriety?retryWrites=true&w=majority`
  try {
    await mongoose.connect(connectionString)
  } catch (err) {
    console.log('error ', err)
  }

  const deckDocs = []

  for (const deck of decks) {
    const newDeck = await Deck.create({
      name: deck.name,
      size: 0,
      userId: new mongoose.Types.ObjectId()
    })
    deckDocs.push(newDeck)
  }

  for (const card of cards) {
    deckDocs[card.deck_id % 10].cards.push({
      frontImage: card.front_image,
      frontText: card.front_text,
      backImage: card.back_image,
      backText: card.back_text
    })
    deckDocs[card.deck_id % 10].size++
  }

  deckDocs.forEach(async (deck) => {
    await deck.save()
  })

  await sleepAndQuit

  console.log('finished saving decks')
}

initDB()