import { CardComponent } from 'src/app/shared/components/card/card.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PlayService } from './service/play.service';
import { IRamdonCards } from './models/play.models';
import { ANIMATE__FLIPINX } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  @ViewChildren('card') card!: QueryList<CardComponent>;
  public characters: IRamdonCards[] = [];
  private img: string = 'assets/img/card__fondo.webp';

  get cards() {
    return this.card.toArray().map(({ card }) => card.nativeElement);
  }

  constructor(private playService: PlayService) {}

  get activeElements() {
    return this.playService.activeIndex;
  }

  ngOnInit(): void {
    this.executeMethod();
  }

  executeMethod() {
    this.getCharactersImg();
  }

  getCharactersImg() {
    this.playService.getCharacters().subscribe((res) => {
      const data = res
        .map(({ id, image }) => ({ id, image }))
        .sort(() => Math.random() - 0.5)
        .splice(0, 10);
      this.characters = [...data.concat(data)].sort(() => Math.random() - 0.5);
    });
  }

  getTotalCount(id: number) {
    this.playService.activeIndex.push(id);
    if (this.activeElements.length === 2) {
      const isEqual = this.activeElements.every((active) => active === id);
      isEqual ? this.addClass() : this.removeClass();
      const classe = this.cards.every(e=> e.classList.contains(ANIMATE__FLIPINX));
      console.log(classe);
    }
  }

  addClass() {
    this.playService.activeIndex = [];
    this.cards.forEach((e) => {
      if (e.classList.contains(ANIMATE__FLIPINX)) {
        e.classList.add('active');
      }
    });
    
  }

  removeClass() {
    this.cards.forEach((e) => {
      const isActive = e.classList.contains('active');
      if (e.classList.contains(ANIMATE__FLIPINX) && !isActive) {
        setTimeout(() => {
            e.classList.remove(ANIMATE__FLIPINX);
          e.style.backgroundImage = `url(${this.img})`;
          e.classList.remove('animate__flip');
          this.playService.activeIndex = [];
        }, 1000);
      }
    });
  }
}
