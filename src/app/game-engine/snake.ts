import { GridPosition } from './gameboard-grid.util';
import { UserKeyInput } from './input';

export class Snake {
  snakeBody = [{ x: 11, y: 11 }];

  newSegments = 0;
  input = new UserKeyInput();

  listenToInputs(): void {
    this.input.getInputs();
  }

  update(): void {
    this.addSegments();
    const inputDirection = this.input.getInputDirection();
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] };
    }
    this.snakeBody[0].x += inputDirection.x;
    this.snakeBody[0].y += inputDirection.y;
  }

  draw(gameBoard: any): void {
    this.snakeBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount: number): void {
    this.newSegments += amount;
  }

  getSnakeHead(): GridPosition {
    return this.snakeBody[0];
  }

  snakeIntersection(): boolean {
    return this.onSnake(this.snakeBody[0], { ignoreHead: true });
  }

  onSnake(position: any, { ignoreHead = false } = {}): boolean {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) {
        return false;
      }
      return this.equalPositions(segment, position);
    });
  }

  equalPositions(pos1: any, pos2: any): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  addSegments(): void {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }

    this.newSegments = 0;
  }
}
