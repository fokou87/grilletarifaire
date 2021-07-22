import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DotationPage } from './dotation.page';

const routes: Routes = [
  {
    path: '',
    component: DotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DotationPageRoutingModule {}
