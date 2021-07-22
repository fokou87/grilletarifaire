import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DotationPageRoutingModule } from './dotation-routing.module';

import { DotationPage } from './dotation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DotationPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DotationPage]
})
export class DotationPageModule {}
