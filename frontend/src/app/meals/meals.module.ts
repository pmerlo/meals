import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealCardComponent } from './meal-card/meal-card.component';

@NgModule({
  declarations: [MealEditComponent, MealListComponent, MealCardComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MealEditComponent, MealListComponent],
})
export class MealsModule {}
