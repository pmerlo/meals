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
  @Output() edit = new EventEmitter<Meal>();

  constructor() {}

  decreaseStock(): void {
    this.meal.stock = Math.max(0, this.meal.stock - 1);
    this.stockChange.emit(this.meal);
  }

  increaseStock(): void {
    this.meal.stock = Math.min(this.meal.portions, this.meal.stock + 1);
    this.stockChange.emit(this.meal);
  }

  onEdit(): void {
    this.edit.emit(this.meal);
  }

  getColor(): string {
    if (this.meal.stock > 5) return 'green';
    if (this.meal.stock > 2) return 'orange';
    if (this.meal.stock > 0) return 'red;';
    return 'gray';
  }

  getName(): string {
    const maxLength = 20;
    if (this.meal.name.length > maxLength) {
      return this.meal.name.slice(0, maxLength) + '...';
    }
    return this.meal.name;
  }
}
