using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Recipes.Recipes
{
    public class RecipeStepUpdateInputDto : EntityDto<Guid?>
    {
        [Required]
        [StringLength(RecipeStepConsts.InstructionsMaxLength)]
        public string Instructions { get; set; }

        [Required]
        public int Number { get; set; }
    }
}