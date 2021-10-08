using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeListInputDto : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}