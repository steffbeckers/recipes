using Recipes.Categories;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeDto : FullAuditedEntityDto<Guid>
    {
        public CategorySimpleDto Category { get; set; }

        public string Description { get; set; }

        public int? ForAmount { get; set; }

        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientDto> Ingredients { get; set; }

        public string Name { get; set; }

        public Guid? PhotoId { get; set; }

        public ICollection<RecipeStepDto> Steps { get; set; }
    }
}