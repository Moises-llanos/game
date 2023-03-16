import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'play',
    loadChildren: ()=> import('./modules/play/play.module').then(m=> m.PlayModule),
    title: 'Es hora de jugar'
  },
  {
    path: '**',
    redirectTo: 'play'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
