using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Files
{
    public class FileDto : EntityDto<Guid>
    {
        public string ContentType { get; set; }

        public string Name { get; set; }
    }
}