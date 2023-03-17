import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent  {
    @Input() isWinner: boolean = true;
    @Input() time: number = 0;
    @Input() pares: number = 0;
    @Output() onNewPlay: EventEmitter<void> = new EventEmitter()

    public options = {
        path: 'assets/lottie/loader.json'
    }
    public gameOver = {
        path: 'assets/lottie/game-over.json'
    }
}