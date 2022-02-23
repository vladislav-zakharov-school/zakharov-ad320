import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Deck } from "./models/Deck.js";
import { User } from "./models/User.js";

const app = express();
const port = 8000;

// Connect to MongoDB
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bf91m.mongodb.net/notoriety?retryWrites=true&w=majority`;

try {
  await mongoose.connect(connectionString);
} catch (err) {
  console.log("error ", err);
}

// Middleware

const exampleMiddleware = (req, res, next) => {
  console.log("example middleware");
  next();
};

app.use(cors());
app.use(express.json());
app.use(exampleMiddleware);

// Helper functions
// User exists
async function userExists(id) {
  let user;
  try {
    user = await User.findById(id);
    return user;
  } catch (err) {
    console.log("error ", err);
    return user;
  }
}
async function deckExists(id) {
  let deck;
  try {
    deck = await Deck.findById(id);
    return deck;
  } catch (err) {
    console.log("error ", err);
    return deck;
  }
}
function cardExists(deck, card_id) {
  try {
    const card = deck.cards.id(card_id);
    return card;
  } catch (err) {
    console.log("error ", err);
    return card;
  }
}

// Get an individual card by id
app.get("/decks/:deck_id/cards/:card_id", async (req, res) => {
  let deck = await deckExists(req.params.deck_id);
  if (deck) {
    let card = await cardExists(deck, req.params.card_id);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(400).send("No such card!");
    }
  } else {
    res.status(400).send("No such deck!");
  }
});

// TODO
// Get all cards for a deck, with the option to paginate results
app.get("/decks/:id", async (req, res) => {
  let deck = await deckExists(req.params.id);
  if (deck) {
    res.status(200).send(deck.cards);
  } else {
    res.status(400).send("No such deck!");
  }
});

// Get a deck by id
app.get("/decks/:id", async (req, res) => {
  let deck = await deckExists(req.params.id);
  if (deck) {
    res.status(200).send(deck);
  } else {
    res.status(404).send("No such deck!");
  }
});

// Get a deck by user
app.get("/users/:id/deck", async (req, res) => {
  let user = await userExists(req.params.id);
  if (user) {
    let deck = await deckExists(user.deckId);
    if (deck) {
      res.status(200).send(deck);
    } else {
      res.status(404).send("No such deck!");
    }
  } else {
    res.status(404).send("No such user!");
  }
});

// Create a deck
app.post("/users/:id/decks", async (req, res) => {
  if (!req.body.name) {
    red.status(400).send("No name for the deck of cards");
  }

  let user = await userExists(req.params.id);
  if (user) {
    if (!user.deckId) {
      const deck = new Deck({
        name: req.body.name,
        cards: [],
        size: 0,
        userId: user._id,
      });

      try {
        await deck.save();
      } catch (err) {
        console.log("error ", err);
        res.status(400).send("Failed while saving deck!");
      }

      user.deckId = deck._id;

      try {
        await user.save();
      } catch (err) {
        console.log("error ", err);
        res.status(400).send("Failed while updating user!");
      }

      res.sendStatus(200);
    } else {
      res.status(400).send("This user already has a deck!");
    }
  } else {
    res.status(400).send("No such user!");
  }
});

// Create a card
app.post("/decks/:id/cards", async (req, res) => {
  const cardRequest = req.body;

  if (
    (!cardRequest.frontImage && !cardRequest.frontText) ||
    (!cardRequest.backImage && !cardRequest.backText)
  ) {
    res.status(400).send("Card data incomplete");
  }

  // isUrl is not imported?
  //   if ((cardRequest.frontImage && !isUrl(cardRequest.frontImage)) || (cardRequest.backImage && !isUrl(cardRequest.backImage))) {
  //     res.status(400).send("Image fields must be valid URLs");
  //   }

  if (!req.params.id) {
    res.status(400).send("Deck ID is required");
  }

  let deck = await deckExists(req.params.id);
  if (deck) {
    try {
      deck.cards.push({
        frontImage: cardRequest.frontImage,
        frontText: cardRequest.frontText,
        backImage: cardRequest.backImage,
        backText: cardRequest.backText,
      });

      deck.size = deck.size + 1;

      await deck.save();
    } catch (err) {
      console.log("error ", err);
      res.status(404).send("Failed to push card to the deck!");
    }
  } else {
    res.status(404).send("No such deck!");
  }

  res.sendStatus(200);
});

// Create a user
app.post("/users", async (req, res) => {
  const userRequest = req.body;

  if (!userRequest.name) {
    res.status(400).send("Empty JSON name for user!");
  }

  if (userRequest.deckId) {
    let deck = await deckExists(userRequest.deckId);
    if (deck) {
    } else {
      res.status(400).send("Provided deckId is invalid!");
    }
  }

  const user = new User({
    name: userRequest.name,
    deckId: userRequest.deckId,
  });

  user.save((err) => {
    if (err) {
      res.status(400).send("Failed to save user!");
    }
  });
  res.sendStatus(200);
});

// Update a card
app.put("/decks/:deck_id/cards/:card_id", async (req, res) => {
  const cardRequest = req.body;

  if (
    (!cardRequest.frontImage && !cardRequest.frontText) ||
    (!cardRequest.backImage && !cardRequest.backText)
  ) {
    res.status(400).send("Card data incomplete");
  }

  //   if (
  //     (cardRequest.frontImage && !isUrl(cardRequest.frontImage)) ||
  //     (cardRequest.backImage && !isUrl(cardRequest.backImage))
  //   ) {
  //     res.status(400).send("Image fields must be valid URLs");
  //   }

  if (!req.params.deck_id) {
    res.status(400).send("Deck ID is required");
  }

  let deck = await deckExists(req.params.deck_id);
  if (deck) {
    let card = cardExists(deck, req.params.card_id);
    if (card) {
      card.frontImage = cardRequest.frontImage;
      card.frontText = cardRequest.frontText;
      card.backImage = cardRequest.backImage;
      card.backText = cardRequest.backText;
      await deck.save((err) => {
        if (err) {
          res.status(400).send("Failed to save the deck!");
        }
      });
    } else {
      res.status(400).send("No such card!");
    }
  } else {
    res.status(400).send("No such deck!");
  }
  res.sendStatus(200);
});

// Delete a card
app.delete("/decks/:deck_id/cards/:card_id", async (req, res) => {
  let deck = await deckExists(req.params.deck_id);
  if (deck) {
    let card = cardExists(deck, req.params.card_id);
    if (card) {
      deck.cards.id(card._id).remove();
      deck.size = deck.size - 1;
      await deck.save((err) => {
        if (err) {
          res.status(400).send("Failed to save the deck!");
        }
      });
    }
  } else {
    res.status(404).send("No such deck!");
  }
  res.sendStatus(200);
});

// Delete a deck and all associated cards
app.delete("/decks/:id", async (req, res) => {
  let deck = await deckExists(req.params.id);

  if (deck) {
    let user = await userExists(deck.userId);
    if (user) {
      user.deckId = null;
    } else {
      res.status(400).send("No user associated with that deck!");
    }
    await user.save((err) => {
      if (err) {
        res.status(400).send("Failed to save user!");
      }
    });
    deck.cards = [];
    deck.size = 0;
    await deck.save((err) => {
      if (err) {
        res.status(400).send("Failed to delete all cards!");
        console.log(err);
      }
    });
    Deck.deleteOne(deck, (err) => {
      if (err) {
        res.status(400).send("Failed while deleting deck!");
      }
    });
  } else {
    res.status(400).send("No such deck!");
  }
  res.sendStatus(200);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  let user = await userExists(req.params.id);
  if (user) {
    let deck = await deckExists(user.deckId);
    if (deck) {
      Deck.deleteOne(deck, (err) => {
        if (err) {
          res.status(400).send("Failed while deleting deck!");
        }
      });
    }
    User.deleteOne(user, (err) => {
      if (err) {
        res.status(400).send("Failed while deleting user!");
      }
    });
  } else {
    res.status(400).send("No such user!");
  }
  res.sendStatus(400);
});

// END
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
