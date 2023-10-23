# Week-8 Network Visualization and ForceLayout
### forceSimulation Examples

### Intorduction to  d3js forceSimulation?

In D3.js's forceSimulation, the simulation runs iteratively, 
and during each iteration, it tries to converge nodes and links layout towards a 
stable configuration based on the forces applied to each element.


This simulation is controlled by a parameter **alpha** which represents 
the current **cooling factor** of the simulation. 
The alpha value starts at a high value (e.g., 1) and gradually 
decreases over time as the simulation progresses. 

When alpha is high, the nodes move more significantly, 
and as it decreases, their movements become smaller, 
indicating that the simulation is approaching a stable state.




 1. Example 8.1: Sample data using d3.range() function
    1. x: d3.forceX()
    2. y: d3.forceY()
    3. collide: d3.forceCollide()
    
 2. Example 8.2: Nodes and Links in Strongly Connected Network 
    1. link: d3.forceLink()
    2. charge: d3.forceManyBody()
    3. collide: d3.forceCollide()
    
 3. Example 8.3: Making a function to load network using
    1. link: d3.forceLink()
    2. charge: d3.forceManyBody()
    3. collide: d3.forceCollide()
4. Example 8.4: Applying strength and distance
5. Example 8.5: Applying zoom interaction
6. Example 8.6: Pan and Zoom
7. Example 8.7: Grouping and Mouse interaction (hide and show groups)

<img src="img/Exampl_8.7.gif" width="400px">




For more examples:<br>
<a href="https://github.com/d3/d3-force">
https://github.com/d3/d3-force
</a>
<br>
<b>Great Source to test each one of the forces in d3 forceSimulation 
<a href="https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03">d3-force testing ground</a>
<br>
<a href="https://observablehq.com/@d3/force-directed-graph?collection=@d3/charts">
https://observablehq.com/@d3/force-directed-graph?collection=@d3/charts
</a>
<br>
https://www.d3indepth.com/force-layout/
