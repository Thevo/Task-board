import Card from './card'

export default class Board {
    constructor(id) {
        this.id = id
        this.main = document.querySelector('.main')
        this.data = {
            board: {
                title: 'Trello board ',
                columns: [],
            },
        }
        this.addList()
    }

    addList() {
        const button = document.createElement('button')
        button.classList.add('board__add-card')
        button.innerText = '+ Add new list'
        this.main.appendChild(button)

        const newList = {
            title: 'New list',
            cards: [],
        }

        button.addEventListener('click', () => {
            this.addColumn(newList)
            this.data.board.columns.push(newList)
            this.updateBoard()
        })
    }

    setTitle(title) {
        document.querySelector('.header__title').innerText = title
            ? title
            : this.data.board.title
    }

    addColumn(column) {
        const dots = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`
        const newList = document.querySelector('.board__add-card')
        const board = document.createElement('div')
        const boardHeader = document.createElement('div')
        const list = document.createElement('ul')
        const newCard = document.createElement('button')

        list.classList.add('board__list')
        board.classList.add('board')
        boardHeader.classList.add('board__header')

        newCard.classList.add('board__add-card')
        newCard.innerText = '+ Add new card'
        newCard.addEventListener('click', () => {
            list.appendChild(
                new Card('New card', 'Card content').getCard()
                
            )
        })

        if (column) {
            boardHeader.innerHTML = `
                <h2 class="board__title">${
                    column ? column.title : 'Column'
                }</h2>
                <button class="board__opt">${dots}</button>

            `

            column.cards &&
                column.cards.forEach(card => {
                    list.appendChild(
                        new Card(card.title, card.content).getCard()
                    )
                })
        }

        this.main.insertBefore(board, newList)
        board.appendChild(boardHeader)
        board.appendChild(list)
        list.appendChild(newCard)
    }

    updateBoard() {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://jsonbase.com/demo_bucket/${this.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data),
            }
        )
    }

    newBoard() {
        this.updateBoard.then(() => {
            this.setTitle()
            this.addColumn()
        })
    }

    fetchBoard() {
        fetch(
            `https://cors-anywhere.herokuapp.com/https://jsonbase.com/demo_bucket/${this.id}`
        )
            .then(result => {
                return result.json()
            })
            .then(json => {
                this.data = json

                this.setTitle(this.data.board.title)
                this.data.board.columns.forEach(column => {
                    this.addColumn(column)
                })
            })
    }
}
