import { Component } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { states } from './state';
import { combineLatest, Observable, of } from 'rxjs';

interface State {
  abbreviation: string;
  name: string;
}

const usersState = 'Alaska';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  states$: Observable<State[]> = of(states);
  filteredStates$: Observable<State[]>;
  filter: FormControl = new FormControl('');
  filter$: Observable<string>;

  constructor() {
    this.filter$ = this.filter.valueChanges.pipe(startWith(...usersState));
    this.filteredStates$ = combineLatest([this.states$, this.filter$]).pipe(
      map(([states, filterString]) =>
        states.filter(
          (state) =>
            state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        )
      )
    );
  }
}
