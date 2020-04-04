import Card from './card'

export default class Board {
    constructor(id) {
        this.id = id
        this.data
    }

    getData() {
        fetch(
            `https://cors-anywhere.herokuapp.com/https://jsonbase.com/demo_bucket/${this.id}`
        )
            .then(result => {
                return result.json()
            })
            .then(json => {
                this.data = json
                console.log(this.data);
                
            })
    }

    render() {
        this.getData()
    }
}
