import { Component, Input } from "@angular/core";
@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent  {
    @Input() isWinner: boolean = true;
    public options = {
        path: 'assets/lottie/loader.json'
    }
    public gameOver = {
        path: 'assets/lottie/game-over.json'
    }
}