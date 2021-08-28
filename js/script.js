const mapsizefactor = 0.25

function start(){
    css_fix(mapsizefactor)
    render_explosion(400,220,45)
}
function css_fix(size){
    document.getElementsByClassName("main")[0].style.width = (2457*size)+"px";
    document.getElementsByClassName("main")[0].style.height = (2457*size)+"px";
    document.getElementsByClassName("map")[0].style.width = (2457*size)+"px";
    document.getElementsByClassName("map")[0].style.height = (2457*size)+"px";
}

function render_explosion(x, y, size){
    let explosion = document.createElement('div');
    explosion.style.width = size+"px"
    explosion.style.height = size+"px"
    explosion.style.backgroundImage = "url(img/3IsK.gif)"
    explosion.style.backgroundSize = "cover"
    explosion.style.position = "absolute"
    explosion.style.right = x+"px"
    explosion.style.top = y+"px"
    explosion.style.transformStyle = "preserve-3d"
    explosion.style.rotate = "rotate3d(100,0,0,50deg);"
    document.getElementsByClassName("map")[0].appendChild(explosion)
}