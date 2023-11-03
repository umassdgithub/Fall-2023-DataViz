## Circle Animation Explanation

## index_01

### Initial Setup

```javascript
let data = [1];

let circles = d3.select('svg')
    .selectAll('circles')
    .data(data)
    .join('circle')
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 10)
    .attr('fill', 'steelblue');
```

- `data` is an array containing a single element, corresponding to one circle.
- `d3.select('svg')` selects the SVG container.
- `.selectAll('circles')` is a selection of circle elements to be bound to the data.
- `.data(data)` binds the provided data to the circle elements.
- `.join('circle')` is a convenient shorthand for enter, update, and exit selections.
- `attr` methods set the initial position (`cx`, `cy`), radius (`r`), and fill color of the circle.

### The transition
```angular2html
circles.transition()
    .duration(1000 * 60 * 3) // the animation runs for 3 minutes
    .ease(d3.easeBounce) // applies a bouncing effect to the transition
    .attrTween("r", () => {
        return t => Math.abs(Math.sin(t * Math.PI * 2) * 25);
    });

```


- `.transition()` initiates the animation.
- `.duration(1000 * 60 * 3)` specifies that the transition lasts for 3 minutes.
- `.ease(d3.easeBounce)` applies a bouncing effect, causing the circle to animate as if it's bouncing.
- `.attrTween("r", ...)` creates a tween for the radius. It uses a function that returns another function, which takes a normalized time `t` (from 0 at the start to 1 at the end) and returns the new radius. The radius oscillates based on the sine of time, creating a pulsating effect.


### attrTween

- `.attrTween("attributeName", interpolatorFunction)` is a method used to smoothly transition an attribute over time. The `attributeName` is the name of the attribute you want to animate, such as `"r"` for the radius of a circle.
- `interpolatorFunction` is a function that D3 calls with the current normalized time (`t`). This function must return another function — the "interpolator" — that D3 will call again with the same `t` to get the new attribute value at each frame of the transition.
- The normalized time `t` is a value in the range [0, 1], where 0 represents the start of the transition and 1 represents the end.
- The interpolator function is where the custom animation logic is defined. For example, it might calculate the new radius of a circle based on the current time `t`, often involving mathematical expressions to create dynamic and complex animations.

For example, in the context of a circle's radius:

```
.attrTween("r", function() {
    return function(t) {
        // 't' will be the normalized time from 0 at the start of the transition to 1 at the end.
        return someRadiusValueBasedOnTime(t); // Calculate the radius based on 't'.
    };
})


```

# index_02
## Solar System Visualization

This HTML document creates an interactive visualization of the solar system using D3.js, a JavaScript library for manipulating documents based on data. The visualization includes the Sun, the orbits of the planets, and the planets themselves, each represented according to their relative sizes and distances from the Sun.

### HTML Structure

The document structure includes standard `doctype`, `html`, `head`, and `body` tags. Within the `head`, metadata such as character set (`UTF-8`), viewport settings for responsive design, and document title are defined. The D3.js library is included as a script source.

### Styling

The style block defines CSS rules:
- The `body` uses a sans-serif font.
- The `svg` element is padded.
- The `.backScene` class styles the background of the space scene.
- The `.sun` class styles the Sun's circle with appropriate fill, stroke, and opacity.
- The `.orbitPaths` class styles the paths of the planets' orbits with dashed lines.

### SVG Canvas

An `svg` element with a `viewBox` is defined to create a responsive canvas that scales with the viewport width.

### JS Script

The script performs the following actions:
- Loads planet data from the JSON file.
- Creates logarithmic scales for the distances of planets from the Sun (`distance_scale`), their orbital periods (`rotation_scale`), and their diameters (`diameter_scale`).
- Appends a group element (`solarOrbits`) and a circle to represent the Sun.
- Binds the loaded data to new circle elements to depict the orbits of the planets (`orbitPaths`).
- Appends another group for the planets (`miniCircles`), and within each, a circle for the planet and text for its name.
- Sets up a transition to animate the planets' motion around the Sun, with a linear easing over 3 minutes.

Each planet's movement is calculated based on its orbital period and distance from the Sun, using trigonometric functions to determine its position on the circular path. The animation starts from a random position for each planet to add variation to the visualization.

This visualization provides a scaled and animated model of our solar system, offering an engaging way to understand the relative motions of planets.

<img src="../images/anim06.gif" width=400px/>

## Application of attrTween

```
        miniCircles.transition()
            .duration(1000*60*3) //  the animation runs for 3 minutes
            .ease(d3.easeLinear) 
            .attrTween("transform",
                        d=>{
                        let rndFactor = d3.randomInt(2,120)() //this is just to start planets motion from random location
                        return t=>{
                            t=t+rndFactor;
                            let x_p = Math.cos(2*Math.PI*t*rotation_scale(d.year))*distance_scale(d.distance)
                            let y_p = Math.sin(2*Math.PI*t*(rotation_scale(d.year)))*distance_scale(d.distance)
                            return `translate(${x_p},${y_p})`
                        }});
```



- The tween function is an arrow function `d => {...}` that takes the data `d` for each planet.
- It returns another function that takes a normalized time `t` (ranging from 0 at the start to 1 at the end of the transition).
- This inner function calculates the new position of the planet at each frame of the animation.

#### Calculating Planetary Motion

- `miniCircles.transition()` initializes the transition for the mini circles selection.

- `.duration(1000*60*3)` sets the duration of the animation to 180,000 milliseconds, which is equivalent to 3 minutes.

- `.ease(d3.easeLinear)` specifies the easing function for the transition. Here, `d3.easeLinear` is used for a constant animation speed.

- `.attrTween("transform", d => {...})` is the main part of the transition. It defines a custom interpolation for the `transform` attribute using a function.

- `let rndFactor = d3.randomInt(2,120)()` selects a random integer between 2 and 120. This random factor offsets the start of the animation to make the motion of each planet start from a random position in its orbit.

- `return t => {...}` returns a function that D3 will call repeatedly during the transition. `t` is a value that changes over time from 0 to 1, representing the normalized time of the transition.

- `t = t + rndFactor;` increments the time by the random factor, altering the start position of the animation.

- `let x_p = Math.cos(2*Math.PI*t*rotation_scale(d.year))*distance_scale(d.distance)` calculates the x position of the mini circle. The `Math.cos` function provides the circular motion, and `rotation_scale(d.year)` adjusts the rotation speed based on the planet's orbital period.

- `let y_p = Math.sin(2*Math.PI*t*(rotation_scale(d.year)))*distance_scale(d.distance)` calculates the y position similarly to the x position, but uses the `Math.sin` function for the orthogonal component.

- `return translate(${x_p},${y_p})` constructs the SVG `translate` command that moves the mini circle to its new position (x_p, y_p).