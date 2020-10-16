import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AkinatorRootComponent } from './akinator-root/akinator-root.component';
import { AkinatorNavigateComponent } from './akinator-navigate/akinator-navigate.component';

const akinatorRoutes: Routes = [
  {
      path: 'akinator',
      children: [
        { path: 'root', component: AkinatorRootComponent },
        { path: 'akinator-navigate', component: AkinatorNavigateComponent },
      ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(akinatorRoutes)
  ],
  exports: [RouterModule]
})
export class NeoAkinatorRoutingModule { }
