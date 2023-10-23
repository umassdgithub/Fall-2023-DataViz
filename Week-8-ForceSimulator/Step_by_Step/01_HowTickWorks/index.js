const nodes =d3.range(20).map( (d) =>d%2===0?({type: "a", color:"steelblue"}):({type: "b", color:"red"}))

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


const force = d3.forceSimulation(nodes)
    .on("tick",tick).iterations(100)

function tick()
{
    d3.selectAll("circle[stroke='red']")
        .transition()
        .duration(1000)
        .attr("cx",d=>200+d.x*2)
        .attr("cy",d=>d.y*2)

    d3.selectAll("circle[stroke='steelblue']")
        .transition()
        .duration(1000)
        .attr("cx",d=>-200+d.x*2)
        .attr("cy",d=>d.y*2)



    //console.log(nodes)
}

