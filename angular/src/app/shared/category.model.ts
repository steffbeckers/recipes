import { Recipe } from './recipe.model';

export class Category {
    id: string;
    name: string;
    description?: string;
    photoId?: string;
    sortOrder: number;
    recipeIds: string[];
    recipes: Recipe[];
}
