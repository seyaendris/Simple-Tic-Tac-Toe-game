const gameBoard= document.querySelector("#gameboard")
//This line selects the HTML element with the id of gameboard using document.querySelector and assigns it to a //constant variable gameBoard.

const infoDisplay= document.querySelector("#info")
//This line selects the HTML element with the id of info using document.querySelector and assigns it to a constant variable infoDisplay.

const startCells= [
    "","","","","","","","",""
]
let go = "circle"
//This line initializes a variable go to the string "circle", which represents whose turn it currently is.

infoDisplay.textcontent = "circle goes first"
//This line sets the textContent property of the infoDisplay element to the string "circle goes first", which will display the starting message in the HTML.

function createBoard() {
    startCells.forEach((_cell, index) => {
      const cellElement = document.createElement('div')
       cellElement.classList.add('square')
       cellElement.id = index 
       cellElement.addEventListener("click", addgo)
       gameBoard.append(cellElement)
    })
}
//This function creates the initial game board by iterating over the startCells array and creating a new div element for each cell using document.createElement. It sets the class attribute to "square", the id attribute to the corresponding index value of the cell in the array, and adds an event listener for the "click" event that calls the addgo function. The new cell element is then appended to the gameBoard element using gameBoard.append.

createBoard()
function addgo(e) {
     const goDisplay = document.createElement("div")
     goDisplay.classList.add(go)
     e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s go."
    e.target.removeEventListener("click", addgo)
    checkScore()
}
//This function is called whenever a cell is clicked, and adds the current player's game piece to the cell using document.createElement to create a new div element with the appropriate class ("circle" or "cross") and appends it to the clicked cell using e.target.append. It then updates the go variable to the next player's turn, updates the message displayed in the infoDisplay element using textContent, removes the event listener for the clicked cell using e.target.removeEventListener, and calls the checkScore function to determine if there is a winner.

function checkScore() {
    const allSquare = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquare[cell].firstChild?.classList.contains("circle"))

        if(circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquare[cell].firstChild?.classList.contains("cross"))

        if(crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}


