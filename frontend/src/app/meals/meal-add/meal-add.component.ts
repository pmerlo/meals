import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meal } from 'src/app/models';

@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.scss'],
})
export class MealAddComponent implements OnInit {
  nameFormControl = new FormControl<string>('', Validators.required);
  portionsFormControl = new FormControl<number>(0, Validators.required);
  dateFormControl = new FormControl<Date>(new Date(), Validators.required);
  mealForm: FormGroup = new FormGroup({});

  @Input() inputMeal: Partial<Meal> = {};
  @Output() add = new EventEmitter<Partial<Meal>>();

  constructor(private formBuilder: FormBuilder) {
    this.onReset();
    this.mealForm = this.formBuilder.group({
      ingredients: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    const name = this.inputMeal.name ? this.inputMeal.name : '';
    this.nameFormControl.setValue(name);
  }

  ingredients(): FormArray {
    return this.mealForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.formBuilder.group({
      name: '',
      qty: '',
    });
  }

  addIngredient() {
    this.ingredients().push(this.newIngredient());
  }

  removeIngredient(index: number) {
    this.ingredients().removeAt(index);
  }

  onSubmit(): void {
    const data: Meal = {
      name: this.nameFormControl.value,
      portions: this.portionsFormControl.value,
      stock: this.portionsFormControl.value,
      date: this.dateFormControl.value,
      ...this.mealForm.value,
    };
    this.add.emit(data);
  }

  onReset(): void {
    this.nameFormControl.setValue(null);
    this.portionsFormControl.setValue(null);
    this.dateFormControl.setValue(new Date());

    this.mealForm = this.formBuilder.group({
      ingredients: this.formBuilder.array([]),
    });
  }

  isFormValid(): boolean {
    return (
      this.nameFormControl.valid &&
      this.portionsFormControl.valid &&
      this.dateFormControl.valid
    );
  }
}
