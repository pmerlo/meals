import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meal } from 'src/app/models';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss'],
})
export class MealEditComponent implements OnInit {
  nameFormControl = new FormControl<string>('', Validators.required);
  portionsFormControl = new FormControl<number>(0, Validators.required);
  dateFormControl = new FormControl<Date>(new Date(), Validators.required);
  mealForm: FormGroup = new FormGroup({});

  @Input() inputMeal: Partial<Meal> = {};
  @Output() add = new EventEmitter<Partial<Meal>>();
  @Output() update = new EventEmitter<Meal>();
  @Output() delete = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.mealForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const name = this.inputMeal.name ? this.inputMeal.name : '';
    this.nameFormControl.setValue(name);

    const portions = this.inputMeal.portions ? this.inputMeal.portions : 0;
    this.portionsFormControl.setValue(portions);
  }

  isEditMode(): boolean {
    return '_id' in this.inputMeal;
  }

  onSubmit(): void {
    const data: Meal = {
      name: this.nameFormControl.value,
      portions: this.portionsFormControl.value,
      stock: this.portionsFormControl.value,
      date: this.dateFormControl.value,
      modified: this.dateFormControl.value,
      ...this.mealForm.value,
    };
    if (this.isEditMode()) {
      data._id = this.inputMeal._id!;
      this.update.emit(data);
    } else {
      this.add.emit(data);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    this.delete.emit(this.inputMeal._id!);
  }

  isFormValid(): boolean {
    return (
      this.nameFormControl.valid &&
      this.portionsFormControl.valid &&
      this.dateFormControl.valid
    );
  }
}
