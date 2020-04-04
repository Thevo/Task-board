import Board from './src/js/board'
import { v4 as uuidv4 } from 'uuid'
import 'normalize.css/normalize.css'
import './src/sass/style.scss'

window.onload = function() {
    function checkId() {
        if (localStorage.getItem('id') === null) {
            localStorage.setItem('id', uuidv4())
        } else {
            new Board(localStorage.getItem('id')).render()
        }
    }

    checkId()
}
