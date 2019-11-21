import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects'
import { 
    LoadShoppingAction, 
    ShoppingActionTypes, 
    LoadShoppingSuccessAction, 
    LoadShoppingFailureAction, 
    AddItemAction, AddItemSuccessAction, 
    AddItemFailureAction, DeleteItemAction, 
    DeleteItemSuccessAction, 
    DeleteItemFailureAction 
} from '../actions/shopping.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ShoppingService } from 'src/app/shopping.service';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects {
    @Effect()
    loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItem()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(error => of(new LoadShoppingFailureAction(error)))
                    )
            )
        );
    @Effect() 
    addShoppingItem$ = this.actions$
    .pipe(
        ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
        mergeMap(
        (data) => this.shoppingService.addShoppingItem(data.payload)
            .pipe(
            map(() => 
                new AddItemSuccessAction(data.payload)
            ),
            catchError(error => of(new AddItemFailureAction(error)))
            )
        )
    )
    
    @Effect() 
    deleteShoppingItem$ = this.actions$
    .pipe(
        ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
        mergeMap(
        (data) => this.shoppingService.deleteShoppingItem(data.payload)
            .pipe(
            map(() => new DeleteItemSuccessAction(data.payload)),
            catchError(error => of(new DeleteItemFailureAction(error)))
            )
        )
    )

    constructor(private actions$: Actions, private shoppingService: ShoppingService) {}

}