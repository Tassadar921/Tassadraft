import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TassadecksPage } from './tassadecks.page';

const routes: Routes = [
  {
    path: '',
    component: TassadecksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TassadecksPageRoutingModule {}
