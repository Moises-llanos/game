import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRamdonCards, Result } from './models/play.models';
import { PlayService } from './service/play.service';
import { takeUntil, takeWhile } from 'rxjs/operators';
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

  get isWinner(){
    return this.playService.isWinner
  }

  get isComplete() {
    return this.playService.pares === 10;
  }

  get pares(){
    return this.playService.pares
  }

  get intentos() {
    return this.playService.totalMovimientos;
  }

  get hasPoints(){
    return this.playService.hasPoints
  }

  constructor(private playService: PlayService) {}

  ngOnInit(): void {
    this.executeMethod();
  }

  setTimer() {
    interval(1000)
      .pipe(takeWhile(this.finalizeInterval.bind(this)))
      .subscribe(this.setProgress.bind(this));
  }

  setProgress(){
    this.currentTime++;
    this.width = (this.currentTime / this.time) * 100;
  }

  finalizeInterval(timer: number) {
    const hasFinalize = ![this.isComplete, timer === this.time].includes(true);
    if (timer === this.time && !this.isComplete) this.playService.isWinner = false;
    return hasFinalize;
  }

  setTime() {
    this.time += 5;
    this.playService.hasPoints = true;
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
    const data = result
      .map(({ id, image }) => ({ id, image, status: false }))
      .sort(() => Math.random() - 0.5)
      .splice(0, 10);

    const dataCopy = [...JSON.parse(JSON.stringify(data))];
    this.characters = [...data, ...dataCopy].sort(() => Math.random() - 0.5);
    setTimeout(() => (this.canLoad = true), 1300);
  }

  won() {
    this.playService.totalMovimientos = 0;
    this.playService.listCardsRef = [];
    this.playService.hasPoints = false;
    this.playService.isWinner = true;
    this.playService.pares = 0;
    this.canLoad = false;
    this.currentTime = 0;
    this.characters = [];
    this.width = 0;
    this.time = 30;
    this.getCharactersImg();
  }

  ngOnDestroy(): void {
    this.obsDestroy.next();
    this.obsDestroy.unsubscribe();
  }
}
