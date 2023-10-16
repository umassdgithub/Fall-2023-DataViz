# d3.contours() Generator

### Step 1. 

Add svg element to html file -- set viewBox and width and height

### Step 2. select svg element using d3.select

```    
    const data_file = "https://gist.githubusercontent.com/mbostock/4241134/raw/da906a9b9c5fb2b4a2aa9691c839781977b32613/volcano.json"
    const svg = d3.select('svg');
```

### Step 3. Volcano database
Load the data, and pass it to the main function
```    
    d3.json(data_file).then(main);
```
The dimensions of the data is available in the dataset

    function main(data){

```
    const m = data.width;  // from the dataset file
    const n = data.height; // from the dataset file
    const matrix = data.values; // from the dataset file
```


in this example in order to be able to redraw the visualization by the change 
of the value of the slider, an update, or draw function is used
```
function draw(threshold)
{
    
```
### Step 4. Convert data into isoline coordinates using (d3.contour)
The **threshold** function, receives the array for the thresholds of the contours.

```
const extent = d3.extent(matrix,function (d) { return d;});
let contour = d3.contours()
                .size([m, n])
                .thresholds(d3.range(extent[0], extent[1], threshold))(matrix);
``` 

### Step 5. to create the contour paths a path generator function (d3.geoPath) is defined
```
const path = d3.geoPath();
```

### Step 6. Color coding based on the values
Using extents function, the min-max of the values are calculated, and used for color coding

```
// Min - Max

//------ COLOR CODE BY ELEVATION------
let min_max = d3.extent(contour,d=> d.value);

        let colorScale = d3.scaleSequential()
                           .domain(min_max)
                           .interpolator(d3.interpolateViridis);
```

### Step 7. Biding data, and appending the paths for each contour set
```        
        svg.selectAll('path')
            .data(contour)      // pass the array of contours
            .enter()            // bind the data 
            .append('path')     // append one path for each array
            .attr('d', path)    // calculate the d value of the path 
            .attr('stroke', 'black')    // set styling
            .attr('fill', "none")       // set styling
            .attr("stroke-linejoin", "round") // make connections of the lines round
            .attr('stroke-width', '0px')  
            .attr('fill', d=> colorScale(d.value))
    }
```
 
### Initiate the visualization with 8 thresholds 
 ```
        draw(8);
 ```
 
        
### Range slider on change event setting        
 ```     
        d3.select("#threshold").on("change", (d)=>{
            let value = this.value
            svg.selectAll('*').remove()
            draw(value)
        }) }
```
   
