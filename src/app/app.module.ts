import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [ 
        LottieModule.forRoot({ player: ()=> player }),
        BrowserAnimationsModule,
        AppRoutingModule, 
        HttpClientModule, 
        BrowserModule,
        SharedModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
