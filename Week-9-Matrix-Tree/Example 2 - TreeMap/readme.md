# Tree Map - Step by Step
## Start by Loading some sample data
### sample data (See slides)
```
const data=[
        {"parentColumn": "",  "childColumn":"A"},
        {"parentColumn": "A", "childColumn":"B"},
        {"parentColumn": "A", "childColumn":"C"},
        {"parentColumn": "B", "childColumn":"D","val":30},
        {"parentColumn": "B", "childColumn":"E","val":50},
        {"parentColumn": "C", "childColumn":"F","val":20},
        {"parentColumn": "C", "childColumn":"G","val":40},
        {"parentColumn": "C", "childColumn":"H","val":60}
    ]
```
    
## Step 1
Add the svg elements

```
const svg = d3.select("svg").append('g').attr("transform","translate(50,50)")
```

## Step 2.1
### Stratify function converts data to parent child format

```
const stratify_function= d3.stratify()
        .id(d => d["childColumn"])
        .parentId(d => d["parentColumn"])
```

## Step 2.2 
### Apply stratify function on data

```
const data_formatted = stratify_function(data)
```

## Step 2.3 
### Make hierarchy from data
    
``` const hier_root = d3.hierarchy(data_formatted)
    hier_root.sum(function(d) {
        return d.data.val;
    })
```

## Step 2.4 Color scale
```
let color_scale = d3.scaleLinear()
        .domain(d3.extent(hier_root, function(d) {return d.value}))
        .range(['#080840','#2fb32f'])
```   
## Step 3.1 make a treemap layout
#### There are several options for the threemap layout. A very good example: https://observablehq.com/@d3/treemap
```
let treemapLayout = d3.treemap()
        .size([800, 400])
        .paddingOuter(20)
        .paddingInner(5);
    //treemapLayout.tile(d3.treemapBinary)
    //treemapLayout.tile(d3.treemapDice)
    //treemapLayout.tile(d3.treemapSlice)
    //treemapLayout.tile(d3.treemapSliceDice)
    treemapLayout.tile(d3.treemapSquarify)
```
## Step 3.2 
### apply tree map to hierarchical data
```
    treemapLayout(hier_root);
```

##  Step 4.1 add groups to svg

```
let nodes = svg
        .selectAll('g')
        .data(hier_root.descendants())
        .enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
```

##  Step 4.2 
### Add rect to svg

```
nodes
        .append('rect')
        .attr('width', function(d) { return d.x1 - d.x0; })
        .attr('height', function(d) { return d.y1 - d.y0; })
        .style("fill",function (d){
            return color_scale(d.value);
        })
```
##  Step 4.3 
### Add labels to groups (we have already added rect to the group)
```
nodes
        .append('text')
        .attr('dx', 10)
        .attr('dy', 15)
        .text(function(d,i) {
            return `${d.data.id} - ${d.value}`;
        })
```
