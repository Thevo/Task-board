export default class Card {
    constructor(title, content) {
        this.title = title
        this.content = content
        // console.log(this)
    }

    getCard() {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        li.classList.add('board__card')
        h3.classList.add('board__card-title')
        p.classList.add('board__card-content')

        h3.innerText = this.title
        p.innerText = this.content

        li.appendChild(h3)
        li.appendChild(p)

        return li
    }

    // TODO
    deleteCard() {}

    // TODO
    updateCard() {}
}
