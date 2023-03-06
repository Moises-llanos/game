import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';


@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent]
})

export class SharedModule {}