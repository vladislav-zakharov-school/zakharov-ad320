import React from "react"
import { Button, Stack, TextField } from "@mui/material"

const CreateFlashcard = ({ deckId }) => {
  const handleChange = (event) => {
    console.log("[CreateFlashcard] onChange ", event)
  }
  
  const handleSubmit = (event) => {
    console.log("[CreateFlashcard] onSubmit ", event)
    event.preventDefault()
    // make that network request
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
