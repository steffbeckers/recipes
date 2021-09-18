using Recipes.Categories;
using Recipes.Files;
using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeListDto : EntityDto<Guid>
    {
        public CategorySimpleDto Category { get; set; }

        public Guid CategoryId { get; set; }

        public string Description { get; set; }

        public int? ForAmount { get; set; }

        public string ForUnit { get; set; }

        public string Name { get; set; }

        public FileDto Photo { get; set; }
    }
}