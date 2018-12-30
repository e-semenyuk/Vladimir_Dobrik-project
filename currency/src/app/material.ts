import { NgModule } from "@angular/core";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatSelectModule,
        MatButtonModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatSelectModule,
        MatButtonModule,
    ]
})
export class MaterialModule {}