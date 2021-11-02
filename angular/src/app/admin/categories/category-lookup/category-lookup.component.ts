import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from '@proxy/categories';
import { LookupDto, LookupInputDto } from '@proxy/shared';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-admin-category-lookup',
    templateUrl: './category-lookup.component.html',
    styleUrls: ['./category-lookup.component.scss'],
})
export class CategoryLookupComponent implements OnInit {
    category: LookupDto<string>;

    @Input()
    categoryId: string;

    @Input()
    input: LookupInputDto = { maxResultCount: 10 };

    @Output()
    categorySelected: EventEmitter<LookupDto<string>> = new EventEmitter<LookupDto<string>>();

    search: OperatorFunction<string, readonly LookupDto<string>[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(text =>
                this.categoriesService
                    .getLookup({
                        ...this.input,
                        filterText: text,
                        id: text === '' ? this.input.id : null,
                    })
                    .pipe(map(data => data.items))
            )
        );

    formatter = (x: { name: string }) => x.name;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        if (this.categoryId) {
            this.input.id = this.categoryId;
            this.search(of(''))
                .pipe(first())
                .subscribe((categories: LookupDto<string>[]) => {
                    this.category = categories[0];
                });
        }
    }

    onChange(): void {
        this.categorySelected.emit(this.category);
    }
}
