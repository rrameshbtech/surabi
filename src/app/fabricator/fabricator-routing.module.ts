import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FabricatorComponent } from './fabricator.component';
import { AuthGuard } from '@app/core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FabricatorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricatorRoutingModule { }
