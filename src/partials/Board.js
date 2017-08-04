import { SVG_NS } from '../settings';

export default class Board {

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect'); //creating new Board element 
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', 'black');
    svg.appendChild(rect);

    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'width', this.width);
    line.setAttributeNS(null, 'height', this.height);
    line.setAttributeNS(null, 'stroke-dasharray', '5');
    line.setAttributeNS(null, 'stroke', 'white');
    line.setAttributeNS(null, 'x1', '256');
    line.setAttributeNS(null, 'x2', '256');
    line.setAttributeNS(null, 'y1', '0');
    line.setAttributeNS(null, 'y2', '256');
    svg.appendChild(line);
  }

}