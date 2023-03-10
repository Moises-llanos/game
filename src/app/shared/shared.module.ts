import { TitleWonComponent } from './components/title-won/title-won.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/card/card.component';
import { WonComponent } from './components/won/won.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';




@NgModule({
    declarations: [
        TitleWonComponent,
        LoadingComponent,
        CardComponent,
        WonComponent,
    ],
    exports: [
        TitleWonComponent,
        LoadingComponent,
        CardComponent,
        WonComponent,
    ],
    imports: [
        CommonModule,
        LottieModule
    ]
})

export class SharedModule {}