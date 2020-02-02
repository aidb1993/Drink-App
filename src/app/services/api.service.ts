import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ingredients = [];
  constructor() { }
  getIngredients(): Observable<any> {
    fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '944bc1f42emsh77c4b09c86e7efcp11a922jsnf44f7f84f662'
      }
    })
      .then(response => {
        return response.json();
      }).then(data => {
        this.ingredients = data.drinks;
        console.log(this.ingredients);
    })
      .catch(err => {
        console.log(err);
      });
    return of (this.ingredients);
  }
}
