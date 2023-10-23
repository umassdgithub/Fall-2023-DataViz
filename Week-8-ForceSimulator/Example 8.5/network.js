
function simulate(data,svg)
{
    let width = parseInt(svg.attr("viewBox").split(' ')[2])
    let height = parseInt(svg.attr("viewBox").split(' ')[3])
    let main_group = svg.append("g")
        .attr("transform", "translate(0, 50)")

   //calculate degree of the nodes:
    let node_degree={}; //initiate an object
   d3.map(data.links,function (d){
       if(node_degree.hasOwnProperty(d.source))
       {
           node_degree[d.source]++
       }
       else{
           node_degree[d.source]=0
       }
       if(node_degree.hasOwnProperty(d.target))
       {
           node_degree[d.target]++
       }
       else{
           node_degree[d.target]=0
       }
   })

    let scale_radius = d3.scaleLinear()
        .domain(d3.extent(Object.values(node_degree)))
        .range([5,15])



    let color = d3.scaleOrdinal(d3.schemeCategory10);
    let link_elements = main_group.append("g")
        .attr('transform',`translate(${width/2},${height/2})`)
        .selectAll(".line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke-width", (d)=> d.value);
    let node_elements = main_group.append("g")
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll(".circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", (d,i)=>scale_radius(node_degree[i]))
        .attr("fill",  (d,i)=>color(d.group))

    let ForceSimulation = d3.forceSimulation(data.nodes)
        .force("collide",
            d3.forceCollide().radius((d,i)=>scale_radius(node_degree[i])*4))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody())
        .force("link",d3.forceLink(data.links)
            .id(d=> d.index)
            .distance(d=> d.value)
            .strength(d=> d.value*.1)
        )
        .on("tick", ticked);

    function ticked()
    {
    node_elements
            .attr("cx", d=> d.x)
            .attr("cy", d=> d.y)

        link_elements
            .attr("x1",d=> d.source.x)
            .attr("x2",d=> d.target.x)
            .attr("y1",d=> d.source.y)
            .attr("y2",d=> d.target.y)

        }


    svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));
    function zoomed({transform}) {
        main_group.attr("transform", transform);
    }




}
