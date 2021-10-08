using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeIngredientCreateInputDto
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(RecipeIngredientConsts.NameMaxLength)]
        public string Name { get; set; }

        public int? SortOrder { get; set; }

        [StringLength(RecipeIngredientConsts.UnitMaxLength)]
        public string Unit { get; set; }
    }
}