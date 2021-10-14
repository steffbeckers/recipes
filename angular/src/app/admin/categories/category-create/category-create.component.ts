import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService, CategoryCreateInputDto } from '@proxy/categories';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        description: [null],
        sortOrder: [null]
    });

    constructor(
        private fb: FormBuilder,
        private categoriesService: CategoriesService,
        private router: Router) { }

    save(event): void {
        event.preventDefault();

        let input: CategoryCreateInputDto = this.form.getRawValue();

        this.categoriesService.create(input).subscribe(() => {
            this.router.navigateByUrl('admin/categories')
        })
    }
}
