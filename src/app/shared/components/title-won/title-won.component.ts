import { Component, AfterViewInit, OnDestroy } from "@angular/core";
@Component({
    selector: 'app-title-won',
    templateUrl: './title-won.component.html',
    styleUrls: ['./title-won.component.scss']
})

export class TitleWonComponent implements AfterViewInit, OnDestroy {
    public canView: boolean = false;
    public options = {
        path: 'assets/lottie/loader.json'
    }


    ngAfterViewInit(){
        setTimeout(()=> this.canView = true,500)
    }

    ngOnDestroy(): void {
        this.canView = false;
    }
}