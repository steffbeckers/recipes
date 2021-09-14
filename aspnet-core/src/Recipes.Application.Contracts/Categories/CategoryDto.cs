using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class CategoryDto : FullAuditedEntityDto<Guid>
    {
        public string Description { get; set; }

        public string Name { get; set; }

        public Guid? PhotoId { get; set; }

        public int? SortOrder { get; set; }
    }
}