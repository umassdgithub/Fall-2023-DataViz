# Week-4
## D3 Generators
In these example D3JS Generators are used to create stacked barchart, and area charts.


The following table generator function can be helpful for the exercise:

```
        function TableGenerator(data,container){
            const table = d3.selectAll(container)
                .append("Table")
                .selectAll(".rows")
                .data(data)
                .enter()
                .append("tr")
                .selectAll(".td")
                .data((d,i)=> {
                    if(i===0){
                        return Object.keys(d);
                    }
                    else{
                        return Object.values(d)
                    }
                })
                .enter()
                .append("td")
                .text(d=>d)
        }
        ```
