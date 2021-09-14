using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeIngredientUpdateDto : EntityDto<Guid?>
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