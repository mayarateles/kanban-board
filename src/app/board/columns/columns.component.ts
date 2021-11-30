import { Component, Input, OnInit } from '@angular/core';

import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent implements OnInit {
  @Input() column!: string;
  @Input() cards!: Card[];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  onCardChanged(cd: Card) {
    this.cards.forEach((card) => {
      if (card.id === cd.id) {
        card.conteudo = cd.conteudo;
        card.titulo = cd.titulo;
        card.lista = cd.lista;
      }
    });
  }

  onCreateCard() {
    this.cards.unshift({
      titulo: '',
      conteudo: '',
      lista: this.column,
      id: '',
    });
  }
}
