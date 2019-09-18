import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root, mode) {
        super(root);

        this.gameOver = false;
        this.cards = [];

        //between DOM and the html element:method 1
        // let els2 = root.querySelectorAll(Card.getRootClass());
        // let els = [];
        // if (mode === 0) {
        //     // els = els2.slice(0, 3);
        //     for (let i = 0; i < 3; i++) {
        //       els.push(els2[i]); 
        //     }
        // }

        // for (let el of els) {
        //     const card = new Card(el);
        //     //when getting the fire from the card 
        //     card.on('click', this.handleCardClick.bind(this));
        //     this.cards.push(card);
        // }

        //method 2
        let els = root.querySelectorAll(Card.getRootClass());
        if (mode === 0) {
            if (els.length === 6) {
                for (let i = 3; i < 6 ; i++) {
                    root.removeChild(els[i]);
                }
            }
        }
        else {
            if (els.length === 3) {
                for (let i = 3; i < 6 ; i++) {
                    let div = document.createElement("div");
                    div.className += "card";
                    root.appendChild(div);
                }
                els = root.querySelectorAll(Card.getRootClass());
            } 
        }

        for (let el of els) {
            const card = new Card(el);
            //when getting the fire from the card 
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }

        this.pickedColor = this.pickColor();
    }

    reset() {
        this.gameOver = false;
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    fadoOutAllCards() {
        for (let card of this.cards)
                card.fadeIn("#FFF");
        this.gameOver = true;
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }
}
