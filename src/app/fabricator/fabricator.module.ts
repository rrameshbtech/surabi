import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FabricatorRoutingModule } from './fabricator-routing.module';
import { FabricatorComponent } from './fabricator.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolsPaneComponent } from './tools-pane/tools-pane.component';
import { PropertyPaneComponent } from './property-pane/property-pane.component';
import { FabricatorHeaderComponent } from './fabricator-header/fabricator-header.component';
import { FabricatorFooterComponent } from './fabricator-footer/fabricator-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FabricatorRoutingModule,
    SharedModule
  ],
  declarations: [FabricatorComponent, CanvasComponent, ToolsPaneComponent, PropertyPaneComponent, FabricatorHeaderComponent, FabricatorFooterComponent]
})
export class FabricatorModule { }
