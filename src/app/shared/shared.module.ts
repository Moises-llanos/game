import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WonComponent } from './components/won/won.component';
import { CommonModule } from '@angular/common';
import { TitleWonComponent } from './components/title-won/title-won.component';


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
        WonComponent
    ],
    imports: [CommonModule]
})

export class SharedModule {}