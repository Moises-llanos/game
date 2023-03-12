import { ACTIVE, ANIMATE__FLIPINX, ANIMATE__FLIPINY } from 'src/app/core/constants/constants';
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { PlayService } from '../../../modules/play/service/play.service';
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent {
  @ViewChild('card', { static: true }) card!: ElementRef<HTMLDivElement>;
  @Output() onInterval: EventEmitter<void> = new EventEmitter();
  @Input() dataSrc: IRamdonCards = { id: 0, image: '' };


  private get element() {
    return this.card.nativeElement;
  }
  private url: string = 'assets/img/fondo__card.jpg';
  private sonido = new Audio('assets/sonido/click.mp3');
  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  changeImg() {
    if(!this.playService.totalMovimientos) this.onInterval.emit();
    const hasFlY = this.element.classList.contains(ANIMATE__FLIPINY);
    const isActive = this.element.classList.contains(ACTIVE);
    if (!hasFlY && !isActive && this.totalCards < 2) {
      this.playService.totalMovimientos += 1
      this.playService.listCardsRef.push({ element: this.card, id: this.dataSrc.id });
      this.element.style.backgroundImage = `url(${this.dataSrc.image})`;
      this.element.classList.add(ANIMATE__FLIPINY);
      if (this.totalCards === 2) this.compareCards();
    }
  }

  compareCards() {
    const firstCard = this.playService.listCardsRef[0];
    const secondCard = this.playService.listCardsRef[1];
    firstCard.id !== secondCard.id ? this.removeClass() : this.addClass();
  }

  addClass() {
    this.sonido.play();
    this.playService.pares++;
    this.playService.listCardsRef.forEach(({ element: { nativeElement } }) => {
      nativeElement.classList.add(ACTIVE);
    });
    this.playService.listCardsRef = [];
  }

  removeClass() {
    setTimeout(() => {
      this.playService.listCardsRef.forEach(
        ({ element: { nativeElement } }) => {
          nativeElement.classList.add(ANIMATE__FLIPINX);
          nativeElement.style.backgroundImage = `url(${this.url})`;
          nativeElement.classList.remove(ANIMATE__FLIPINY);
        }
      );
      this.playService.listCardsRef = [];
    }, 900);
  }
}
