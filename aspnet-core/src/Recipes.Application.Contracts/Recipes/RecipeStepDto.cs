using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeStepDto : EntityDto<Guid>
    {
        public string Instructions { get; set; }

        public int Number { get; set; }
    }
}