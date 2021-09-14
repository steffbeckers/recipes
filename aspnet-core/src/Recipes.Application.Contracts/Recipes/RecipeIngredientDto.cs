using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeIngredientDto : EntityDto<Guid>
    {
        public decimal Amount { get; set; }

        public string Name { get; set; }

        public int? SortOrder { get; set; }

        public string Unit { get; set; }
    }
}