import React from 'react'

import FlashcardProvider from '../Flashcard/FlashcardProvider'
import CreateFlashcard from '../Flashcard/CreateFlashcard'

const Deck = ({deck, createMode}) => {
  return <div>{ createMode ? <CreateFlashcard /> : <FlashcardProvider deck={deck} />}</div>
}

export default Deck