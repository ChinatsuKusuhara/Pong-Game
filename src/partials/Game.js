import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Message from './Message';

export default class Game {
	constructor(element, width, height) {
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(element);

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z
		);
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width - this.boardGap - this.paddleWidth,
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		);
		this.ball = new Ball(
			this.radius = 8,
			this.width,
			this.height
		);

		this.score1 = new Score(this.width / 2 - 55, 30, 30);
		this.score2 = new Score(this.width / 2 + 30, 30, 30);
		this.winner = new Message(80, 170, 40);

		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});
	}

	render() {
		if (this.pause) {
			return;
		} //if this.pause is true, nothing will happen 

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg'); //creating a new SVG element 
		svg.setAttributeNS(null, 'version', '1.1');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg); //variable of svg must be the same as "let svg"
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

		const player1Msg = 'Player 1 wins!';
		const player2Msg = 'Player 2 wins!';
		if (this.player1.score === 5) {
			this.winner.render('y',svg, player1Msg);
		} else if (this.player2.score === 5) {
			this.winner.render('x',svg, player2Msg);
		}
	}
}