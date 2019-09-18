import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);
        //current mode is keep at the navbar
        this.navbar = new Navbar(root.querySelector('.navbar'));

        //i should put the button under the navbar!
        this.navbar.on('easyClick', this.handleNavbarModeClick.bind(this));
        this.navbar.on('hardClick', this.handleNavbarModeClick.bind(this));
        this.navbar.on('nightClick', this.handleNavbarModeClick.bind(this));


        this.deck = new Deck(root.querySelector('.deck'), this.navbar.currentMode);
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor(), this.navbar.currentMode);
        this.board.on('timeEnd', this.handleTimeEnd.bind(this));

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleNavbarModeClick(){
        //this.easy.lightCurrentMode();
        //this.deck = new Deck(root.querySelector('.deck'), this.navbar.currentMode);

        //method 1:
        this.deck = new Deck(this.root.querySelector('.deck'), this.navbar.currentMode);
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.handleRestClick();
    }

    

    handleTimeEnd(timer) {
        // clearInterval(timer);  
        this.root.style.backgroundColor = this.deck.pickedColor;
        this.board.showTimeOutMessage();
        this.deck.fadoOutAllCards();
        this.reset.showPlayAgain();
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleRestClick() {
        this.root.style.backgroundColor = "#232323";
        this.navbar.reset();
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor(), this.navbar.currentMode);
        this.reset.reset();
        if ( this.navbar.currentMode === 2 ) {
            this.board.countDown();
        }
    }

    
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body); 
};
