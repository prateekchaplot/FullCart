import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { FormDialogComponent } from '../../shared/components/form-dialog/form-dialog.component';
import { FormItemType } from '../../shared/models/form-dialog-data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  columns = ['id', 'name', 'actions'];
  dataSource: any[] = [];

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {
    this.fetchCategories();
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
      this.categoryService
      .deleteCategory(brand.id)
      .subscribe(() => window.location.reload());
    });
  }

  fetchCategories() {
    this.categoryService.fetchCategories().subscribe(data => {
      this.dataSource = data;
    });
  }

  onEditCategory(brand: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: 'Edit category',
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

  onCreateCategory() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: 'Create category',
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
      this.updateCategory(result.data);
    }

    if (result?.data?.type == 'Insert') {
      this.createCategory(result.data);
    }
  }

  createCategory(data: any) {
    const payload = {
      name: data.name,
      image: data.image
    };

    this.categoryService
    .createCategory(payload)
    .subscribe(() => window.location.reload());
  }

  updateCategory(data: any) {
    const payload = {
      id: data.id,
      name: data.name,
      image: data.image,
    };

    this.categoryService
    .updateCategory(payload)
    .subscribe(() => window.location.reload());
  }
}
