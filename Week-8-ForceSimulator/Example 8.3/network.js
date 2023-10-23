function simulate(data,svg)
{
    const width = parseInt(svg.attr("viewBox").split(' ')[2])
    const height = parseInt(svg.attr("viewBox").split(' ')[3])
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const link_elements = svg.append("g")
        .attr('transform',`translate(${width/2},${height/2})`)
        .selectAll(".line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke-width", d=> d.value);
    const node_elements = svg.append("g")
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll(".circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", d=>color(d.group))

    const ForceSimulation = d3.forceSimulation(data.nodes)
        .force("collide", d3.forceCollide().radius(15))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody())
        //.force("link",d3.forceLink(data.links)) // we add links data to this layout
        .force("link",d3.forceLink(data.links)
            .id(d=>d.index)
            .distance(d=>d.value)
            .strength(d=>d.value*.1)
        )

        .on("tick", ticked);

    function ticked()
    {
    node_elements
            .attr("cx", d=> d.x)
            .attr("cy", d=> d.y)
        link_elements
            .attr("x1",d=>d.source.x)
            .attr("x2",d=>d.target.x)
            .attr("y1",d=>d.source.y)
            .attr("y2",d=>d.target.y)

        }
}
