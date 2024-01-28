import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { BrandService } from '../../shared/services/brand.service';
import { Router } from '@angular/router';

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
}
