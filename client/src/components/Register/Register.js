import React, { useState } from "react"
import {
  Button,
  Box,
  TextField,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material"
import { useAuth } from "../Auth/AuthProvider"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  let [err, setErr] = useState(null)
  // Assignment: use the useAuth hook here to handle registering a new user
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
    register(data.get("email"), data.get("password"), (err) => {
      if (err) {
        setErr(err)
      } else {
        navigate("/login", { replace: true })
      }
    })
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
      {err === null ? (
        err = null
      ) : (
        <Alert severity="error">
          <AlertTitle>Failed To Register</AlertTitle>
        </Alert>
      )}
    </Box>
  )
}

export default Register