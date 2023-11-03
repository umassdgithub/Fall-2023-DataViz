# Dynamic Circle Transitions with D3.js

The objective of this example is to show how we can chain transitions.
### Code Overview

```javascript
let circles = d3.select('svg').selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    // attributes for the circles are set here
    .attr('fill','steelblue');

circles.transition()
    .duration(2500)
    .delay((_, i) => i * 100 + d3.randomUniform()() * 2000)
    .on("start", function repeat() {
        d3.active(this)
            .attr("cx", d3.randomNormal(300, 70)())
            .attr("cy", d3.randomNormal(300, 70)())
            .attr("fill", "orange")
            .transition()
            .attr("cx", d3.randomNormal(300, 70)())
            .attr("cy", d3.randomNormal(300, 70)())
            .attr("fill", "steelblue")
            .transition()
            .on("start", repeat);
    });
```
## Transition Details

1. **Transition Initiation**: `circles.transition()` starts the transition for each circle.

2. **Duration**: `.duration(2500)` sets the animation to last for 2.5 seconds.

3. **Delay**: `.delay((_, i) => i * 100 + d3.randomUniform()() * 2000)` ensures each circle begins its transition at a slightly different time, creating a staggered effect.

4. **Start Event Listener**: `.on("start", function repeat() {...})` calls the `repeat` function when the transition begins.

Within the `repeat` function:

- `d3.active(this)` selects the circle currently transitioning.
- `.attr("cx", ...).attr("cy", ...)` moves the circle to a random position.
- `.attr("fill", "orange")` changes the circle's color to orange.
- `.transition()` starts a new transition.
- The circle moves to another random position and changes color back to steelblue.
- `.transition().on("start", repeat)` creates a loop by invoking `repeat` on the next transition start.

