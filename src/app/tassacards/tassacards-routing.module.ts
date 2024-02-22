import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TassacardsPage } from './tassacards.page';

const routes: Routes = [
  {
    path: '',
    component: TassacardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TassacardsPageRoutingModule {}
