import Component from './component.js';
import Mode from './mode.js';
import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.currentMode = 0;
        this.brand = root.querySelector('.brand');

        let els = root.querySelectorAll(Mode.getRootClass());
        this.modes = [];
        for (let el of els) {
            const mode = new Mode(el);
            //when getting the fire from the mode 
            mode.on('click', this.handleModeClick.bind(this));
            this.modes.push(mode);
        }
    
        this.reset();
    }

    reset() {
        this.lightCurrentMode(this.currentMode);
    }

    handleModeClick(firer, mode) {
        this.currentMode = mode;
        this.lightCurrentMode(this.currentMode);
        if(this.currentMode === 0) {
            this.fire('easyClick');
        }
        else if(this.currentMode === 1) {
            this.fire('hardClick');
        }
        else {
            this.fire('nightClick');
        }
    }
    
    lightCurrentMode(mode) {
        this.modes[mode].lightUp();
        this.modes[(mode+1)%3].lightDown();
        this.modes[(mode+2)%3].lightDown();
    }

    
}
