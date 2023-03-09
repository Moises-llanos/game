import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRamdonCards, Result } from './models/play.models';
import { PlayService } from './service/play.service';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MESSAGE__WINNER } from '../../core/constants/constants';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  public characters: IRamdonCards[] = [];
  public totalVidas = new Array(5);
  private obsDestroy: Subject<void> = new Subject();

  get isComplete(){
    return this.playService.pares === 10
  }

  get title(){
    return !this.isComplete ? 'Rick And Morty' : MESSAGE__WINNER
  }

  constructor(private playService: PlayService) {}

  ngOnInit(): void {
    this.executeMethod();
  }

  executeMethod() {
    this.getCharactersImg(2000);
  }

  getCharactersImg(maxDelay?: number) {
    this.playService
      .getCharacters()
      .pipe(delay(maxDelay ?? 0), takeUntil(this.obsDestroy))
      .subscribe(this.setDataCharacters.bind(this));
  }

  setDataCharacters(result: Result[]) {
    this.playService.pares = 0;
    this.characters = [];
    const data = result
      .map(({ id, image }) => ({ id, image }))
      .sort(() => Math.random() - 0.5)
      .splice(0, 10);
      
    this.characters = [...data.concat(data)].sort(() => Math.random() - 0.5);
  }

  won(){
    this.getCharactersImg();
  }

  ngOnDestroy(): void {
    this.obsDestroy.next();
    this.obsDestroy.unsubscribe();
  }

  
}
