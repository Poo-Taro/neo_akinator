import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NeoAkinatorModule } from './features/neo-akinator/neo-akinator.module';
import { NgxElectronModule } from 'ngx-electron';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgxElectronModule,
    PortalModule,
    NeoAkinatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
