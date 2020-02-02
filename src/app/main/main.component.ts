import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ApiService} from '../services/api.service';
// @ts-ignore
const axios = require('axios').default;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  drinks = [];
  ingredient: '';
  instructions: '';
  ingredients: any[];
  list = [];
  loaded = false;
  listLoaded = false;
  drinksLoaded = false;
  ingredientsP = 1;
  drinksP = 1;
  card = {
    title : '',
    img : '',
    ingredients : [],
    instructions: ''
  };
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getList();
    this.apiService.getIngredients();
  }

  getValue(form: NgForm) {
    const value = form.value;
    this.ingredient = value.ingredient;
    this.getRecipe();
    form.reset();
  }

  getRecipe() {
    console.log(this.ingredient);
    axios({
      url: 'https://the-cocktail-db.p.rapidapi.com/filter.php?i=' + this.ingredient,
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '251854462amsh5d41e0473010378p126a48jsn1accd11f0ea6'
      }
    })
      .then((response) => {
        this.drinks = response.data.drinks;
        this.listLoaded = false;
        this.drinksLoaded = true;
      });
  }

  getInfo(id) {
    fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + id, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '944bc1f42emsh77c4b09c86e7efcp11a922jsnf44f7f84f662'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const ing1 = data.drinks[0].strIngredient1;
        const ing2 = data.drinks[0].strIngredient2;
        const ing3 = data.drinks[0].strIngredient3;
        const ing4 = data.drinks[0].strIngredient4;
        const ing5 = data.drinks[0].strIngredient5;
        const ing6 = data.drinks[0].strIngredient6;
        this.card.title = data.drinks[0].strDrink;
        this.card.img = data.drinks[0].strDrinkThumb;
        this.card.instructions = data.drinks[0].strInstructions;
        this.card.ingredients = [ing1, ing2, ing3, ing4, ing5, ing6];
        this.loaded = true;
        console.log(this.instructions);
        console.log(this.ingredients);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getList() {
    fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '944bc1f42emsh77c4b09c86e7efcp11a922jsnf44f7f84f662'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.drinks.forEach(item => {
          this.list.push(item);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showList($event) {
    $event.preventDefault();
    this.listLoaded = !this.listLoaded;
    this.drinksLoaded = false;
    this.loaded = false;
  }
  changeForm(newIngredient) {
    this.ingredient = newIngredient;
    this.getRecipe();
  }
}
