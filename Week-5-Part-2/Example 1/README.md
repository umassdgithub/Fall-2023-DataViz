# d3.stack generator
In many cases the data we process, includes several layers of detail. 
One of the best ways to deal with it, is by stacking the data points. 
Stack bar charts are based on the mark type of line, and the channel of length and position. 


<img src="../imgs/stacked.gif" width="400px">

<ol>
<li>
Sample data is like:

```
    const data = [
        {y01: 120, y02: 180, y03: 100, y04: 77},
        {y01: 60,  y02: 185, y03: 105, y04: 123},
        {y01: 100, y02: 215, y03: 110, y04: 131},
        {y01: 80,  y02: 230, y03: 105, y04: 231},
        {y01: 120, y02: 240, y03: 105, y04: 44}
    ];
```
</li>
<li>
Stack Generator:

```
    let stack = d3.stack()
        .keys(['y01', 'y02', 'y03','y04']);
    let stackedSeries = stack(data);
```
</li>
<li>
For the categorical Color Coding the following scheme from d3 is used:

```
const colors_Category10 = d3.schemeCategory10;
```
which is an array of 10 colors
```
['#1f77b4', '#ff7f0e', '#2ca02c', 
'#d62728', '#9467bd', '#8c564b', '#e377c2', 
'#7f7f7f', '#bcbd22', '#17becf']
```

</li>

<li>
Svg element

```
    let svg = d3.select('svg#main')
```
</li>

<li>

Add groups of data for each stack

```
   const groups = svg.selectAll('g') // append a group to the svg
       .data(stackedSeries)            // bind data to the group
       .enter()
       .append('g')
       .style('fill', (d, i)=>{
           return colors_Category10[i]}) // fill the group with color based on the index of the array item
```

</li>

<li>
Each one of the groups made above has one array bound to it, so we can use the array, append a new group for each item if the array
This is eventually the second order groups

```
    const stackGroups= groups.selectAll('.secondOrderValues') // since each data item is an array, we can bind each array to the newly added group element
       .data(d=>d)
       .enter()
       .append('g');
```
</li>


<li> append "rect" to each of "groups" elements

```
    stackGroups
       .append('rect')                    // append one "rect" item to the group of groups
       .attr('height', 50)                // height of each one of the rectangles
       .attr('y', (_, i)=>(i * 55+20))    // distance from the top left (no scale is applied in this case)
       .transition()                      // add transition
       .duration(1500)                    // set duration of transition
       .delay((d, i) => i * 20)           // delay each transition such that we see one bar at a time to appear
       .attr('width', 
            d=>Math.abs(d[1] - d[0]))     // calculate the width of the stacks using each element's data values
       .attr('x', (d,i)=>d[0])            // Move each bar to the correct x location of each stack part (will be d[0] of each second order array)
```

</li>
</ol>
