import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  authorization: string = localStorage.getItem('auth') || '';
  cards!: Card[];

  cardChanged = new Subject();
  isLogged = new Subject();

  requestAuthorization(login: string, senha: string) {
    const url = this.baseUrl + '/login/';
    const loginData = { login: login, senha: senha };
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const response = this.http.post<string>(url, loginData, {
      headers: headers,
    });

    return response;
  }

  setAuth(auth: string) {
    this.authorization = 'Bearer ' + auth;
    localStorage.setItem('auth', this.authorization);
    this.isLogged.next(true);
  }

  clearAuth() {
    this.authorization = '';
    localStorage.removeItem('auth');
    this.isLogged.next(true);
  }

  getCardsFromServer() {
    const url = this.baseUrl + '/cards/';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', this.authorization);
    const response = this.http.get<Card[]>(url, { headers: headers });
    return response;
  }

  createNewCard(titulo: string, conteudo: string, lista: string) {
    let card = new Card('', titulo, conteudo, lista);
    const url = this.baseUrl + '/cards/';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', this.authorization);
    const options = { headers: headers };
    const response = this.http.post<Card[]>(url, card, { headers: headers });
    return response;
  }

  changeCardById(id: string, titulo: string, conteudo: string, lista: string) {
    const url = this.baseUrl + '/cards/' + id;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.authorization,
    };
    const options = { headers: headers };
    const response = this.http.put<Card[]>(
      url,
      { id, titulo, conteudo, lista },
      options
    );
    return response;
  }

  deleteCardById(id: string) {
    const url = this.baseUrl + '/cards/' + id;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.authorization,
    };
    const options = { headers: headers };
    const response = this.http.delete(url, options);
    return response;
  }
}
