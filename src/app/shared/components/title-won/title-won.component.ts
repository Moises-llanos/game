import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent  {
    @Output() onNewPlay: EventEmitter<void> = new EventEmitter()
    @Input() isActive: boolean = false;
    @Input() isWinner: boolean = true;
    @Input() intentos: number = 0;
    @Input() pares: number = 0;
    @Input() time: number = 0;

    public options = {
        path: 'assets/lottie/loader.json'
    }
    public gameOver = {
        path: 'assets/lottie/game-over.json'
    }
}