import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  date: string;
}

@Component({
  selector: 'app-meal-delete-dialog',
  templateUrl: './meal-delete-dialog.component.html',
  styleUrls: ['./meal-delete-dialog.component.scss'],
})
export class MealDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MealDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
