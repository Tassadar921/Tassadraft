import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TassadraftPage } from './tassadraft.page';

const routes: Routes = [
  {
    path: '',
    component: TassadraftPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TassadraftPageRoutingModule {}
