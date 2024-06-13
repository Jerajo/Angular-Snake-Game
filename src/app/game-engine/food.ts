import { GridPosition, randomGridPosition } from '../game-engine/gameboard-grid.util';

export class Food {
  EXPANSION_RATE = 1;
  score = 0;
  food: any;
  snake;

  constructor(snake: any) {
    this.snake = snake;
    this.food = this.getRandomFoodPosition();
  }

  set addScore(val: number) {
    this.score += val;
  }

  get currentScore(): number {
    return this.score;
  }

  update(): void {
    if (this.snake.onSnake(this.food)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.food = this.getRandomFoodPosition();
      this.addScore = 1;
    }
  }

  draw(gameBoard: any): void {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

  getRandomFoodPosition(): GridPosition {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }
}
