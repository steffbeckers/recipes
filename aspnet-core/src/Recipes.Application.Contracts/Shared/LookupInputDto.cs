using System;
using Volo.Abp.Application.Dtos;

namespace Recipes.Shared
{
    public class LookupInputDto : PagedResultRequestDto
    {
        public string FilterText { get; set; }

        public Guid? Id { get; set; }

        public LookupInputDto()
        {
            MaxResultCount = MaxMaxResultCount;
        }
    }
}