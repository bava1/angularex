import { NgModule } from "@angular/core";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
      MatSlideToggleModule,
      MatIconModule,
      MatSidenavModule,
      MatMenuModule,
      MatButtonModule,
      MatSelectModule,
      MatFormFieldModule,
      MatCardModule,
      MatExpansionModule,
      MatTableModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatInputModule
    ],
    exports: [
      MatSlideToggleModule,
      MatIconModule,
      MatSidenavModule,
      MatMenuModule,
      MatButtonModule,
      MatSelectModule,
      MatFormFieldModule,
      MatCardModule,
      MatExpansionModule,
      MatTableModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatInputModule
    ]
})

export class MaterialModule {

}
