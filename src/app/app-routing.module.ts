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
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
