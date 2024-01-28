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

  async onFileSelected(event: any) {
    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    const file = event.target.files[0];
    let dataURI = await toBase64(file);

    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);

    let img = this.data.formData.find(x => x.name == 'Image');
    if (img) img.value = base64;
  }
}
