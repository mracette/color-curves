import { Curve } from '../core/Curve';
import { Arc } from '../geometries/Arc';
import { Linear } from '../functions/Linear';
import { Polynomial } from '../functions/Polynomial';
import { Sinusoidal } from '../functions/Sinusoidal';
import { Exponential } from '../functions/Exponential';
import { Elastic } from '../functions/Elastic';
import { Back } from '../functions/Back';
import { Bounce } from '../functions/Bounce';

import { cartToPolar, radToDeg } from '../utils/math';
import { hslToRgb, rgbToHex, printRgb, printHsl } from '../utils/color';
import { validJson } from '../utils/common';

/**
 * A continuous color palette created by overlaying curves onto surfaces in the HSL color space.
 * 
 * A ColorPalette has exactly two curves. The "hs" curve maps to hue and saturation values and lies in a unit circle
 * in the HS space. The "l" curve maps it's y-coordinate to lightness, and lies in a unit square in the L space.
 */

export class ColorPalette {

    /**
     * Creates a new Color Palette.
     * @param {object|string} [hsCurve] The curve object or curve type of the "hs" curve
     * @param {object|string} [lCurve] The curve object or curve type of the "l" curve
     * @param {object} [options = {}] Optional properties of the color palette
     * @param {number} [options.start] Starts the palette at a certain point along the curve
     * @param {number} [options.end] Ends the palette at a certain point along the curve
     */

    constructor(hsCurve, lCurve, options = {}) {

        this.setHsCurve(validJson(hsCurve) || hsCurve);
        this.setLCurve(validJson(lCurve) || lCurve);
        this.updateCurveClampBound();

        const {
            start,
            end,
            name,
            author
        } = (validJson(options) || options);

        this.setStart(start);
        this.setEnd(end);
        this.setName(name);
        this.setAuthor(author);

    }

    static getParamSet() {

        return ['start', 'end', 'name', 'author'];

    }

    /**
     * Sets a name for this palette
     * @param {string} [name] A name for this palette
     */
    setName(name) {

        if (typeof name === 'string') {

            this.name = name;

        } else {

            this.name = null;

        }

    }

    /**
     * Sets a name for this palette
     * @param {string} [author] A name for this palette
     */
    setAuthor(author) {

        if (typeof author === 'string') {

            this.author = author;

        } else {

            this.author = null;

        }

    }

    /**
     * Sets the "hs" (hue-saturation) curve for this palette.
     * @param {object|string} [hsCurve] An object or string describing the "hs" curve. See {@link Curve}
     * @param {boolean} [applyDefaults = false] If true, applies default params to the new curve. If false, keeps params from 
     * previous curve.
     */

    setHsCurve(hsCurve, applyDefaults = false) {

        const currentParams = (applyDefaults || !this.hsCurve) ?
            {} : JSON.parse(this.exportPaletteParams(null, 'hsCurve'));

        if (hsCurve && hsCurve.isCurve) {

            if (hsCurve.surface.type === 'unitCircle') {

                this.hsCurve = hsCurve;

            } else {

                console.error("Due to the nature of the HSL colorspace, the hsCurve is required to have a surface of type 'unitCircle'.")

            }

        } else if (typeof hsCurve === 'object') {

            this.hsCurve = this.initializeCurve(hsCurve.type, { surface: 'unitCircle', ...currentParams, ...hsCurve });

        } else if (typeof hsCurve === 'string') {

            this.hsCurve = this.initializeCurve(hsCurve, { surface: 'unitCircle', ...currentParams });

        } else {

            this.hsCurve = this.initializeCurve('exponential', { surface: 'unitCircle' });

        }

    }

    /**
     * Sets the "l" (lightness) curve for this palette.
     * @param {object|string} [lCurve] An object or string describing the "hs" curve. See {@link Curve}
     * @param {boolean} [applyDefaults = false] If true, applies default params to the new curve. If false, keeps params from 
     * previous curve.
     */

    setLCurve(lCurve, applyDefaults = false) {

        const currentParams = (applyDefaults || !this.lCurve) ?
            {} : JSON.parse(this.exportPaletteParams(null, 'hsCurve'));

        if (lCurve && lCurve.isCurve) {

            if (lCurve.surface.type === 'unitSquare') {

                this.lCurve = lCurve;

            } else {

                console.error("Due to the nature of the HSL colorspace, the lCurve is required to have a surface of type 'unitSquare'.")

            }

        } else if (typeof lCurve === 'object') {

            this.lCurve = this.initializeCurve(lCurve.type, { surface: 'unitSquare', ...currentParams, ...lCurve });

        } else if (typeof lCurve === 'string') {

            this.lCurve = this.initializeCurve(lCurve, { surface: 'unitSquare', ...currentParams });

        } else {

            this.lCurve = this.initializeCurve('linear', { surface: 'unitSquare' });

        }

    }

    /**
     * Returns a JSON representation of this palette, including representations for each of its curves and the palette itself.
     * The returned string consists of three comma-separated JSON objects which map to hsCurve, lCurve, and paletteParams in the ColorPalette constructor.
     * @param {number} [precision] The number of decimals to include in numerical parameters.
     * @param {string} [subset] Either 'palette', 'hsCurve', or 'lCurve'. Specifies a subset of parameters to export. 
     * @returns {string} The JSON representation of this palette.
     */

    exportPaletteParams(precision, subset) {

        const p = precision || 3;

        // helper function to convert params to fixed digits
        const pDigits = (x) => {

            switch (typeof x) {
                case 'number': return parseFloat(x.toFixed(p));
                case 'object': return Object.assign({}, ...Object.entries(x).map(([k, v]) => ({ [k]: pDigits(v) })));
                default: return x;
            }

        }

        // get the set of all curve params, and make a collection of defined params for each curve
        const curveParamsSet = Curve.getParamSet();

        const lCurveParams = {};
        const hsCurveParams = {};

        curveParamsSet.forEach((param) => {

            if (this.hsCurve[param] !== undefined && this.hsCurve[param] !== null) {

                (hsCurveParams[param] = pDigits(this.hsCurve[param]));

            }

            if (this.lCurve[param] !== undefined && this.lCurve[param] !== null) {

                (lCurveParams[param] = pDigits(this.lCurve[param]));

            }

        });

        // get the set of all palette params, and make a collection of defined params for this palette
        const paletteParamsSet = ColorPalette.getParamSet();

        const paletteParams = {};

        paletteParamsSet.forEach((param) => {

            if (this[param] !== undefined && this[param] !== null) {

                (paletteParams[param] = pDigits(this[param]));

            }

        });

        switch (subset) {
            case 'palette': return JSON.stringify(paletteParams); break;
            case 'hsCurve': return JSON.stringify(hsCurveParams); break;
            case 'lCurve': return JSON.stringify(lCurveParams); break;
            default: return `
            '${JSON.stringify(hsCurveParams)}', \
            '${JSON.stringify(lCurveParams)}', \
            '${JSON.stringify(paletteParams)}'`;
                break;
        }

    }

    /**
     * Sets the start point for the palette's curves
     * @param {number} [start] A number in the range [0, 1]. Not to exceed the palette's end point.
     */

    setStart(start) {

        if (typeof start === 'number') {

            this.start = start;

        } else {

            this.start = 0;

        }

    }

    /**
     * Sets the end point for the palette's curves
     * @param {number} [end] A number in the range [0, 1]. Not to be exceeded by the palette's start point.
     */

    setEnd(end) {

        if (typeof end === 'number') {

            this.end = end;

        } else {

            this.end = 1;

        }

    }

    /**
     * Draws a representation of the palette using evenly spaced stops.
     * @param {object} canvas An HTML canvas on which to draw the palette.
     * @param {number} numStops The number of distinct colors to use in the drawing.
     */

    drawDiscretePalette(canvas, numStops) {

        this.updateCurveClampBound();

        const ctx = canvas.getContext('2d');
        const stops = numStops || 12;

        for (let i = 0; i < stops; i++) {

            // get hsl values
            const hsl = this.hslValueAt((i + 0.5) / stops);

            ctx.fillStyle = hsl;
            ctx.fillRect(i * canvas.width / stops, 0, canvas.width * 1.1 / stops, canvas.height);

        }

    }

    /**
     * Draws a representation of the palette using a continuous gradient.
     * @param {object} canvas An HTML canvas on which to draw the palette.
     * @param {number} [resolution = 32] The number of sub-gradients to use.
     */

    drawContinuousPalette(canvas, resolution) {

        this.updateCurveClampBound();

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        const stops = resolution || 32;

        // draw continuous palette
        for (let i = 0; i <= stops; i++) {

            // get hsl values
            const hsl = this.hslValueAt(i / stops);

            // add a gradient stop
            gradient.addColorStop(i / stops, hsl);

        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    /**
     * Helper function that builds a curve from a specified string.
     * @param {string} curveType A string that maps to one of the supported curve types.
     * @param {object} [options] Options for the curve. See {@link Curve}.
     */

    initializeCurve(curveType, options) {

        switch (curveType) {

            case 'arc': return new Arc({ ...options });
            case 'linear': return new Linear({ ...options });
            case 'polynomial': return new Polynomial({ ...options });
            case 'sinusoidal': return new Sinusoidal({ ...options });
            case 'exponential': return new Exponential({ ...options });
            case 'elastic': return new Elastic({ ...options });
            case 'back': return new Back({ ...options });
            case 'bounce': return new Bounce({ ...options });
            default:
                console.warn('Specified curve type is not supported. Using default (linear) instead.');
                return new Linear({ ...options });

        }

    }

    /**
     * Helper function to set the clamp bounds for both curves in the palette. This method should be run before
     * after changing the parameters - but before getting a color value - for palette that use curves of overflow type 'clamp'
     */

    updateCurveClampBound() {

        this.hsCurve.overflow === 'clamp' && this.hsCurve.setClampBounds();
        this.lCurve.overflow === 'clamp' && this.lCurve.setClampBounds();

    }

    /**
     * Samples the HS and L curves, and converts their cartesian coordinates to hue, saturation, and lightness values
     * @param {number} n A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling
     * @returns {object} The hue, saturation, and lightness values of the palette at the point n
     */

    getColorValues(n) {

        const hsStart = this.hsCurve.overflow === 'clamp' ? Math.max(this.start, this.hsCurve.clampStart) : this.start;
        const hsEnd = this.hsCurve.overflow === 'clamp' ? Math.min(this.end, this.hsCurve.clampEnd) : this.end;
        const lStart = this.lCurve.overflow === 'clamp' ? Math.max(this.start, this.lCurve.clampStart) : this.start;
        const lEnd = this.lCurve.overflow === 'clamp' ? Math.min(this.end, this.lCurve.clampEnd) : this.end;

        // get hue and saturation values from the hsCurve
        const hsCartCoords = this.hsCurve.getCurveCoordsAt(hsStart + n * (hsEnd - hsStart));
        const hsPolarCoords = cartToPolar(hsCartCoords.x, hsCartCoords.y);
        const hue = radToDeg(hsPolarCoords.theta) % 360;
        const sat = Math.max(0, Math.min(1, hsPolarCoords.r));

        // get lightness values from the lightCurve
        const lCartCoords = this.lCurve.getCurveCoordsAt(lStart + n * (lEnd - lStart));
        const lightness = Math.max(0, Math.min(1, lCartCoords.y));

        return {
            h: hue,
            s: sat,
            l: lightness
        };

    }

    /**
     * Gets the HSL values at the given point in the palette's range.
     * @param {number} n A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling
     * @returns {string} The HSL string of the color at the point n
     */

    hslValueAt(n) {

        const { h, s, l } = this.getColorValues(n);
        return printHsl(h, s, l);

    }

    /**
     * Gets the RGB values at the given point in the palette's range.
     * @param {number} n A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling
     * @returns {string} The RGB string of the color at the point n
     */

    rgbValueAt(n) {

        const { h, s, l } = this.getColorValues(n);
        const { r, g, b } = hslToRgb(h, s, l);
        return printRgb(r, g, b);

    }

    /**
     * Gets the hex values at the given point in the palette's range.
     * @param {number} n A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling
     * @returns {string} The hex string of the color at the point n
     */

    hexValueAt(n) {

        const { h, s, l } = this.getColorValues(n);
        const { r, g, b } = hslToRgb(h, s, l);
        return rgbToHex(r, g, b);


    }

}