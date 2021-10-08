using Volo.Abp.Application.Dtos;

namespace Recipes.Categories
{
    public class CategoryListInputDto : PagedAndSortedResultRequestDto
    {
        public string FilterText { get; set; }
    }
}