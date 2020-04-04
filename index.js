import Board from './src/js/board'
import { v4 as uuidv4 } from 'uuid'
import 'normalize.css/normalize.css'
import './src/sass/style.scss'

window.onload = function() {
    if (localStorage.getItem('id') === null) {
        const id = uuidv4()
        localStorage.setItem('id', id)
        new Board(id).newBoard()
    } else {
        new Board(localStorage.getItem('id')).fetchBoard()
    }
}
