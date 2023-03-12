import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent  {
  public wons = new Array(199);
  trackByeIndex(index: number){
    return index
  }
}
