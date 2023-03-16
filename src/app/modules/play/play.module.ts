import { NgModule } from '@angular/core';
import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PlayComponent],
    imports: [PlayRoutingModule, SharedModule, CommonModule]
})

export class PlayModule {}