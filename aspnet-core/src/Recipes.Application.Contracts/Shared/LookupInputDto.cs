using Volo.Abp.Application.Dtos;

namespace Recipes.Shared
{
    public class LookupInputDto : PagedResultRequestDto
    {
        public string FilterText { get; set; }

        public LookupInputDto()
        {
            MaxResultCount = MaxMaxResultCount;
        }
    }
}