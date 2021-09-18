using Recipes.Categories;
using Recipes.Files;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeDto : FullAuditedEntityDto<Guid>
    {
        public CategorySimpleDto Category { get; set; }

        public Guid CategoryId { get; set; }

        public string Description { get; set; }

        public int? ForAmount { get; set; }

        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientDto> Ingredients { get; set; }

        public string Name { get; set; }

        public FileDto Photo { get; set; }

        public ICollection<RecipeStepDto> Steps { get; set; }
    }
}