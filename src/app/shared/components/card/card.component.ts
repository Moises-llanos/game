import { Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { PlayService } from '../../../modules/play/service/play.service';
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnDestroy {
  @Input() dataSrc: IRamdonCards = { id: 0, image: '', status: false };
  @Output() onInterval: EventEmitter<void> = new EventEmitter();
  @Output() onpar: EventEmitter<void> = new EventEmitter();
  public urlBack: string = 'assets/img/fondo__card.jpg';

  get statusCard() {
    return this.dataSrc.status;
  }

  get isComplete() {
    return this.playService.pares === 10;
  }

  get hasTime() {
    return this.playService.hasTime;
  }

  private time: number = 700;
  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  setSrc(src?: string) {
    this.playService.sonido.preload = 'none';
    const url = 'assets/sonido/' + src;
    this.playService.sonido.src = url;
    
    const promise = new Promise((resolve) => {
      this.playService.sonido.onloadeddata = () => resolve(true);
    });
    
    this.playService.sonido.load();

    promise
      .then(() => this.playService.sonido.play())
      .catch(() => console.log('Algo salio mal'));
  }

  changeImg() {
    if (!this.playService.totalMovimientos) this.onInterval.emit();
    const { status, active } = this.dataSrc;
    if (!status && !active && this.totalCards < 2 && this.hasTime) {
      this.dataSrc.status = true;
      this.playService.totalMovimientos++;
      this.playService.listCardsRef.push(this.dataSrc);
      if (this.totalCards === 2) this.compareCards();
    }
  }

  compareCards() {
    const { 0: first, 1: second } = this.playService.listCardsRef;
    first.id === second.id ? this.addClass() : this.removeClass();
  }

  addClass() {
    this.onpar.emit();
    this.playService.pares++;
    this.isComplete ? this.setSrc('won.mp3') : this.setSrc('click.mp3');
    setTimeout(() => (this.playService.hasPoints = false), this.time);
    this.setStatusElements(true);
  }

  removeClass() {
    this.setSrc('failed.mp3');
    setTimeout(this.clearCards.bind(this), this.time);
  }

  setStatusElements(status: boolean) {
    this.playService.listCardsRef[0].status = status;
    this.playService.listCardsRef[1].status = status;
    this.playService.listCardsRef = [];
  }

  clearCards() {
    this.setStatusElements(false);
  }

  ngOnDestroy(): void {
    this.playService.sonido.currentTime = 0;
    this.playService.sonido.pause();
  }
}
