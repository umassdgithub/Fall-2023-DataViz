function scatter_plot(data,
                                 ax,
                                 title="",
                                 xCol="",
                                 yCol="",
                                 rCol="",
                                 legend=[],
                                 colorCol="",
                                 margin = 50)
{





    const X = data.map(d=>d[xCol])
    const Y = data.map(d=>d[yCol])
    const R = data.map(d=>d[rCol])
    const colorCategories =  [... new Set(data.map(d=>d[colorCol]))] // unique values for the categorical data
    const color = d3.scaleOrdinal()
        .domain(colorCategories)
        .range(d3.schemeTableau10) // color scheme of tableau10  https://observablehq.com/@d3/color-schemes



    const xScale= d3.scaleLinear().domain(d3.extent(X, d=> d))
                                .range([margin,1000-margin]);
    const yScale= d3.scaleLinear().domain(d3.extent(Y, d=>  d))
                                .range([1000-margin,margin]);
    const rScale= d3.scaleSqrt().domain(d3.extent(R, d=>d))
                                .range([4,12])
    const axis = d3.select(`${ax}`)

    axis.selectAll('.markers')
        .data(data)
        .join('g')
        .attr('transform', d=>`translate(${xScale(d[xCol])}, ${yScale(d[yCol])})`)
        .append('circle')
        .attr("class", (d,i)=>`cls_${i} ${d[colorCol]}`)
        .attr("id", (d,i)=>`id_${i} ${d[colorCol]}`)
        .attr("r",d=>rScale(d[rCol]))
        .attr("fill", d=>{
           return color(d[colorCol])
        })


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
        .text(xCol)
        .attr("fill", "black")

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .text(yCol)
        .attr("fill", "black")


    // Title
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","title")
        .attr("fill", "black")
    // legend


    const legendContainer = axis
        .append("g")
        .attr("transform", `translate(${margin+20},${margin})`)
        .attr("class","marginContainer")
    if(legend.length===0){legend=colorCategories}

    const legends_items = legendContainer.selectAll("legends")
        .data(legend)
        .join("g")
        .attr("transform",(d,i)=>`translate(${0},${i*45})`)


    legends_items.append("rect")
        .attr("fill",d=>color(d))
        .attr("width","40")
        .attr("height","40")
        .attr("class",d=>d)
        .on("click",(event,d)=>{
            if([...event.target.classList].includes('legendSelect')){
                d3.selectAll(`.${d}`).classed('legendSelect',false)
            }
            else{
                d3.selectAll(`.${d}`).classed('legendSelect',true)
            }

            }
            )
    legends_items
        .append("text")
        .text(d=>d)
        .attr("dx",45)
        .attr("dy",25)
        .attr("class","legend")
        .attr("fill", "black")


    // declare brush
    const brush = d3
        .brush()
        .on("start",  brushStart)
        .on("brush end", brushed)
        .extent([
            [margin, margin],
            [1000-margin,1000-margin]
        ]);
    // call brush event handler
    axis.call(brush);

    // style brushed circles


    function brushed() {
        // use d3.brushSelection to get bounds of the brush
        let selected_coordinates = d3.brushSelection(this); // these are values on the screen

        // where is brushed?
        let X1 = xScale.invert(selected_coordinates[0][0])
        let X2 = xScale.invert(selected_coordinates[1][0])
        let Y1 = yScale.invert(selected_coordinates[0][1])
        let Y2 = yScale.invert(selected_coordinates[1][1])

        let selected_items = []

        // let us select elements that are between the brush area
        d3.selectAll("circle").classed("selected", (d,i)=>
        {
            // data between the scaled brush coordinates
            if( +d[xCol] >= X1 &&
                +d[xCol] <= X2 &&
                +d[yCol] <= Y1 &&
                +d[yCol] >= Y2)
            {
                selected_items.push(`id_${i}`)
                return true
            }
            else{
                return false
            }
        })
        console.log(selected_items)
    }

    function brushStart() {
        // if no selection already exists, remove the class
        if (d3.brushSelection(this)[0][0] === d3.brushSelection(this)[1][0]) {
            d3.selectAll(".markers").classed("selected",false)
        }
    }


}