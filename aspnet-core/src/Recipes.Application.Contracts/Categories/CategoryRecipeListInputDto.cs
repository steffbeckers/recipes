using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class CategoryRecipeListInputDto : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}