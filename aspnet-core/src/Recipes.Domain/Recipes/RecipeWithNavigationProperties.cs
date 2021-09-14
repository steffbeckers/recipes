using Recipes.Categories;

namespace Recipes.Recipes
{
    public class RecipeWithNavigationProperties
    {
        public Category Category { get; set; }

        public Recipe Recipe { get; set; }
    }
}