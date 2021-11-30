import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { COLUMNS } from 'src/app/models/columns';
import { CardService } from 'src/app/services/card.service';
import { CamelCasePipe } from 'src/app/camel-case.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() column!: string;
  @Input() card!: Card;

  cols = COLUMNS;
  isTheFirstColumn?: boolean;
  isTheLastColumn?: boolean;

  edit: boolean = false;

  id: string = '';
  titulo: string = '';
  conteudo: string = '';
  lista: string = '';

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.getCard();
  }

  getCard() {
    this.isTheFirstColumn = this.cols.indexOf(this.card.lista) == 0;
    this.isTheLastColumn =
      this.cols.indexOf(this.card.lista) == this.cols.length - 1;

    this.id = this.card.id;
    this.titulo = this.card.titulo;
    this.conteudo = this.card.conteudo;
    this.lista = this.card.lista;

    if (!this.id) {
      this.editMode();
    }
  }

  editMode() {
    this.edit = !this.edit;
  }

  saveCard() {
    if (this.card.id) {
      this.cardService
        .changeCardById(
          this.card.id,
          this.card.titulo,
          this.card.conteudo,
          this.card.lista
        )
        .subscribe((card) => {});
    } else {
      this.cardService
        .createNewCard(this.titulo, this.conteudo, this.lista)
        .subscribe((card) => {
          this.cardService.cardChanged.next(card);
        });
    }
    this.editMode();
  }

  cancelEdit() {
    if (this.card.id) {
      this.id = this.card.id;
      this.titulo = this.card.titulo;
      this.conteudo = this.card.conteudo;
      this.lista = this.card.lista;

      this.editMode();
    } else {
      this.titulo = '';
      this.conteudo = '';
    }
  }

  moveCardRight() {
    if (this.isTheLastColumn) {
      return;
    }
    const index = this.cols.indexOf(this.card.lista);
    this.card.lista = this.cols[index + 1];
    this.cardService
      .changeCardById(this.card.id, this.titulo, this.conteudo, this.card.lista)
      .subscribe((card) => {
        this.cardService.cardChanged.next(card);
      });
  }

  moveCardLeft() {
    if (this.isTheFirstColumn) {
      return;
    }
    const index = this.cols.indexOf(this.card.lista);
    this.card.lista = this.cols[index - 1];
    this.cardService
      .changeCardById(this.card.id, this.titulo, this.conteudo, this.card.lista)
      .subscribe((card) => {
        this.cardService.cardChanged.next(card);
      });
  }

  deleteCard() {
    this.cardService.deleteCardById(this.card.id).subscribe((cards) => {
      this.cardService.cardChanged.next(cards);
    });
  }
}
