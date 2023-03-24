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
    this.width = (this.currentTime / this.time) * 100;
  }
  
  finalizeInterval(timer: number) {
    if(this.currentTime !== this.time) this.currentTime++;
    const hasFinalize = ![this.isComplete, timer === this.time].includes(true);
    if (timer === this.time && !this.isComplete) this.playService.isWinner = false;
    if(!hasFinalize) this.playService.hasTime = false;
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
    const data = result.map(({ id, image }) => ({ id, image, status: false }))
    const cutData = data.splice(0, 10)
    const dataCopy = [...JSON.parse(JSON.stringify(cutData))];
    this.characters = this.sortData([...this.sortData(cutData).concat(this.sortData(dataCopy))])
    setTimeout(() => this.canLoad = true, 1000);
  }

  won() {
    this.resetData();
    this.getCharactersImg();
  }

  sortData(data: IRamdonCards[]){
    return data.sort(()=> Math.random() - 0.5)
  }

  resetData(){
    this.playService.totalMovimientos = 0;
    this.playService.listCardsRef = [];
    this.playService.hasPoints = false;
    this.playService.isWinner = true;
    this.playService.hasTime = true;
    this.playService.pares = 0;
    this.canLoad = false;
    this.currentTime = 0;
    this.characters = [];
    this.width = 0;
    this.time = 30;
  }

  ngOnDestroy(): void {
    this.obsDestroy.next();
    this.obsDestroy.unsubscribe();
  }
}
