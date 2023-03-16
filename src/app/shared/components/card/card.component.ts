import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayService } from '../../../modules/play/service/play.service';
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent {
  @Input() dataSrc: IRamdonCards = { id: 0, image: '', status: false };
  @Output() onInterval: EventEmitter<void> = new EventEmitter();
  @Output() onpar: EventEmitter<void> = new EventEmitter();
  public urlBack: string = 'assets/img/fondo__card.jpg';

  get statusCard(){
    return this.dataSrc.status;
  }
  
  private sonido = new Audio('assets/sonido/click.mp3');

  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  changeImg() {
    if(!this.playService.totalMovimientos) this.onInterval.emit();
    const { status, active } = this.dataSrc;
    if (!status && !active && this.totalCards < 2) {
      this.playService.totalMovimientos += 1
      this.playService.listCardsRef.push(this.dataSrc);
      this.dataSrc.status = true;
      if (this.totalCards === 2) this.compareCards();
    }
  }

  compareCards() {
    const firstCard = this.playService.listCardsRef[0];
    const secondCard = this.playService.listCardsRef[1];
    firstCard.id !== secondCard.id ? this.removeClass() : this.addClass();
  }

  addClass() {
    this.onpar.emit();
    this.sonido.play();
    navigator.vibrate(200)
    this.playService.pares++;
    this.playService.listCardsRef.forEach((e) => e.active = true);
    this.playService.listCardsRef = [];
  }

  removeClass() {
    setTimeout(() => {
      this.playService.listCardsRef.forEach(e => e.status = false);
      this.playService.listCardsRef = [];
    }, 900);
  }
}
