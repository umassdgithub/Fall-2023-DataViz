const random_data=(n=100)=>{

    const rnd = d3.randomUniform();
    return d3.map(d3.range(0,n),
     ()=>({
            x: parseInt(100*rnd()+10),
            y:parseInt(100*rnd()+10),
            r:parseInt(10*rnd()+10),
            c:d3.rgb(
                parseInt(255*rnd()),
                parseInt(255*rnd()),
                parseInt(255*rnd()))
        }))
}