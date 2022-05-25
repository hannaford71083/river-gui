import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    imports: [ MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatGridListModule, MatMenuModule, MatTableModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDialogModule, MatCardModule ],
    exports: [ MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatGridListModule, MatMenuModule, MatTableModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatDialogModule, MatCardModule ],
})
export class MaterialModule { }