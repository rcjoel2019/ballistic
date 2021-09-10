'use strict'

const mapsizefactor = 0.25

const gravity = 9.8

const tick = 100

const newTick = 30

const timeScale = 0.5

const factor = (newTick/tick)*timeScale

let wasFired = false

const explosionSize = 90

const mortarX = 300
const mortarY = 500

let weight

let propellant
let horAngle
let verAngle

let bomb = document.createElement('div')

let bullet = {
    position: {
        x: 0,
        y: 0,
        h: 1
    },
    velocityDirection: {
        x: 0,
        y: 0,
        h: 0
    }
}

function start(){
    css_fix(mapsizefactor)
    render_mortar(mortarX, mortarY, 45)

    setInterval(() => {
        update()
    }, newTick);
}
function css_fix(size){
    document.getElementsByClassName("main")[0].style.width = (2457*size)+"px"
    document.getElementsByClassName("main")[0].style.height = (2457*size)+"px"
    document.getElementsByClassName("map")[0].style.width = (2457*size)+"px"
    document.getElementsByClassName("map")[0].style.height = (2457*size)+"px"
}

function render_explosion(x, y, size){
    let explosion = document.createElement('div')
    explosion.style.width = size+"px"
    explosion.style.height = size+"px"
    explosion.style.backgroundImage = "url(img/3IsK.gif)"
    explosion.style.backgroundSize = "cover"
    explosion.style.position = "absolute"
    explosion.style.left = x+"px"
    explosion.style.top = y+"px"
    explosion.style.transformStyle = "preserve-3d"
    explosion.style.transform = "rotate3d(100,0,0,50deg);"
    explosion.setAttribute("class", "bomb")
    document.getElementsByClassName("map")[0].appendChild(explosion)

    
}

function render_mortar(x, y, size) {
    let mortar = document.createElement('div');

    mortar.style.width = size+"px"
    mortar.style.height = size+"px"
    mortar.style.backgroundImage = "url(img/mortar.png)"
    mortar.style.backgroundSize = "cover"
    mortar.style.position = "absolute"
    mortar.style.left = x+"px"
    mortar.style.top = y+"px"
    document.getElementsByClassName("map")[0].appendChild(mortar)
}

// function render_bomb(x, y, h, size) {
    
//     bomb.style.width = (size )+"px"
//     bomb.style.height = (size)+"px"
//     bomb.style.backgroundImage = "url(img/mortar.gif)"
//     bomb.style.backgroundSize = "cover"
//     bomb.style.position = "absolute"
//     bomb.style.left = x+"px"
//     bomb.style.top = (y)+"px"
//     bomb.style.transform = `translateZ(${h}px)`
//     document.getElementsByClassName("map")[0].appendChild(bomb)
// }
function render_point(x,y,h, color){
    let point = document.createElement('div')
    point.style.width = 2+"px"
    point.style.height = 2+"px"
    point.style.backgroundColor = color
    point.style.backgroundSize = "cover"
    point.style.position = "absolute"
    point.style.left = x+"px"
    point.style.top = (y)+"px"
    point.style.transform = `translateZ(${h}px)`
    point.setAttribute("class", "point")
    setTimeout(() => {
        point.style.backgroundColor = `#ff7700`
        setTimeout(() => {
            point.style.backgroundColor = `#ffdd00`
            setTimeout(() => {
                point.style.backgroundColor = `#403b1a`
                setTimeout(() => {
                    point.style.backgroundColor = `#db00af`
                }, 3000);
            }, 200);
        }, 150);
    }, 75);
    document.getElementsByClassName("map")[0].appendChild(point)
}

function shot() {  
    if(wasFired) return;
    clear_elements('point')
    var audio = new Audio('content/shot.mp3')
    audio.play()
    bomb.style.display='flex';

    weight = document.getElementById('weight').value
    propellant = document.getElementById('propellant').value
    horAngle = document.getElementById('horAngle').value
    verAngle = document.getElementById('verAngle').value

    //render_bomb(mortarX, mortarY - 40, 1, 10);
    wasFired = true;

    bullet.position.x = mortarX + (45/2);
    bullet.position.y = mortarY;
    render_point(bullet.position.x, bullet.position.y, 1, "#f00")
    bullet.velocityDirection.h = verAngle * (propellant * 0.01);
    bullet.velocityDirection.y = -(Math.abs(verAngle - 90) - Math.abs(horAngle)*0.4) * (propellant * 0.01);
    bullet.velocityDirection.x = (horAngle*0.4) * (propellant * 0.01);

}

function update() {
    if(wasFired == false) return

    if(bullet.position.h <= 0) {
        render_explosion(bullet.position.x-(explosionSize/2), bullet.position.y-(explosionSize), explosionSize)
        bomb.style.display = 'none'
        wasFired = false

        bullet.position.x = 0;
        bullet.position.y = 0;
        bullet.position.h = 1;
        bullet.velocityDirection.x = 0;
        bullet.velocityDirection.y = 0;
        bullet.velocityDirection.h = 0;
        var audio = new Audio('content/bomb.mp3')
        audio.volume = 0.1
        audio.play()
        setTimeout(() => {
            clear_elements('bomb')
        }, 1050);
        return
    }

    bullet.position.x += (bullet.velocityDirection.x)*factor
    bullet.position.y += (bullet.velocityDirection.y)*factor
    bullet.position.h += (bullet.velocityDirection.h)*factor

    bullet.velocityDirection.h -= (gravity + (weight * 0.10))*factor

    bomb.style.left = bullet.position.x + 'px'
    bomb.style.top = (bullet.position.y-bullet.position.h) + 'px'
    bomb.style.width = (25 + bullet.position.h * 0.10)+'px'
    bomb.style.height = (25 + bullet.position.h * 0.10)+'px'
    render_point(bullet.position.x, bullet.position.y, bullet.position.h, "#f00")
}

function clear_elements(className) {
    let div = document.getElementsByClassName(className)

    for(let bombb of div) {
        bombb.style.display = 'none';
    }
}