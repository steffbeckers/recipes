using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class GetCategoryRecipesInput : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}