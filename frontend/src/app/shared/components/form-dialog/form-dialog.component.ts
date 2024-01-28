import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialogData } from '../../models/form-dialog-data';

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
      id: this.dialogData?.formData?.find(x => x.name == 'Id')?.value,
      name: this.dialogData?.formData?.find(x => x.name == 'Name')?.value,
      image: this.dialogData?.formData?.find(x => x.name == 'Image')?.value,
    } });
  }
}
