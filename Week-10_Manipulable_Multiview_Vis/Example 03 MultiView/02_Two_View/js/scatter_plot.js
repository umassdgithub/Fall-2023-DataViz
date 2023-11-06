function scatter_plot(data,
                                 ax,
                                 title="",
                                 xLabel="",
                                 yLabel="",
                                 legend=[],
                                 legendcolors=[],
                                 margin = 100)
{
    const xScale= d3.scaleLinear().domain(d3.extent(data, d=> d.x))
                                .range([margin,1000-margin]);
    const yScale= d3.scaleLinear().domain(d3.extent(data, d=>  d.y))
                                .range([1000-margin,margin]);
    const rScale= d3.scaleLinear().domain(d3.extent(data, d=> d.r))
                                .range([4,12])
    const axis = d3.select(`${ax}`)

    axis.selectAll('.markers')
        .data(data)
        .join('g')
        .attr('transform', d=>`translate(${xScale(d.x)}, ${yScale(d.y)})`)
        .append('circle')
        .attr("class", (d,i)=>`cls_${i}`)
        .attr("r",d=>rScale(d.r))
        .attr("fill", d=>d.c)

    // x and y Axis function
    const x_axis = d3.axisBottom(xScale).ticks(4)
    const y_axis = d3.axisLeft(yScale).ticks(4)
    //X Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${1000-margin})`)
        .call(x_axis)
    // Y Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${margin},${0})`)
        .call(y_axis)
    // Labels
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
    // Title
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")
    // legend
    if (legend.length>0){
        legend.forEach(
            (d,i)=>{
                const space = 50;
                const lgnd = axis.append("g").attr('transform',`translate(${900},${i*50 + space})`);
                lgnd.append('rect')
                    .attr('width',40)
                    .attr('height',40)
                    .attr('fill', legendcolors[i])
                    .attr("class",d)
            lgnd.append('text')
                .attr("class","legend")
                .attr("dx","-80")
                .attr("dy","30").text(d)

        })
    }




}