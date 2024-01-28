import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormData, FormDialogData } from '../../models/form-dialog-data';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent {
  dialogData: FormDialogData | undefined;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData) {
      this.dialogData = data;
  }

  onClick() {
    this.dialogRef.close({ data: {
      type: this.dialogData?.btnLabel,
    } });
  }
}
