import { Category } from './category.model';
import { File } from './file.model';

export class Recipe {
    id: string;
    categoryId: string;
    category?: Category;
    name: string;
    description?: string;
    forAmount?: number;
    forUnit?: string;
    photoId?: string;
    photo?: File;
    ingredients: RecipeIngredient[] = [];
    steps: RecipeStep[] = [];
}

export class RecipeIngredient {
    id: string;
    name: string;
    amount: number;
    sortOrder: number;
    unit: string;
}

export class RecipeStep {
    id: string;
    instructions: string;
    number: number;
}
