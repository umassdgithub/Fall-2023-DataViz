const nodeNumber = 300;

const nodes = d3.range(nodeNumber).map( (d) =>d%2===0?({type: "a", color:"steelblue", inDegree:0}):({type: "b", color:"red",inDegree:0}))
// Making power law distribution matrix
const powerLawRandom = d3.randomExponential(2)
let links =d3.range(nodeNumber).map(()=>[powerLawRandom(),powerLawRandom()])
const scaler = d3.scaleLinear()
    .domain(d3.extent(links.flat()))
    .rangeRound([0,nodeNumber-1])



 links = links.map(d=>({
        source: scaler(d[0]),
        target:scaler(d[1])
    }))

// calculate node in-degrees
links.forEach(d=>{
    nodes[d.target].inDegree++
})

const degreeScale = d3.scaleSqrt().domain(d3.extent(nodes,d=>d.inDegree)).range([2,10])


const width = 1000
const height = 800;

const svg = d3.select("body")
    .append("svg")
    .attr("width","100vw")
    .attr("height","100vh")
    .attr("viewBox",`0 0 ${width} ${height}`)


const linkElements = svg.selectAll(".links")
    .data(links)
    .join("g")
    .attr("transform",`translate(${width/2},${height/2})`)
    .append("path")
    .attr("stroke","black")
    .attr("stroke-width","1")
    .attr("fill","none")

const nodeElements = svg.selectAll('.nodes')
    .data(nodes)
    .join("g")
    .attr("transform",`translate(${width/2},${height/2})`)
    .append('circle').attr("r",d=>degreeScale(d.inDegree))
    .attr("stroke",d=>d.color)
    .attr("stroke-width","2")
    .attr("fill",d=>d.color)
    .attr("fill-opacity",.3)




// grouped by color, and applied different forces
const force = d3.forceSimulation(nodes)
    .force("collide",d3.forceCollide()
        .radius(d=>d.inDegree*12).strength(.01))
    .force("charge_each_other",d3.forceManyBody()
        .strength())
    .force("LinkForces",
        d3.forceLink(links)
            //.strength(.4)
            //.distance(10)
    )
    .on("tick",tick)

function positionLink(d) {
    return "M" + d[0].x + "," + d[0].y
        + "S" + d[1].x + "," + d[1].y
        + " " + d[2].x + "," + d[2].y;
}

function tick()
{

    d3.selectAll("circle")
        .attr("cx",d=>d.x)
        .attr("cy",d=>d.y)

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
    linkElements.attr("d", (d)=> {
        const dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.pow(dx * dx + dy * dy,.5);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    });

}

