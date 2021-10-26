import { Category } from './category.model';

export class Recipe {
    id: string;
    categoryId: string;
    category: Category;
    name: string;
    description?: string;
    forAmount?: number;
    forUnit?: string;
    photoId?: string;
}
