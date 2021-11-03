using System.ComponentModel.DataAnnotations;

namespace Recipes.Files
{
    public class FileInputDto
    {
        [Required]
        [StringLength(FileConsts.ContentTypeMaxLength)]
        public string ContentType { get; set; }

        [Required]
        public string Data { get; set; }

        [Required]
        [StringLength(FileConsts.NameMaxLength)]
        public string Name { get; set; }
    }
}