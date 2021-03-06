import { Function } from './Function';
import { easeBackIn, easeBackOut, easeBackInOut } from 'd3-ease';

/**
 * Creates an "ease back" function.
 * @extends Function
 * @param {object} [options] Optional properties of the function
 * @param {string} [options.variation] The contour of the function (see https://easings.net)
 * @param {number} [options.overshoot] The degree to which the function "overshoots"
 */

export class Back extends Function {

    constructor(options) {

        const {
            variation,
            overshoot
        } = options;

        super({ ...options });

        this.type = 'back';
        this.fn = null;

        this.setOvershoot(overshoot);
        this.setVariation(variation);

    }

    setOvershoot(s = 1.70158) {

        this.overshoot = s;
        this.setFunction();

    }

    /**
     * Sets the easing variation. See https://easings.net/
     * @param {string} variation The curve variation ('in', 'out', or 'in-out')
     */

    setVariation(variation = 'in') {

        if (variation === 'in' || variation === 'out' || variation === 'in-out') {

            this.variation = variation;
            this.setFunction();

        } else {

            console.warn("variation must be 'in', 'out', or 'in-out'");

        }

    }

    /**
     * Assigns a function to this class that maps input to output
     */

    setFunction() {

        switch (this.variation) {
            case 'in': this.fn = easeBackIn.overshoot(this.overshoot); break;
            case 'out': this.fn = easeBackOut.overshoot(this.overshoot); break;
            case 'in-out': this.fn = easeBackInOut.overshoot(this.overshoot); break;
            default: break;
        }

    }

}