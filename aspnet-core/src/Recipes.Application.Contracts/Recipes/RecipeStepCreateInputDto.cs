using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeStepCreateInputDto
    {
        [Required]
        [StringLength(RecipeStepConsts.InstructionsMaxLength)]
        public string Instructions { get; set; }

        [Required]
        public int Number { get; set; }
    }
}