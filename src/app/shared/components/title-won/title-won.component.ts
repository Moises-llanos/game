import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent {
    @Input() canWinner: boolean = false;

    public wons = new Array(199)
    public options = {
        path: 'assets/lottie/loader.json'
    }
}