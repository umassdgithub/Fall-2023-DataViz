const nodes = d3.range(20).map( (d) =>d%2===0?({type: "a", color:"steelblue"}):({type: "b", color:"red"}))


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
const force_1 = d3.forceSimulation(nodes.filter(d=>d.color==="steelblue"))
    .force("name_Y",d3.forceY(100))
    .on("tick",tick)

const force_2 = d3.forceSimulation(nodes.filter(d=>d.color==="red"))
    .force("name_X",d3.forceX(200))
    .on("tick",tick)

function tick()
{
    d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx",d=>d.x*2)
        .attr("cy",d=>d.y*2)

}

