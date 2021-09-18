using Recipes.Files;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Categories
{
    public class CategoryCreateDto
    {
        [StringLength(CategoryConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        [Required]
        [StringLength(CategoryConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileDto Photo { get; set; }

        public int? SortOrder { get; set; }
    }
}