import { PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CategoriesService, CategoryListDto } from '@proxy/categories';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    categories: CategoryListDto[] = [];
    totalCount: number;
    maxResultCount: number = 5;
    pages: number[] = [];
    currentPage: number = 0;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.getCategoriesList();
    }

    getCategoriesList(): void {
        this.categoriesService
            .getList({
                maxResultCount: this.maxResultCount,
                skipCount: this.currentPage * this.maxResultCount,
            })
            .subscribe((result: PagedResultDto<CategoryListDto>) => {
                this.categories = result.items;
                this.totalCount = result.totalCount;
                this.pages = Array(Math.ceil(this.totalCount / this.maxResultCount))
                    .fill(1)
                    .map((x, i) => i);
            });
    }

    setCurrentPage(pageIndex: number): void {
        this.currentPage = pageIndex;
        this.getCategoriesList();
    }
}
