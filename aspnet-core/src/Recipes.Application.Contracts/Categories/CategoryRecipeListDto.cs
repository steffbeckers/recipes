using Recipes.Files;

namespace Recipes.Categories
{
    public class CategoryRecipeListDto
    {
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        public string ForUnit { get; set; }

        public string Name { get; set; }

        public FileDto Photo { get; set; }
    }
}