import { Component, OnInit } from '@angular/core';
import { MealsService } from './services';
import { Meal } from './models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  meals$: Observable<Meal[]> = of([]);
  inputMeal: Partial<Meal> = {};
  displayList = true;
  displayForm = false;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.meals$ = this.mealsService.getAll();
  }

  showList(): void {
    this.displayList = true;
    this.displayForm = false;
  }

  addNew(): void {
    this.inputMeal = {};
    this.showForm();
  }

  showForm(): void {
    this.displayList = false;
    this.displayForm = true;
  }

  addMeal(data: Partial<Meal>): void {
    this.mealsService.add(data).subscribe(() => {
      this.showList();
      this.ngOnInit();
    });
  }

  updateMeal(meal: Meal): void {
    this.mealsService.update(meal).subscribe((value) => {
      meal.portions = value.portions;
      meal.stock = value.stock;
      meal.modified = value.modified;
      this.showList();
    });
  }

  deleteMeal(id: string): void {
    this.mealsService.delete(id).subscribe(() => this.showList());
  }

  editMeal(meal: Meal): void {
    this.inputMeal = meal;
    this.showForm();
  }

  onCancel(): void {
    this.showList();
  }

  versionHash(): string {
    return environment.appVersion;
  }
}
