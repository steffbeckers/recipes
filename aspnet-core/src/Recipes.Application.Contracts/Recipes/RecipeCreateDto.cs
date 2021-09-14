using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeCreateDto
    {
        public Guid CategoryId { get; set; }

        [StringLength(RecipeConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        [StringLength(RecipeConsts.ForUnitMaxLength)]
        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientCreateDto> Ingredients { get; set; }

        [Required]
        [StringLength(RecipeConsts.NameMaxLength)]
        public string Name { get; set; }

        public byte[] Photo { get; set; }

        public ICollection<RecipeStepCreateDto> Steps { get; set; }

        public RecipeCreateDto()
        {
            Ingredients = new Collection<RecipeIngredientCreateDto>();
            Steps = new Collection<RecipeStepCreateDto>();
        }
    }
}