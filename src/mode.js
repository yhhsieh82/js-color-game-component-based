import Component from './component.js';

import './mode.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Mode extends Component {
    static getRootClass() {
        return '.mode';
    }

    constructor(root) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        if(root.innerHTML === "Easy") {
            this.mode = 0;
        }
        else if(root.innerHTML === "Hard") {
            this.mode = 1;
        }
        else {
            this.mode = 2;
        }
        this.reset();
    }

    reset() {
        //not current mode, it is for identifying
    }


    handleDomClick(e) {
        //tell the upper what is the current mode
        this.fire('click', this.mode);
    }

    lightUp() {
        this.root.style.color = "#FFFFFF";
        this.root.style.background = "#4682B4";
    }

    lightDown() {
        this.root.style.color = "#484848";
        this.root.style.background = "#FFFFFF";
    }

    mode() {
        return this.mode;
    }
}