using Recipes.Files;
using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class CategoryListDto : EntityDto<Guid>
    {
        public string Description { get; set; }

        public string Name { get; set; }

        public FileDto Photo { get; set; }

        public int? SortOrder { get; set; }
    }
}