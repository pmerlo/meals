import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MealAddComponent } from './meal-add/meal-add.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealCardComponent } from './meal-card/meal-card.component';
import { MealDeleteDialogComponent } from './meal-delete-dialog/meal-delete-dialog.component';

@NgModule({
  declarations: [
    MealAddComponent,
    MealListComponent,
    MealCardComponent,
    MealDeleteDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MealAddComponent, MealListComponent],
})
export class MealsModule {}
