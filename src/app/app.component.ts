import { Component } from '@angular/core';
import { PlayService } from './modules/play/service/play.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  get isComplete() {
    return this.playService.pares === 10;
  }

  

  constructor(private playService: PlayService){}
}
