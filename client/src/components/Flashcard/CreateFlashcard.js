import React, { useState } from "react"
import { Button, Stack, TextField } from "@mui/material"
import axios from "axios"

const CreateFlashcard = ({ userId, deckId }) => {
  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({
    frontImage: false,
    frontText: false,
    backImage: false,
    backText: false
  })

  // returns falsy value if everything is ok
  // https://stackoverflow.com/questions/59813926/usestate-to-update-multiple-values-in-react
  function validateProperty(fieldName, fieldValue) {
    if (!fieldValue.trim(" ")) {
      setErrors({ ...errors, [fieldName]: true })
    } else {
      setErrors({ ...errors, [fieldName]: false })
    }
  }

  const handleChange = event => {
    event.preventDefault()
    validateProperty(event.target.name, event.target.value)
    const currentValues = formValue
    currentValues[event.target.name] = event.target.value
    setFormValue(currentValues)
  }

  const handleSubmit = async event => {
    console.log("[CreateFlashcard] onSubmit ", event)
    event.preventDefault()
    // make that network request
    // extra validation step
    axios
      .post(`http://localhost:8000/decks/${deckId}/cards`, formValue, {
        headers: { user: userId }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <span>
        Form values: {formValue.frontText} &amp; {formValue.backText}
      </span>
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        onChange={handleChange}
        autoFocus
        error={errors.frontImage}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
        onChange={handleChange}
        error={errors.frontText}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
        onChange={handleChange}
        error={errors.backImage}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
        onChange={handleChange}
        error={errors.backText}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
