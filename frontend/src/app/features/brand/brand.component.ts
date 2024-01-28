import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { BrandService } from '../../shared/services/brand.service';
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

  constructor(private dialog: MatDialog, private brandService: BrandService) {
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

  onEditBrand(brand: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: 'Edit brand',
        btnLabel: 'Update',
        formData: [
          { name: 'Image', value: brand.image, type: FormItemType.IMAGE },
          { name: 'Name', value: brand.name, type: FormItemType.TEXT },
          { name: 'Id', value: brand.id, type: FormItemType.HIDDEN },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => this.afterDialogClosed(result));
  }

  onCreateBrand() {
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
    if (result?.data?.type == 'Update') {
      this.updateBrand(result.data);
    }

    if (result?.data?.type == 'Insert') {
      this.createBrand(result.data);
    }
  }

  createBrand(data: any) {
    const payload = {
      name: data.name,
      image: data.image
    };

    this.brandService
    .createBrand(payload)
    .subscribe(() => window.location.reload());
  }

  updateBrand(data: any) {
    const payload = {
      id: data.id,
      name: data.name,
      image: data.image,
    };

    this.brandService
    .updateBrand(payload)
    .subscribe(() => window.location.reload());
  }
}
