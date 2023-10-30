## Step 1:
### Select the div - append the echarts graph to it.

```
const dom = document.querySelector('#main')
const myChart = echarts.init(dom);
```

## Step 2:
### Echarts visualization is based on one "option" Object 
all the details relate dto the configuration of the chart can be added
using the option
<b> note that this option can be modified by user interaction </b>

```    
const option = { }
```


## Step 3: 
### The most important part, is the data input section
data is passed to echarts using "series" key.
Series key usually contains a list of objects.
These objects provide the details for the visualization in the series. Visualization types are set here as well.
        
```
const option = {  // from step 2

    series: [   //https://echarts.apache.org/en/option.html#series
           //https://echarts.apache.org/handbook/en/concepts/dataset

           // includes: line, bar, pie, scatter, effectScatter, radar, tree,
           // treemap, sunburst, boxplot, candlestick, heatmap, map, parallel,
           // lines, graph, sankey, funnel, gauge, pictorialBar, themeRiver, custom,
   {
       name: 'Buy',
       type: 'bar', //https://echarts.apache.org/en/option.html#series-bar
       data: [54, 34, 36, 31, 10, 42]
   },
   {
       name: 'Sell',
       type: 'bar',
       data: [60, 38, 38, 35, 18, 40]
   }
        ],
```
## Step 4: 
### Setting the title and other configs
all the details about title can be found here:
https://echarts.apache.org/en/option.html#title

```
        title:
         {
             text: 'Title of the Chart',   // the text of the title
             show : true,                               // show or hide (false)
             textStyle:  // https://echarts.apache.org/en/option.html#title.textStyle
                 {
                     color:'#726c6c',
                     fontFamily:'sans-serif',
                     fontWeight:'bold', //'normal', 'bold', 'bolder' , 'lighter'
                     fontSize: '20'

            },
             subtext: "Some Subtext! it is a hyperlink.",
             sublink: 'https://google.com',
             //textVerticalAlign:'middle'
        },
```

## Step 5: <i>optional</i>
### Setting tooltips for the data points

```
        tooltip: {
            trigger: 'axis', // 'axis', 'item' or 'none'
            axisPointer: {
                type: 'shadow'
            }
        },
```

## Step 6: <i>optional</i>
### Setting legends: 

```
        // to set the legend, the name of the dataset should be passed in the form of data
        legend: //https://echarts.apache.org/en/option.html#legend.tooltip
            {
                data: ['Buy','Sell'],
                icon:'circle' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
         },
```

## Step 7: 
### Setting the axis

```
    xAxis: {
            data: ['Category 1', 'Category 2', 'Category 3', 'Category 4',  'Category 5'],
            splitArea: {
                show: true
            }},
        yAxis: {
            splitArea: {
                show: true
            }
        }


    };
```

## Finally:
### Display the chart using the configuration items and data just specified.

```   
     myChart.setOption(option);
```