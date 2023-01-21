import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Meal } from 'src/app/models';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent {
  @Input() meal!: Meal;
  @Output() stockChange = new EventEmitter<Meal>();
  @Output() copy = new EventEmitter<Meal>();
  @Output() delete = new EventEmitter<Meal>();

  decreaseStock(): void {
    this.meal.stock = Math.max(0, this.meal.stock - 1);
    this.stockChange.emit(this.meal);
  }

  increaseStock(): void {
    this.meal.stock = Math.min(this.meal.portions, this.meal.stock + 1);
    this.stockChange.emit(this.meal);
  }

  copyMeal(): void {
    this.copy.emit(this.meal);
  }

  deleteMeal(): void {
    this.delete.emit(this.meal);
  }

  getColor(): string {
    const ratio = this.meal.stock / this.meal.portions;
    if (ratio > 0.66) return '#e0ffe0';
    if (ratio > 0.33) return '#ffffe0';
    if (ratio > 0.0) return '#ffe0e0;';
    return '#fafafa';
  }
}
