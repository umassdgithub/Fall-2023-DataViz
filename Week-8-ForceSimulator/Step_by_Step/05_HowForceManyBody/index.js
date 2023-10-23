const nodes = d3.range(10)
    .map( (d) =>d%2===0?({type: "a", color:"steelblue"}):({type: "b", color:"red"}))

const width = 1000,height = 800

const svg = d3.select("body")
    .append("svg")
    .attr("width","100vw")
    .attr("height","100vh")
    .attr("viewBox",`0 0 ${width} ${height}`)


const nodeElements = svg.selectAll('.nodes')
    .data(nodes)
    .join("g")
    .attr("transform",`translate(${width/2},${height/2})`)
    .append('circle').attr("r","20")
    .attr("stroke",d=>d.color)
    .attr("stroke-width","2")
    .attr("fill","None")

// grouped by color, and applied different forces
const force = d3.forceSimulation(nodes)
    .force("collide",d3.forceCollide()
        .radius(10))
    .force("charge_each_other",d3.forceManyBody()
        .strength())
    .on("tick",tick)


function tick()
{
    d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx",d=>d.x)
        .attr("cy",d=>d.y)

}

