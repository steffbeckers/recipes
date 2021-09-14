using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class CategorySimpleDto : EntityDto<Guid>
    {
        public string Description { get; set; }

        public string Name { get; set; }

        public Guid? PhotoId { get; set; }
    }
}