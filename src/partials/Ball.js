import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
  }

  render(svg) {
    let circle = document.createElementNS(SVG_NG, 'circle');
    circle.setAttributeNS(null, 'radius', this.radius);
    circle.setAttributeNS(null, 'width', this.width);
    circle.setAttributeNS(null, 'height', this.height);
    circle.setAttributeNS(null, 'fill', 'purple');
    svg.appendChild(circle);
  }

}