using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class GetCategoriesInput : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}