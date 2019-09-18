import Component from './component.js';

import './reset.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Reset extends Component {
    static getRootClass() {
        return '.reset';
    }

    constructor(root) {
        super(root);

        //fire an event for the main.js to coordinate other
        root.addEventListener("click", this.handleDomClick.bind(this));
        this.resetDisplay = root.querySelector(".reset span");
        this.reset();
    }

    reset() {
        this.resetDisplay.textContent = "New Color";
    }

    showPlayAgain() {
        this.resetDisplay.textContent = "Play Again";
    }

    handleDomClick(e) {
        this.fire('click');
    }
}
