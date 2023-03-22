import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import player from 'lottie-web';
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
