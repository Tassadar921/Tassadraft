import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tassadraft',
    loadChildren: () => import('./tassadraft/tassadraft.module').then( m => m.TassadraftPageModule)
  },
  {
    path: '',
    redirectTo: 'tassadraft',
    pathMatch: 'full'
  },  {
    path: 'tassacards',
    loadChildren: () => import('./tassacards/tassacards.module').then( m => m.TassacardsPageModule)
  },
  {
    path: 'tassadecks',
    loadChildren: () => import('./tassadecks/tassadecks.module').then( m => m.TassadecksPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
