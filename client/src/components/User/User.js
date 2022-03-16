import React, { useEffect, useState } from "react"
import { Button, Stack, TextField, Container, MenuItem } from "@mui/material"
import axios from "axios"
import { useAuth } from "../Auth/AuthProvider"

const User = ({ userId, userN }) => {
  const { auth } = useAuth()
  const [decks, setDecks] = useState(null)

  useEffect(() => {
    if (auth) {
      axios
        .get(`http://localhost:8000/users/${auth.user}`, {
          headers: { authorization: `Bearer ${auth.token}` },
        })
        .then((response) => {
          const userDecks = response.data.decks.map((deck) => {
            return {
              id: deck._id,
              name: deck.name,
            }
          })
          setDecks(userDecks)
        })
    }
  }, [auth])

  

  if (!decks) {
    return <span>Loading...</span>
  }

  return (
    <Container maxWidth="md">
      <Stack component="form" sx={{ mt: 1 }}>
        <TextField
          id="deck"
          name="deck"
          select
          label="Deck"
          helperText="Please select your currency"
          autoFocus
        >
          {decks.map((deck) => (
            <MenuItem key={deck.id} value={deck.id}>
              {deck.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Container>
  )
}

export default User
