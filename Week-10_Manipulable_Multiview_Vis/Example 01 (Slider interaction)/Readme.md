## Example 01 Slider Control Update Date
### HTML Control
slider control is an html input element with type range
```
    <label for="theSlider">count to show
    </label>
    <input type="range" value="40" min="1" max="40" id="theSlider">
```
### Listening to changes 
we can add an event handler that listens to changes of an input control
```
const slider = document.querySelector("#theSlider")
slider.addEventListener("change",()=>{
    const count = +slider.value; // get the value of the slider
    // console.log(count) // console print the value
    const filtered_data = d3.filter(data, (_,i)=>i<count)
    update(filtered_data);
})

```
### Update svg elements using slider
Using enter,exit and remove it is possible to update the svg elements
```
// assign data
const circles =svg.selectAll('circle').data(data) 

//remove extra circles
circles.exit().remove();

// append new elements
circles.enter().append('circle')
```

### Full update code:

```
function update(data){
    const circles =svg.selectAll('circle').data(data) // bind data
    circles.exit().remove();//remove unneeded circles
    circles.enter().append('circle') //append new circles
        .attr('cx', d=>d.x)
        .attr('cy',d=> d.y)
        .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr('r',d=> d.r)
        .attr('fill',d=> d.c)

}
```
