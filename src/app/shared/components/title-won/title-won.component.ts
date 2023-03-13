import { Component, Input } from "@angular/core";
@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent {
    @Input() canWon: boolean = false;
    public options = {
        path: 'assets/lottie/loader.json'
    }
}