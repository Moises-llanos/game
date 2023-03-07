import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ANIMATE__FLIPINX, ACTIVE, MESSAGE__WON } from '../../core/constants/constants';
import { ANIMATE__FLIPINY } from 'src/app/core/constants/constants';
import { IRamdonCards, Result } from './models/play.models';
import { PlayService } from './service/play.service';
import { NgxEmergenteService } from 'ngx-emergente';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {
  @ViewChildren('card') card!: QueryList<CardComponent>;
  public characters: IRamdonCards[] = [];
  public isWinner: boolean = false;

  private img: string = 'assets/img/fondo__card.jpg';
  private obsDestroy: Subject<void> = new Subject();

  private get cards() {
    return this.card.toArray().map(({ card }) => card.nativeElement);
  }

  private get activeElements() {
    return this.playService.activeIndex;
  }

  constructor(private playService: PlayService, private ngxAlert: NgxEmergenteService) {}


  ngOnInit(): void {
    this.executeMethod();
  }

  executeMethod() {
    this.getCharactersImg();

  }

  getCharactersImg() {
    this.playService
      .getCharacters()
      .pipe(delay(2000), takeUntil(this.obsDestroy))
      .subscribe(this.setDataCharacters.bind(this));
  }

  setDataCharacters(result: Result[]) {
    this.characters = [];
    this.isWinner = false;
    const data = result
      .map(({ id, image }) => ({ id, image }))
      .sort(() => Math.random() - 0.5).splice(0, 10);
    this.characters = [...data.concat(data)].sort(() => Math.random() - 0.5);
  }


  async getTotalCount(id: number) {
    this.playService.activeIndex.push(id);
    if (this.activeElements.length === 2) {
      const isEqual = this.activeElements.every((active) => active === id);
      isEqual ? this.addClass() : this.removeClass();
      this.isWinner = this.cards.every((e) => e.classList.contains(ANIMATE__FLIPINY));
      if(this.isWinner ) {
        const response = await this.ngxAlert.open({ 
          type: 'Actualizar', title: MESSAGE__WON,
          messageBtnConfirm: 'Siguiente',
          singleBtn: true,

        })
        if(response) this.getCharactersImg();
      }
      
    }
  }

  addClass() {
    this.playService.activeIndex = [];
    this.cards.forEach((e) => {
      if (e.classList.contains(ANIMATE__FLIPINY)) {
        e.classList.add(ACTIVE);
      }
    });
  }

  removeClass() {
    this.cards.forEach((e) => {
      const isActive = e.classList.contains(ACTIVE);
      if (e.classList.contains(ANIMATE__FLIPINY) && !isActive) {
        setTimeout(() => {
          e.classList.remove(ANIMATE__FLIPINY);
          e.style.backgroundImage = `url(${this.img})`;
          e.classList.add(ANIMATE__FLIPINX);
          this.playService.activeIndex = [];
        }, 500);
      }
    });
  }

  ngOnDestroy(): void {
    this.obsDestroy.next();
    this.obsDestroy.unsubscribe();
  }

  
}
