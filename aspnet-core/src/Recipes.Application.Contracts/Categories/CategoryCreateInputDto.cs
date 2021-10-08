using Recipes.Files;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Categories
{
    public class CategoryCreateInputDto
    {
        [StringLength(CategoryConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        [Required]
        [StringLength(CategoryConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileInputDto Photo { get; set; }

        public int? SortOrder { get; set; }
    }
}