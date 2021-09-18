using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Recipes.Files
{
    public class FileDto : EntityDto<Guid?>
    {
        [Required]
        [StringLength(FileConsts.ContentTypeMaxLength)]
        public string ContentType { get; set; }

        [Required]
        public byte[] Data { get; set; }

        [Required]
        [StringLength(FileConsts.NameMaxLength)]
        public string Name { get; set; }
    }
}