const mapsizefactor = 0.25

function start(){
    css_fix(mapsizefactor)
}
function css_fix(size){
    document.getElementsByClassName("main")[0].style.width = (2457*size)+"px";
    document.getElementsByClassName("main")[0].style.height = (2457*size)+"px";
    document.getElementsByClassName("map")[0].style.width = (2457*size)+"px";
    document.getElementsByClassName("map")[0].style.height = (2457*size)+"px";
}