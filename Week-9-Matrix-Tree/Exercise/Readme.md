## Make e-charts tree map
using the data here:

```
    let data=[
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

<b>Note</b><p>you need to stratify data manually, or using an algorithm such that echarts can convert it into visualization. In case you go with a code, it should be a recursive code to cover all the children</p><p>The top parent in echart requires a parent node.</p>
