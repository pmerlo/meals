import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from 'src/app/models';
import {
  DialogData,
  MealDeleteDialogComponent,
} from '../meal-delete-dialog/meal-delete-dialog.component';

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

  constructor(public dialog: MatDialog) {}

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
    const dialogData: DialogData = {
      name: this.meal.name,
      date: this.meal.date,
    };
    const dialogRef = this.dialog.open(MealDeleteDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(this.meal);
      }
    });
  }

  getColor(): string {
    if (this.meal.stock > 5) return 'green';
    if (this.meal.stock > 2) return 'orange';
    if (this.meal.stock > 0) return 'red;';
    return 'gray';
  }
}
