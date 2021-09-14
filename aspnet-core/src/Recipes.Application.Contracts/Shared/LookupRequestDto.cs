using Volo.Abp.Application.Dtos;

namespace Recipes.Shared
{
    public class LookupRequestDto : PagedResultRequestDto
    {
        public string FilterText { get; set; }

        public LookupRequestDto()
        {
            MaxResultCount = MaxMaxResultCount;
        }
    }
}