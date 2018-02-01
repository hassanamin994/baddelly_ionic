import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../providers/api.service';

@Component({
    selector: 'app-searchbar',
    templateUrl: 'searchbar.component.html'
})
export class SearchbarComponent {
    @Output() onCancel = new EventEmitter();
    @Output() onInput = new EventEmitter<string>();
    searchInput = '';

    constructor(
        private apiService: ApiService
    ) {}

    onSearchInput(e) {
        // console.log(e.target.value)
        this.onInput.emit(e.target.value);
    }

    onSearchCancel(e) {
        this.onCancel.emit();
    }
}