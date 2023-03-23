import { TitleWonComponent } from './components/title-won/title-won.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ShowComponent } from './components/show/show.component';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        TitleWonComponent,
        LoadingComponent,
        CardComponent,
        ShowComponent,
    ],
    exports: [
        TitleWonComponent,
        LoadingComponent,
        CardComponent,
    ],
    imports: [ CommonModule, LottieModule]
})

export class SharedModule {}