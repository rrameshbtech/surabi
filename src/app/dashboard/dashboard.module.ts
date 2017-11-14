import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricatorModule } from '../fabricator/fabricator.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FabricatorModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
