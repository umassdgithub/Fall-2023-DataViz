## Interactive Heatmap Data Visualization Exercise

### Visualization of CT scan images using Contour Map
The objective of this assignment 
to exercise the method used in the eye tracking example's 
heatmap to make an interactive visualization to generate heatmap based on 
different binning and filtering methods.

## Requirements 

1. Use the data in data folder (Data_CT.csv)
2. Refer to the code provided on Heatmap for Earth Temperature on Week 7   
3. Modify the code such that you can generate the visualization below: (10 point)
4. Add a slider to filter out the values  (10 point)
```
        const contours = d3.contours()
            .size([m, n])
                .thresholds(d3.range(min,max,bin_counts))
                (values_T);
```
5. Use colorScale based on the following code  (10 point)
```
THIS IS A SAMPLE:
        const colorScale = d3.scaleDiverging()
            .domain([min, mid, max])
            .interpolator(d3.interpolateRdBu);
```

<b>Bonus point - Make a custom brushX based slider (10 points)</b> 
You can use brushX on the distribution of the densities to change the min max and filter the data, such as change of min and max in the .thresholds(d3.range(min,max,bin_counts)).

<img src='./img/Exercise.png' width='400px' />
