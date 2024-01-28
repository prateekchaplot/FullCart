import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { BrandService } from '../../shared/services/brand.service';
import { AppService } from '../../shared/services/app.service';
import { FormItemType } from '../../shared/models/form-dialog-data';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  columns = ['id', 'name', 'actions'];
  dataSource: any[] = [];

  constructor(private dialog: MatDialog, private brandService: BrandService, private appService: AppService) {
    this.fetchBrands();
  }

  openDialog(brand: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete brand',
        description: `Are you sure you want to delete the brand - ${brand.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      this.brandService
      .deleteBrand(brand.id)
      .subscribe(() => window.location.reload());
    });
  }

  fetchBrands() {
    this.brandService.fetchBrands().subscribe(data => {
      this.dataSource = data;
    });
  }

  editBrand(brand: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: 'Edit brand',
        btnLabel: 'Update',
        formData: [
          { name: 'Image', value: brand.image, type: FormItemType.IMAGE },
          { name: 'Name', value: brand.name, type: FormItemType.TEXT },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => this.afterDialogClosed(result));
  }

  createBrand() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: 'Create brand',
        btnLabel: 'Insert',
        formData: [
          { name: 'Image', value: '', type: FormItemType.IMAGE },
          { name: 'Name', value: '', type: FormItemType.TEXT },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => this.afterDialogClosed(result));
  }

  afterDialogClosed(result: any) {
    if (result.data.type == 'Update') {
      console.log('Update');
    }

    if (result.data.type == 'Insert') {
      console.log('Insert');
    }
  }
}
