import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})

export class LoadingComponent {
    public options = {
        path: 'assets/lottie/loading.json'
    }
}