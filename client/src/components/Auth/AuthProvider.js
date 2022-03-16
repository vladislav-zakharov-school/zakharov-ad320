import React, { useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)

    const login = async (email, password, callback) => { 
        console.log("[Login]")
        try{
            const authResponse = await axios.post(
                'http://localhost:8000/auth/login', 
                { email: email, password: password }, 
                { 'content-type': 'application/json' }
            )
            const decoded = jwt(authResponse.data.token)
            setAuth({ token: authResponse.data.token, user: decoded.user })
            console.log(auth.token)
            callback()
        } catch (err) {
            console.log(`Login error ${err}`)
            callback(err)
        }
    }

    const register = async (firstName, lastName, email, password, callback) => { 
        // Assignment: how do we register someone?
        console.log("[Register]")
        try{
            const authResponse = await axios.post(
                'http://localhost:8000/auth/register',
                {   
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                },
                { 'content-type': 'application/json' }
            )
            const decoded = jwt(authResponse.data.token)
            setAuth({ token: authResponse.data.token, user: decoded.user})
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token
            console.log('Bearer ' + auth.token)
            try{
                const res = await axios.post(
                    'http://localhost:8000/decks/createDeck',
                    {
                        userId: auth.user,
                        deck: {
                            name: 'demo deck'
                        }
                    },
                    { 'content-type': 'application/json'}
                )
                console.log("[Demo Deck]")
            } catch (err) {
                console.log(`Failed while creating a demo deck ${err}`)
            }
            callback()
        } catch (err) {
            console.log(`Register error ${err}`)
            callback(err)
        }
    }

    const authCtx = {
        auth: auth,
        login: login,
        register: register
    }

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const authContext = React.useContext(AuthContext)
    return authContext
}

export default AuthProvider