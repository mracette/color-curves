# Color Curves
Unique color palettes for data visualization and generative art. This is the library that underlies [color-curves-app](https://github.com/mracette/color-curves-app)

## Editor
An interactive editor is available at [colorcurves.app](https://colorcurves.app). You may find it easiest to create palettes with the editor first, then bring them into your projects using this library (instructions for how to do so are in the application). 

## Install
```javascript
npm install color-curves -s
```

## Include
### Modules (all exports are named):
```javascript
import { ColorPalette } from 'color-curves';
```

### Common JS
```javascript
const ColorCurves = require('color-curves');
```

### Script
```javascript
<script src="http://unpkg.com/color-curves"></script>
<script>
const palette = new ColorCurves.ColorPalette()
</script>
```

## Usage

### Create a new palette using custom curves
```javascript
const hsCurve = new Exponential({ variation: 'in-out' });
const lCurve = new Polynomial({ variation: 'in', exponent: 2 });
const palette = new ColorPalette(hsCurve, lCurve, { start: 0.25, end: 0.75 });
```

### Get color values
```javascript
palette.hslValueAt(.33);
palette.hexValueAt(.66);
palette.rgbValueAt(.99);
```

### Draw a palette on a canvas
```javascript
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

palette.drawContinuousPalette(canvas, 128);
palette.drawDiscretePalette(canvas, 6);
```

## API / Documentation
Check out the full [documentation](https://github.com/mracette/color-curves/blob/master/DOCUMENTATION.md)
