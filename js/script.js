'use strict'

const mapsizefactor = 0.25

const gravity = 10

const tick = 100

let wasFired = false

const explosionSize = 45

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
    }, tick);
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
    explosion.style.rotate = "rotate3d(100,0,0,50deg);"
    document.getElementsByClassName("map")[0].appendChild(explosion)

    explosion.setAttribute("class", "bomb")
}

function render_mortar(x, y, size) {
    let mortar = document.createElement('div');

    mortar.style.width = size+"px"
    mortar.style.height = size+"px"
    mortar.style.backgroundImage = "url(img/mortar-shotter.jpg)"
    mortar.style.backgroundSize = "cover"
    mortar.style.position = "absolute"
    mortar.style.left = x+"px"
    mortar.style.top = y+"px"
    document.getElementsByClassName("map")[0].appendChild(mortar)
}

function render_bomb(x, y, h, size) {
    
    bomb.style.width = (size + h)+"px"
    bomb.style.height = (size + h)+"px"
    bomb.style.backgroundImage = "url(img/mortar.gif)"
    bomb.style.backgroundSize = "cover"
    bomb.style.position = "absolute"
    bomb.style.left = x+"px"
    bomb.style.top = y+"px"
    document.getElementsByClassName("map")[0].appendChild(bomb)
}

function shot() {

    if(wasFired) return;
    
    bomb.style.display='flex';

    weight = document.getElementById('weight').value
    propellant = document.getElementById('propellant').value
    horAngle = document.getElementById('horAngle').value
    verAngle = document.getElementById('verAngle').value

    render_bomb(mortarX, mortarY - 40, 1, 25);
    wasFired = true;

    bullet.position.x = mortarX;
    bullet.position.y = mortarY - 40;

    bullet.velocityDirection.h = verAngle * (propellant * 0.01);
    bullet.velocityDirection.y = -(Math.abs(verAngle - 90)) * (propellant * 0.01);
    bullet.velocityDirection.x = horAngle * (propellant * 0.01);

}

function update() {
    if(wasFired == false) return

    if(bullet.position.h <= 0) {
        render_explosion(bullet.position.x, bullet.position.y, explosionSize)
        bomb.style.display = 'none'
        wasFired = false

        bullet.position.x = 0;
        bullet.position.y = 0;
        bullet.position.h = 1;
        bullet.velocityDirection.x = 0;
        bullet.velocityDirection.y = 0;
        bullet.velocityDirection.h = 0;

        setTimeout(() => {
            clear_explosions()
        }, 3000);
        return
    }

    bullet.position.x += bullet.velocityDirection.x
    bullet.position.y += bullet.velocityDirection.y
    bullet.position.h += bullet.velocityDirection.h

    bullet.velocityDirection.h -= gravity + (weight * 0.10)

    bomb.style.left = bullet.position.x + 'px'
    bomb.style.top = bullet.position.y + 'px'
    bomb.style.width = (25 + bullet.position.h * 0.10)+'px'
    bomb.style.height = (25 + bullet.position.h * 0.10)+'px'
}

function clear_explosions() {
    let div = document.getElementsByClassName('bomb')

    for(let bombb of div) {
        bombb.style.display = 'none';
    }
}