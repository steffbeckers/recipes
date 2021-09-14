using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class GetRecipesInput : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}