// Import packages and files
import express from 'express'
import cors from 'cors'
import handlerFunctions from './controller.js'

// Setup express instance
const app = express()

// Setup middleware
app.use(express.json())
app.use(cors())
app.use(express.static('src'))

// ENDPOINTS GO HERE
app.get('/drinks', handlerFunctions.getAllDrinks)

app.post('/newDrink', handlerFunctions.addDrink)

app.delete('/drink/:id', handlerFunctions.deleteDrink)

app.put('/drink/:id', handlerFunctions.editDrink)



// Open server using app.listen
app.listen(2319, () => console.log("Server running at http://localhost:2319"))
