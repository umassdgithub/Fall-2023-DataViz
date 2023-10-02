# MulitLineChart





<p>In order to make a line chart with a radial form, we will need to use the d3.lineRadial() generator</p>

```
        const LineGen_avg = d3.line()
            .x(d=>xScale(d.date))
            .y(d=>yScale(d.t_avg))

```

Using the same Boston Temperature dataset, the following visualization is made:<br>
<img width="500px" src="./img/preview.png" />