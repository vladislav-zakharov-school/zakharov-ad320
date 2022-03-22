import React, { useEffect, useState } from "react"
import { Container, MenuItem } from "@mui/material"
import axios from "axios"
import { useAuth } from "../Auth/AuthProvider"

const User = ({ userId, userN }) => {
  const { auth } = useAuth()
  const [decks, setDecks] = useState()

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

  console.log(auth.user)

  return (
    <Container maxWidth="md">
        <div>
            {auth.user}
        </div>
        {decks.map((deck) => (
          <MenuItem key={deck.id} value={deck.id}>
            {deck.name}
          </MenuItem>
        ))}
    </Container>
  )
}

export default User
