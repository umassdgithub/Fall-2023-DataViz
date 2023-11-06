const scatter_plot=(data,
                      ax,                   // the host DOM element
                      title="",      // Title of the visualization
                      xLabel="",     // x-label
                      yLabel="",    // y-label
                      margin = 100)=>
{
    // data scale for the xAxis
    const xScale= d3.scaleLinear().domain([0,d3.extent(data, d=>d.x)[1]])
                                .range([margin,1000-margin])
    // data scale for the yAxis

    const yScale= d3.scaleLinear().domain([0,d3.extent(data, d=> d.y)[1]])
                                  .range([1000-margin,margin]);
    // data scale for the yAxis
    const rScale = d3.scaleSqrt()
        .domain(d3.extent(data, d=> d.r))
        .range([1000-margin,margin]);

    // select the Host DOM element
    const axis = d3.select(`#${ax}`)

    // append the marks to the svg
    const marks = axis.selectAll('.marks')
        .data(data)             // bind data
        .join('g')
        .attr('transform', d=>`translate(${xScale(d.x)}, ${yScale(d.y)})`)
        .append('circle')
        .attr("id", (d,i)=>`id_${i}`)
        .attr("r",d=> d.r)
        .attr("fill",d=>d.c)

    marks.on("mouseenter", (event,data)=>{
            d3.selectAll(`circle`)
                .classed("highlighted",false)
                .attr("r",d=>d.r)

            d3.select(`#${event.target.id}`)
                .classed("highlighted",true)
                .transition().duration(500)
                .ease(d3.easeBounceOut)
                .attr("r",d=> d.r*2)
        })
        .on("mouseleave",(event,_)=>{
            d3.select(`#${event.target.id}`)
                .classed("highlighted",false)
                .transition().duration(500)
                .ease(d3.easeBounceOut)
                .attr("r", (d)=>d.r)
        })

    // x and y Axis function
    const x_axis = d3.axisBottom(xScale).ticks(10)
    const y_axis = d3.axisLeft(yScale).ticks(10)
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
        .attr('y',60)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")

}