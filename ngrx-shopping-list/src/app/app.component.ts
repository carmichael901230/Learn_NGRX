import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AppState } from './store/models/app-state.model';
import { AddItemAction, DeleteItemAction, LoadShoppingAction  } from './store/actions/shopping.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: '', name: '' };    // new item added from input box
  loading$: Observable<Boolean>;
  error$: Observable<Error>;
  
  constructor(private store: Store<AppState>) {
    
  }
  title = 'ngrx-shopping-list';
  ngOnInit(): void {
    // loading store state into component
    this.shoppingItems = this.store.select(store => store.shopping.list);   
    this.loading$  = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);

    // load initial state 
    this.store.dispatch(new LoadShoppingAction());
  }
  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));   // fire signal to add new item

    this.newShoppingItem = { id: '', name: '' };
  }

  deleteItem(item: ShoppingItem) {
    this.store.dispatch(new DeleteItemAction(item));
  }
}
