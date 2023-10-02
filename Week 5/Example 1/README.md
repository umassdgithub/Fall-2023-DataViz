## D3 Line Generator

<ol>
<li> Loading data<br>
d3.csv(Location of CSV, formatter function).then(when data loaded run this)

```
 const loadData = d3.csv(" the data source",
        d=>{
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
        .x((d, i)=>{
            return xScale(i);
        })
        .y(d=> {
            return yScale(d.value);
        })
        .ticks()
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

<h3>d3.lineRadial()</h3>
d3.lineRadial is similar to d3.line but, instead of cartesian coordinates (x and y), it works with radial coordinates (angle and radius).
The default accessors are d[0] for angle, and d[1] for radius, so we can define spiraling points like this:

```
// make a dummy dataset
spiral = Array.from({ length: 76 }, (_, i) => [
  (Math.PI / 3) * i, // angle (in radians)
  2 * i // radius
])

const radialGenerator = d3.lineRadial()


```