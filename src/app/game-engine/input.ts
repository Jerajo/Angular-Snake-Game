import { GridPosition } from './gameboard-grid.util';

export class UserKeyInput {
  inputDirection = { x: 0, y: 0 };
  lastInputDirection = { x: 0, y: 0 };

  getInputs(): void {
    window.addEventListener('keydown', (e) => {
      this.setDirection(e.key);
    });
  }

  setDirection(direction: string): void {
    switch (direction) {
      case 'ArrowUp':
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (this.lastInputDirection.y !== 0) {
          break;
        }
        this.inputDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.lastInputDirection.x !== 0) {
          break;
        }
        this.inputDirection = { x: 1, y: 0 };
        break;
    }
  }

  getInputDirection(): GridPosition {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }
}
