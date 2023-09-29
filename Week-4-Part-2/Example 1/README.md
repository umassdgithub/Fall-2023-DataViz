# Week 5
## Example 5.1 
## D3 Line Generator

<ol>
<li> Loading data

```
 const loadData = d3.csv(" the data source",
        function(d) {
        return {
        date: new Date(d.Date),
        volume: Number(d.Volume)
            .
            .
            .
            }
    }).then(data => 
        {
                /// Your code goes here!
        }

```

</li>

<li> Get min max (extent) of variable to 
make appropriate scales

```
    let min_max_date = d3.extent(data, function(d) { return d.date; })
    let min_max_of_width = [0, 500]
    let xScale = d3.scaleTime()
                .domain(min_max_date)
                .range(min_max_of_width)
```

</li>


<li> Creating a line generator

```
let line=d3.line()
        .x(function(d, i) {
            return xScale(i);
        })
        .y(function(d) {
            return yScale(d.value);
        });
```
</li>

<li> Add path element to the SVG element!

```
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line); // line function automatically makes d attribute

```

</li>

</ol>
