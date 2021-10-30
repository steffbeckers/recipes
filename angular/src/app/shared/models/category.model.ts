import { File } from './file.model';
import { Recipe } from './recipe.model';

export class Category {
    id: string;
    name: string;
    description?: string;
    photoId?: string;
    photo: File;
    sortOrder: number;
    recipeIds: string[] = [];
    recipes: Recipe[] = [];
}
