import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/models';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  @Input() meals: Meal[] = [];
  @Output() stockChange = new EventEmitter<Meal>();
  @Output() edit = new EventEmitter<Meal>();

  visibleMeals: Meal[] = [];
  historyVisible = false;
  dateAscending = true;

  ngOnInit(): void {
    this.refreshList();
  }

  showHistory(): void {
    this.historyVisible = true;
    this.refreshList();
  }

  hideHistory(): void {
    this.historyVisible = false;
    this.refreshList();
  }

  changeSort(): void {
    this.dateAscending = !this.dateAscending;
    this.refreshList();
  }

  updateMeal(meal: Meal): void {
    this.refreshList();
    this.stockChange.emit(meal);
  }

  editMeal(meal: Meal): void {
    this.edit.emit(meal);
  }

  private refreshList(): void {
    this.visibleMeals = this.meals
      .filter((item) => item.stock > 0 || this.historyVisible)
      .sort((a, b) => {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return this.dateAscending ? diff : -diff;
      });
  }
}
