import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  title = '';
  description = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data?.title;
    this.description = data?.description;
  }
}
