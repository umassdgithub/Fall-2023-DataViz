## Generalizing visualization with Function

### random data

```
    const rnd_data =random_data(100)
```

### function to call

```
   scatter_plot(data=rnd_data,ax="#scatter_plot",
        title="Random Data",
        xLabel="X Axis",
        yLabel="Y Axis")

```

## the scatter_plot function
### The scatter_plot function in js folder
```
const scatter_plot=(data,
ax,                   // the host DOM element
title="",      // Title of the visualization
xLabel="",     // x-label
yLabel="",    // y-label
margin = 100)=>
{
// data scale for the xAxis
const xScale= d3.scaleLinear().domain(d3.extent(data, d=>d.x))
.range([margin,1000-margin])
// data scale for the yAxis
```

```    
const yScale= d3.scaleLinear().domain(d3.extent(data, d=> d.y))
                                  .range([1000-margin,margin]);
 ```
                                  
### Data scale for the yAxis
```
    const rScale = d3.scaleSqrt()
        .domain(d3.extent(data, d=> d.r))
        .range([1000-margin,margin]);
```
### Host DOM 
The function receives the id of the element of the DOM that visualization 
will be added to it.
### select the Host DOM element
```
    const axis = d3.select(`#${ax}`)
```

### append the marks to the svg
```
    const marks = axis.selectAll('.marks')
        .data(data)             // bind data
        .join('g')              // similar to append and enter
        .attr('transform',      // position the marks 
                d=>`translate(${xScale(d.x)}, ${yScale(d.y)})`)
        .append('circle')       // append a circle mark to each position
        .attr("id", (d,i)=>`id_${i}`)
        .attr("r",d=> d.r)
        .attr("fill",d=>d.c)        
```
### Event handling
In d3 v5 and later, on function returns the event and the data bind

```        
        marks.on("mouseenter", (event,data)=>{
        // return all to the initial value
            d3.selectAll(`circle`)
                .classed("highlighted",false)
                .attr("r",d=>d.r)
        // apply changes to the item with the event.target.id                
            d3.select(`#${event.target.id}`)
                .classed("highlighted",true)    // turn the class on
                .transition()                   // set animation  
                .duration(500)                  // duration of the animation
                .ease(d3.easeBounceOut)         // type of the easing
                .attr("r",d=> d.r*2)            // effect (change the radius to 2x)
        })
```
### Return the mark to the original size, after mouse leaves

```
       .on("mouseleave",(event,_)=>{
            d3.select(`#${event.target.id}`)
                .classed("highlighted",false)
                .transition().duration(500)
                .ease(d3.easeBounceOut)
                .attr("r", (d)=>d.r)
        })
```


### x and y Axis function

```
    const x_axis = d3.axisBottom(xScale).ticks(10)
    const y_axis = d3.axisLeft(yScale).ticks(10)
```

### X Axis
```
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${1000-margin})`)
        .call(x_axis)
```

### Y Axis
```
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${margin},${0})`)
        .call(y_axis)
```

### Labels
```
    axis.append("g").attr("class","label")
        .attr("transform", `translate(${500},${1000-10})`)
        .append("text")
        .attr("class","label")
        .text(xLabel)

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .text(yLabel)
```

### Title
```
    axis.append('text')
        .attr('x',500)
        .attr('y',60)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")
```
