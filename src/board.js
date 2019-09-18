import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color, mode) {
        super(root);

        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.countDownDisplay = root.querySelector('#count_down');
        this.reset(color, mode);
    }


    reset(color, mode) {
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        if( mode === 2 ) {
            //this.countDownDisplay = this.root.querySelector('#count_down');
            this.countDownDisplay.textContent = "5";
        }
        else {
            //this.countDownDisplay = this.root.querySelector('#count_down');
            this.countDownDisplay.textContent = "";
        }
    }

    // countDown() {
    //     //set a timer interval
    //     var timer = setInterval(this.showRemainedTime.bind(this), 1000, timer);
    // }

    // showRemainedTime(timer) {
    //     // this.countDownDisplay = this.root.querySelector('#count_down');
    //     let time = Number(this.countDownDisplay.textContent);
    //     time -= 1;
    //     this.countDownDisplay.textContent = time.toString();
    //     if ( time === 0 ) {
    //         clearInterval(timer);
    //         this.fire('timeEnd', timer);
    //     }
    // }
    doSetTimeout(index) {
        let timer = setTimeout(this.showRemainedTime.bind(this), 1000, index);
        //clearTimeout(timer);
    }

    countDown(){
        for (let i = 1; i < 6; i++) {
            setTimeout(this.showRemainedTime.bind(this), i*1000, 5-i);
        }

        setTimeout(this.fireTimeEnd.bind(this), 5.1*1000);
    }

    fireTimeEnd(){
        this.fire('timeEnd');
    }

    showRemainedTime(time) {
        this.countDownDisplay.textContent = time.toString();
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = "Correct!";
    }

    showWrongMessage() {
        this.messageDisplay.textContent = "Try Again";
    }

    showTimeOutMessage() {
        this.messageDisplay.textContent = "Time Out!";
    }


}
