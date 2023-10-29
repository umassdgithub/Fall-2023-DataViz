# Circle Pack Steps
## Sample data (See slides)
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
### Select the svg element

```
const svg = d3.select('svg')
```


## Step 2.1 
### stratify function converts data to parent child format (you can use group as well)

```
const  stratify_function= d3.stratify()
.id(d => d["childColumn"])
.parentId(d => d["parentColumn"])
```



## Step 2.2 
### Apply the stratify function on data


```
const data_formatted = stratify_function(data)
```

## Step 2.3 
### Mke hierarchy from data


```
const data_hierarchy = d3.hierarchy(data_formatted)
```


## Step 2.4 
### Make sums of valus to the hierarchy

```
data_hierarchy.sum((d)=>d.data.val)
```



## Step 3.1  
### Make d3.pack() object


```
const packLayout = d3.pack()
.size([500, 500]);
```



## Step 3.2  
### Make d3.pack() object

```
packLayout(data_hierarchy);
```

## Step 3.3 
### calculate min max and color scale

```
const color_scale=d3.scaleLinear()
        .domain(d3.extent(data_hierarchy,d=> d.value))
        .range(['#2fb32f','#080840'])
```


## Step 4.1  
### Add groups to the svg

```
const nodes = svg.selectAll('g')

        .data(data_hierarchy.descendants()) 
        .enter()
        .append('g')
        .attr("transform",d=>`translate(${d.x},${d.y})`)
nodes
        .append("circle")
        .attr('r', d=> d.r)
        .attr('fill', d=>color_scale(d.value))
nodes
        .append('text')
        .attr('dx',-20)
        .attr('dy', (d)=> -(.7*d.r))
        .text((d)=>`${d.data.id}`)
```