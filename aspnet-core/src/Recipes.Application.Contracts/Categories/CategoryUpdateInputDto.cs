using Recipes.Files;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Categories
{
    public class CategoryUpdateInputDto
    {
        public bool DeletePhoto { get; set; }

        [StringLength(CategoryConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        [Required]
        [StringLength(CategoryConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileInputDto Photo { get; set; }

        public int? SortOrder { get; set; }
    }
}