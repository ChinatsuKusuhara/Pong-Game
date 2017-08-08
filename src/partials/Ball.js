import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/BOING.WAV');
    this.reset()
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); //calculation ans: 0-5
    }

    this.vx = this.direction * (6 - Math.abs(this.vy)); //making sure there's no 0 as answer
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++; //increment winning player score 
    this.reset();
    if (player.score === 5) {
      this.vx = 0;
      this.vy = 0;
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    const playerOneGoal = this.x + this.radius >= this.boardWidth;
    const playerTwoGoal =  this.x - this.radius <= 0;

    if (playerOneGoal) {
      this.goal(player1);
      this.direction = 1;
    }else if (playerTwoGoal){
       this.goal(player2);
       this.direction = -1; 
    }

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', '8');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'purple');
    svg.appendChild(circle);
  }
}
