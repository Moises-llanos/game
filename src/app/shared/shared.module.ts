import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WonComponent } from './components/won/won.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        CardComponent,
        LoadingComponent,
        WonComponent
    ],
    exports: [
        CardComponent,
        LoadingComponent,
        WonComponent
    ],
    imports: [CommonModule]
})

export class SharedModule {}