import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Food } from '../game-engine/food';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Snake } from '../game-engine/snake';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  lastRenderTime = 0;
  gameOver = false;
  gameBoard: any;
  snake = new Snake();
  food = new Food(this.snake);

  get snakeSpeed(): number {
    const score = this.food.currentScore;
    if (score < 5) {
      return 10;
    } else if (score >= 5 && score < 10) {
      return 13;
    } else if (score >= 10 && score < 20) {
      return 16;
    }
    return 20;
  }

  ngOnInit(): void {
    this.snake.listenToInputs();
  }

  ngAfterViewInit(): void {
    this.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.gameOver) {
        this.restart();
      }
    });
  }

  start(currentTime: any): void {
    if (this.gameOver) {
      return console.log('Game Over');
    }

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / this.snakeSpeed) {
      return;
    }

    this.lastRenderTime = currentTime;
    this.update();
    this.draw();
  }

  dpadMovement(direction: string): void {
    this.snake.input.setDirection(direction);
  }

  update(): void {
    this.snake.update();
    this.food.update();
    this.checkDeath();
  }

  draw(): void {
    this.gameBoard.innerHTML = '';
    this.snake.draw(this.gameBoard);
    this.food.draw(this.gameBoard);
  }

  checkDeath(): void {
    this.gameOver =
      outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();

    if (!this.gameOver) {
      return;
    }

    this.gameBoard.classList.add('blur');
  }

  restart(): void {
    window.location.reload();
  }
}
