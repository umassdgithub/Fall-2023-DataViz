// <path d="M startX startY
//          A rx ry
//          x-axis-rotation
//          large-arc-flag
//          sweep-flag: determines whether the arc should be drawn in a clockwise direction
//          endX endY" />

let movetoX=25,movetoY=50,endX=75,endY=50,rX=1.5,rY=1,rotate=0,largeArcFlag=0;

let setVars = ()=>{
    document.querySelector("#movetoX").value = movetoX
    document.querySelector("#movetoY").value = movetoY
    document.querySelector("#rX").value = rX
    document.querySelector("#rY").value = rY
    document.querySelector("#endX").value = endX
    document.querySelector("#endY").value = endY
    document.querySelector("#rotate").value = rotate
    document.querySelector("svg path").setAttribute("d",`M ${movetoX} ${movetoY} A ${rX} ${rY} ${rotate} 0 ${largeArcFlag} ${endX} ${endY}`)
    document.querySelector("text").textContent=`M ${movetoX} ${movetoY} A ${rX} ${rY} ${rotate} 0 ${largeArcFlag} ${endX} ${endY}`
}

setVars()

let getVars= ()=>{
    movetoX = parseFloat(document.querySelector("#movetoX").value)
    movetoY = parseFloat(document.querySelector("#movetoY").value)
    rX = parseFloat(document.querySelector("#rX").value)
    rY = parseFloat(document.querySelector("#rY").value)
    endX = parseFloat(document.querySelector("#endX").value)
    endY = parseFloat(document.querySelector("#endY").value)
    rotate = parseFloat(document.querySelector("#rotate").value)
    largeArcFlag = document.querySelector("#largeArcFlag").value
}



document.querySelector("form").addEventListener("keypress",getVars);
document.querySelector("form").addEventListener("change",getVars);

document.querySelector("#update").addEventListener("click",(e)=>{
    e.preventDefault()
    setVars()
})