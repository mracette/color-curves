# color-curves *0.0.5*

> Unique color palettes for data visualization and generative art


### src/core/ColorPalette.js


#### new ColorPalette() 

A continuous color palette created by overlaying curves onto surfaces in the HSL color space.

A ColorPalette has exactly two curves. The "hs" curve maps to hue and saturation values and lies in a unit circle
in the HS space. The "l" curve maps it's y-coordinate to lightness, and lies in a unit square in the L space.






##### Returns


- `Void`



#### ColorPalette.constructor([hsCurve, lCurve, options]) 

Creates a new Color Palette.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hsCurve | `object` `string`  | The curve object or curve type of the "hs" curve | *Optional* |
| lCurve | `object` `string`  | The curve object or curve type of the "l" curve | *Optional* |
| options | `object`  | = {}] Optional properties of the color palette | *Optional* |
| options.start | `number`  | Starts the palette at a certain point along the curve | *Optional* |
| options.end | `number`  | Ends the palette at a certain point along the curve | *Optional* |




##### Returns


- `Void`



#### ColorPalette.setName([name]) 

Sets a name for this palette




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | A name for this palette | *Optional* |




##### Returns


- `Void`



#### ColorPalette.setAuthor([author]) 

Sets a name for this palette




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| author | `string`  | A name for this palette | *Optional* |




##### Returns


- `Void`



#### ColorPalette.setHsCurve([hsCurve]) 

Sets the "hs" (hue-saturation) curve for this palette.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hsCurve | `object` `string`  | An object or string describing the "hs" curve. See {@link Curve} | *Optional* |




##### Returns


- `Void`



#### ColorPalette.setLCurve([lCurve]) 

Sets the "l" (lightness) curve for this palette.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| lCurve | `object` `string`  | An object or string describing the "hs" curve. See {@link Curve} | *Optional* |




##### Returns


- `Void`



#### ColorPalette.exportPaletteParams([precision]) 

Returns a JSON representation of this palette, including representations for each of its curves and the palette itself.
The returned string consists of three comma-separated JSON objects which map to hsCurve, lCurve, and paletteParams in the ColorPalette constructor.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| precision | `number`  | The number of decimals to include in numerical parameters. | *Optional* |




##### Returns


- `string`  The JSON representation of this palette.



#### ColorPalette.setStart([start]) 

Sets the start point for the palette's curves




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| start | `number`  | A number in the range [0, 1]. Not to exceed the palette's end point. | *Optional* |




##### Returns


- `Void`



#### ColorPalette.setEnd([end]) 

Sets the end point for the palette's curves




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| end | `number`  | A number in the range [0, 1]. Not to be exceeded by the palette's start point. | *Optional* |




##### Returns


- `Void`



#### ColorPalette.drawDiscretePalette(canvas, numStops) 

Draws a representation of the palette using evenly spaced stops.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| canvas | `object`  | An HTML canvas on which to draw the palette. | &nbsp; |
| numStops | `number`  | The number of distinct colors to use in the drawing. | &nbsp; |




##### Returns


- `Void`



#### ColorPalette.drawContinuousPalette(canvas[, resolution]) 

Draws a representation of the palette using a continuous gradient.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| canvas | `object`  | An HTML canvas on which to draw the palette. | &nbsp; |
| resolution | `number`  | = 32] The number of sub-gradients to use. | *Optional* |




##### Returns


- `Void`



#### ColorPalette.initializeCurve(curveType[, options]) 

Helper function that builds a curve from a specified string.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| curveType | `string`  | A string that maps to one of the supported curve types. | &nbsp; |
| options | `object`  | Options for the curve. See {@link Curve}. | *Optional* |




##### Returns


- `Void`



#### ColorPalette.updateCurveClampBound() 

Helper function to set the clamp bounds for both curves in the palette. This method should be run before
after changing the parameters - but before getting a color value - for palette that use curves of overflow type 'clamp'






##### Returns


- `Void`



#### ColorPalette.getColorValues(n) 

Samples the HS and L curves, and converts their cartesian coordinates to hue, saturation, and lightness values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `number`  | A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling | &nbsp; |




##### Returns


- `object`  The hue, saturation, and lightness values of the palette at the point n



#### ColorPalette.hslValueAt(n) 

Gets the HSL values at the given point in the palette's range.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `number`  | A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling | &nbsp; |




##### Returns


- `string`  The HSL string of the color at the point n



#### ColorPalette.rgbValueAt(n) 

Gets the RGB values at the given point in the palette's range.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `number`  | A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling | &nbsp; |




##### Returns


- `string`  The RGB string of the color at the point n



#### ColorPalette.hexValueAt(n) 

Gets the hex values at the given point in the palette's range.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `number`  | A number in the range [0, 1] that represents the proportion of each curve to traverse before sampling | &nbsp; |




##### Returns


- `string`  The hex string of the color at the point n




### src/core/Curve.js


#### new Curve() 

Represents a relationship between a 1-dimensional input bounded by [0, 1] and a 2-dimensional
output bounded by the perimeter of the surface on which the curve lies.

The surface must be either a unit circle (to represent the Hue-Saturation space) or a 
unit square (to represent the lightness space).

Curves are not instantiated directly.






##### Returns


- `Void`



#### Curve.constructor([options]) 

Creates a new Curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the curve | *Optional* |
| options.overflow | `object`  | Defines how to adjust output that extends past the surface perimeter | *Optional* |
| options.reverse | `boolean`  | Whether to reverse the direction of the curve | *Optional* |
| options.rotation | `number`  | Z-axis rotation of the curve in radians | *Optional* |
| options.scale | `object`  | 2-dimensional scale of the curve | *Optional* |
| options.scale.x | `number`  | Translation along the local X axis | *Optional* |
| options.scale.y | `number`  | Translation along the local Y axis | *Optional* |
| options.surface | `string`  | The surface on which to draw the curve | *Optional* |
| options.translation | `object`  | 2-dimensional translation of the curve | *Optional* |
| options.translation.x | `number`  | Translation along the local X axis | *Optional* |
| options.translation.y | `number`  | Translation along the local Y axis | *Optional* |




##### Returns


- `Void`



#### Curve.setSurface(surface) 

Set the curve's surface.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| surface | `object` `string`  | The surface on which to draw the curve | &nbsp; |




##### Returns


- `Void`



#### Curve.setClampBounds([resolution]) 

Samples the curve and sets clampStart and clampEnd to the input values where the curve intersects the perimeter. If the 
outputs at 0 or 1 are inside of the surface then the clampStart and clampEnd are set to 0 and 1, respectively.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| resolution | `number`  | = 128] Number of samples used to determine the clamp bounds | *Optional* |




##### Returns


- `Void`



#### Curve.setOverflow([overflow]) 

Sets the overflow behavior.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| overflow | `string`  | = 'clamp'] Method for adjusting output that extends past the surface perimeter | *Optional* |




##### Returns


- `Void`



#### Curve.setReverse([reverse]) 

Sets the reverse flag.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| reverse | `boolean`  | = false] Whether to reverse the direction of the curve | *Optional* |




##### Returns


- `Void`



#### Curve.setRotation([rotation]) 

Sets the rotation of the curve




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| rotation | `boolean`  | = 0] Z-Axis rotation of the curve in radians | *Optional* |




##### Returns


- `Void`



#### Curve.setScale() 

Sets the scale of the curve




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options.scale | `object`  | 2-dimensional scale of the curve | *Optional* |
| options.scale.x | `number`  | Scale along the local X axis | *Optional* |
| options.scale.y | `number`  | Scale along the local Y axis | *Optional* |




##### Returns


- `Void`



#### Curve.setScaleX([x]) 

Sets the X scale of the curve. Default depends on the surface type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| x | `number`  | Scale along the local X axis | *Optional* |




##### Returns


- `Void`



#### Curve.setScaleY([y]) 

Sets the Y scale of the curve. Default depends on the surface type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| y | `number`  | Scale along the local Y axis | *Optional* |




##### Returns


- `Void`



#### Curve.setTranslation() 

Sets the translation of the curve




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options.translation | `object`  | 2-dimensional translation of the curve | *Optional* |
| options.translation.x | `number`  | Translation along the local X axis | *Optional* |
| options.translation.y | `number`  | Translation along the local Y axis | *Optional* |




##### Returns


- `Void`



#### Curve.setTranslateX([x]) 

Sets the translation of the curve along the local X axis. The default values depends on the surface type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| x | `number`  | Translation along the local X axis | *Optional* |




##### Returns


- `Void`



#### Curve.setTranslateY([y]) 

Sets the translation of the curve along the local Y axis. The default values depends on the surface type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| y | `number`  | Translation along the local Y axis | *Optional* |




##### Returns


- `Void`



#### Curve.getFnCoordsAt(n) 

Returns the x and y coordinates associated with a number n in the range [0, 1].




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `object`  | A number between 0 and 1 representing the proportion of the curve to traverse | &nbsp; |




##### Returns


- `object.&lt;string, number&gt;`  The x and y coordinates of the function at a point n



#### Curve.getCurveCoordsAt(n) 

Applies transformation to the coordinates of the underlying function for the curve. Returns an object containing
the new x and y coordinates and well as a 'clamped' flag that is true for coordinates outside of the surface perimeter.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| n | `object`  | A number between 0 and 1 representing the proportion of the curve to traverse | &nbsp; |




##### Returns


- `object.&lt;string, number|boolean&gt;`  The x and y coordinates of the curve at a point n




### src/functions/Back.js


#### new Back([options]) 

Creates an "ease back" function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.variation | `string`  | The contour of the function (see https://easings.net) | *Optional* |
| options.overshoot | `number`  | The degree to which the function "overshoots" | *Optional* |




##### Returns


- `Void`



#### Back.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Back.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/functions/Bounce.js


#### new Bounce([options]) 

Creates an ease "bounce" curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.variation | `string`  | The contour of the function (see https://easings.net) | *Optional* |




##### Returns


- `Void`



#### Bounce.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Bounce.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/functions/Elastic.js


#### new Elastic([options]) 

Creates an "elastic" function.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.amplitude | `string`  | The amplitude of the function | *Optional* |
| options.period | `number`  | The period of the function | *Optional* |




##### Returns


- `Void`



#### Elastic.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Elastic.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/functions/Function.js


#### new Function([options]) 

Represents a generic function that can be further extended by a child class that specified a 1:1 relationship between a 
single input and single output




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |




##### Returns


- `Void`




### src/functions/Linear.js


#### new Linear([options]) 

Creates a linear curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |




##### Returns


- `Void`




### src/functions/Polynomial.js


#### new Polynomial([options]) 

Creates an ease "elastic" curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.exponent | `string`  | The exponent of the function | *Optional* |




##### Returns


- `Void`



#### Polynomial.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Polynomial.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/functions/Exponential.js


#### new Exponential([options]) 

Creates an ease "exponential" curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.variation | `string`  | The contour of the function (see https://easings.net) | *Optional* |




##### Returns


- `Void`



#### Exponential.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Exponential.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/functions/Sinusoidal.js


#### new Sinusoidal([options]) 

Creates an ease "sinusoidal" curve.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the function | *Optional* |
| options.variation | `string`  | The contour of the function (see https://easings.net) | *Optional* |




##### Returns


- `Void`



#### Sinusoidal.setVariation(variation) 

Sets the easing variation. See https://easings.net/




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| variation | `string`  | The curve variation ('in', 'out', or 'in-out') | &nbsp; |




##### Returns


- `Void`



#### Sinusoidal.setFunction() 

Assigns a function to this class that maps input to output






##### Returns


- `Void`




### src/geometries/Arc.js


#### new Arc() 

Represents a segment of a circle






##### Returns


- `Void`



#### Arc.constructor([options, curveOptions]) 

Creates a new Arc.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `object`  | Optional properties of the arc | *Optional* |
| options.radius | `number`  | Radius of the arc | *Optional* |
| options.angleStart | `number`  | = 0] The angle in radians of the segment start | *Optional* |
| options.angleEnd | `number`  | = 2PI] The angle in radians of the segment end | *Optional* |
| options.angleOffset | `number`  | = 0] The degrees in radians by which the angleStart and angleEnd are offset | *Optional* |
| curveOptions |  | See {@link Curve} | *Optional* |




##### Returns


- `Void`



#### Arc.setRadius([radius]) 

Sets the radius of the arc. If no value is passed a default is set based on the surface type.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| radius | `object`  | Radius of the arc | *Optional* |




##### Returns


- `Void`



#### Arc.setAngleStart([angleStart]) 

Sets the angle in radians of the ending point of the segment.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| angleStart | `object`  | = 0] The angle in radians | *Optional* |




##### Returns


- `Void`



#### Arc.setAngleEnd([angleEnd]) 

Sets the angle in radians of the starting point of the segment.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| angleEnd | `object`  | = 0] The angle in radians | *Optional* |




##### Returns


- `Void`



#### Arc.setAngleOffset([angleOffset]) 

Sets the degrees in radians by which the angleStart and angleEnd are offset




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| angleOffset | `object`  | = 0] The degrees in radians | *Optional* |




##### Returns


- `Void`




### src/surfaces/UnitCircle.js


#### new UnitCircle() 

A circle with a radius of 1 and a center point at (0, 0)






##### Returns


- `Void`




### src/utils/color.js


#### if(h, s, l) 

Converts an HSL color value to RGB.
Returns r, g, and b values in the set [0, 255].




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| h | `number`  | The hue value as a degree | &nbsp; |
| s | `number`  | The saturation value in the range [0, 1] | &nbsp; |
| l | `number`  | The lightness color value in the range [0, 1] | &nbsp; |




##### Returns


- `Object`  The RGB representation



#### result(hex) 

Converts a hexadecimal string to an RGB color value.
Returns r, g, and b values in the set [0, 255].
See: https://stackoverflow.com/a/5624139/3064334




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| hex | `String`  | The hex value in the range [#000000, #FFFFFF] | &nbsp; |




##### Returns


- `Object`  The rgb representation




### src/surfaces/UnitSquare.js


#### new UnitSquare() 

A square with sides of length 1 and a center point at (0.5, 0.5)






##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
