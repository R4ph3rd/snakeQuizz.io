export function main(p5){
    const maxCases = 20;
    let sizeCase = 30;
    let step;

    let users = {
        'Oliver Twist': {
            pawnPos: 0,
            cases: [],
            color: '#555E7B'
        },
        'Charles Dickens':{
            pawnPos: 0,
            cases: [],
            color: '#B7D968'
        },
        'Michel Foucault': {
            pawnPos: 0,
            cases: [],
            color: '#FDE47F'
        }, 
        'Jimi Henderson': {
            pawnPos: 0,
            cases: [],
            color: '#B576AD'
        }, 
        'me':{
            pawnPos: 0,
            cases: [],
            color: '#E04644'
        }
    }

    p5.setup = () => {

        let el = document.querySelector(".gameboard");

		let canvas = p5.createCanvas(el.getBoundingClientRect().width, el.getBoundingClientRect().height);
        canvas.parent(el);
		// canvas.style.width = "1920px";
        step = step = (p5.width - (maxCases * sizeCase)) /maxCases;
        console.log('step: ', step)

        let i = 0;
        for (let user in users){
            users[user].pawnPos = p5.createVector(
                (p5.width/2) + p5.cos(i) * maxCases * 10,
                (p5.height/2) + p5.sin(i) * maxCases * 10
            )
            i++;
        }

        p5.rectMode(p5.CENTER)
        p5.ellipseMode(p5.CENTER)
    }

    p5.draw = () => {
        p5.translate(sizeCase, sizeCase)
        p5.fill(180,180,180)
        p5.noStroke();

        //////////////// GRID
        for (let y = 0 ; y < p5.height - 40 ; y += sizeCase + step){
            for (let x = 0 ; x < p5.width - 40 ; x += sizeCase + step){
                p5.rect(x,y, sizeCase, sizeCase);
            }
        }




        ///////////////// PAWNS
        for (let user in users){
            p5.fill(users[user].color)
            p5.ellipse(users[user].pawnPos.x, users[user].pawnPos.y, sizeCase/ 1.5, sizeCase/ 1.5)
        }
    }

    const move = (user) => {

    }
}