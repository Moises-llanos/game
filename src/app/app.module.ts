import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [ 
        LottieModule.forRoot({ player: ()=> player }),
        BrowserAnimationsModule,
        AppRoutingModule, 
        HttpClientModule, 
        BrowserModule,

      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
