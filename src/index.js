console.log('javascript connected')

// select element where drinks will be displayed
const drinkDisplay = document.querySelector('#drinkDisplay')

// function to create dynamic html for each element in an array
const displayAllDrinks = (arr) => {
    // clears anything that is currently displayed
    drinkDisplay.innerHTML = ``

    arr.forEach((el) => {
        // create element for each item in array
        const drinkCard = document.createElement('section')

        // builds html to be included in drinkCard
        // dynamically assigns values based on array elements
        // Delete Me button creates onclick listener for deleteDrink function, passing in the id of the current element
        drinkCard.innerHTML = `
            <img src=${el.imageUrl} alt='drink picture'/>
            <p>${el.name}</p>

            <section>
                <button>-</button>
                Popularity: ${el.popularity}
                <button>+</button>
            </section>

            <br/>
            <br/>

            <button onclick="deleteDrink(${el.id})">Delete Me</button>

            <br/>
            <br/>
    `
        // adds card to drink display
        drinkDisplay.appendChild(drinkCard)
    })
}

// Builds function to get all items from server
const allDrinks = () => {
    axios.get('http://localhost:2319/drinks').then((response) => {
        console.log(response.data)

        // runs the displayAllDrinks function, passing in the response data from the server as the argument
        displayAllDrinks(response.data)
    })
}

// Builds function to handle the submission of the form
const handleSubmit = (event) => {
    // stops the form from refreshing the page on submission
    event.preventDefault()

    // selects input fields from HTML
    const drinkName = document.querySelector('#drinkName')
    const drinkPicture = document.querySelector('#drinkPicture')

    // creates body object to be sent with axios request
    const bodyObj = {
        // assigns values from input fields
        name: drinkName.value,
        imageUrl: drinkPicture.value
    }

    // sends post request to server, along with the body object
    axios.post('http://localhost:2319/newDrink', bodyObj).then((response) => {
        console.log(response.data)

        // runs the displayAllDrinks function, passing in the response data from the server as the argument
        displayAllDrinks(response.data)
    })
}

// adds submit listener to the form on HTML
document.querySelector('form').addEventListener('submit', handleSubmit)

// Builds function to delete an item from the server's data
const deleteDrink = (id) => {
    // sends delete request, and dynamically adds id in endpoint
    axios.delete(`http://localhost:2319/drink/${id}`).then((response) => {
        console.log(response.data)

        // runs the displayAllDrinks function, passing in the response data from the server as the argument
        displayAllDrinks(response.data)
    })
}

// Runs the allDrinks function so initial display happens as soon as the page loads
allDrinks()