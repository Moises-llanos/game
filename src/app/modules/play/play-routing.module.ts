import { RouterModule, Route } from '@angular/router';
import { PlayComponent } from './play.component';
import { NgModule } from '@angular/core';

const route: Route[] = [{ path: '', component: PlayComponent }]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class PlayRoutingModule {}