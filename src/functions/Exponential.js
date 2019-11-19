import { Function } from './Function';
import { easeExpIn, easeExpOut, easeExpInOut } from 'd3-ease';

/**
 * Creates an ease "exponential" curve.
 * @extends Function
 * @param {object} [options] Optional properties of the function
 * @param {string} [options.variation] The contour of the function (see https://easings.net)
 */

export class Exponential extends Function {

    constructor(options) {

        const {
            variation
        } = options;

        super({ ...options });

        this.type = 'exponential';
        this.fn = null;

        this.setVariation(variation);

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
            case 'in': this.fn = easeExpIn; break;
            case 'out': this.fn = easeExpOut; break;
            case 'in-out': this.fn = easeExpInOut; break;
            default: break;
        }

    }

}