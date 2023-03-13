import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRamdonCards, Result } from './models/play.models';
import { PlayService } from './service/play.service';
import { takeUntil, takeWhile, finalize } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  public characters: IRamdonCards[] = [];
  public currentTime: number = 0;
  public canLoad: boolean = false;
  public time: number = 30;
  public width: number = 0;

  private obsDestroy: Subject<void> = new Subject();

  get isComplete() {
    return this.playService.pares === 10;
  }

  get intentos() {
    return this.playService.totalMovimientos;
  }

  constructor(private playService: PlayService) {}

  ngOnInit(): void {
    this.executeMethod();
  }

  setTimer() {
    const timer = (100 / this.time);
    interval(1000)
      .pipe(takeWhile(this.finalizeInterval.bind(this)))
      .subscribe(() => {
        this.currentTime++;
        this.width += timer;
      });
  }

  finalizeInterval(timer: number){
    return this.isComplete || timer < this.time;
  }

  setTime(){
    this.time+=5
  }

  executeMethod() {
    this.getCharactersImg();
  }

  getCharactersImg() {
    this.playService
      .getCharacters()
      .pipe(takeUntil(this.obsDestroy))
      .subscribe(this.setDataCharacters.bind(this));
  }

  setDataCharacters(result: Result[]) {
    this.playService.pares = 0;
    this.characters = [];
    const data = result
      .map(({ id, image }) => ({ id, image, status: false }))
      .sort(() => Math.random() - 0.5).splice(0, 10);

    const dataCopy = [...JSON.parse(JSON.stringify(data))];
    this.characters = [...data, ...dataCopy].sort(() => Math.random() - 0.5);
    setTimeout(() => (this.canLoad = true), 1200);
  }

  won() {
    this.canLoad = false;
    this.getCharactersImg();
  }

  ngOnDestroy(): void {
    this.obsDestroy.next();
    this.obsDestroy.unsubscribe();
  }
}
