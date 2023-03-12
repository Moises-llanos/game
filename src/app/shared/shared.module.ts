import { TitleWonComponent } from './components/title-won/title-won.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { ProgressComponent } from './components/progress/progress.component';




@NgModule({
    declarations: [
        TitleWonComponent,
        LoadingComponent,
        ProgressComponent,
        CardComponent,
    ],
    exports: [
        TitleWonComponent,
        ProgressComponent,
        LoadingComponent,
        CardComponent,
    ],
    imports: [
        CommonModule,
        LottieModule
    ]
})

export class SharedModule {}