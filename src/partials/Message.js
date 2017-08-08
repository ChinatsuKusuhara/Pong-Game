import { SVG_NS } from '../settings';

export default class winner {
  construction (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
 
  render (svg, message) {
    let winner = document.createElementNS(SVG_NS, 'text');
    winner.setAttributeNS(null, 'x', this.x);
    winner.setAttributeNS(null, 'y', this.y);
    winner.setAttributeNS(null, 'fill', 'yellow');
    winner.setAttributeNS(null, 'font-size', this.size);
    winner.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    winner.innerHTML = message;

    svg.appendChild(winner);
  }
}