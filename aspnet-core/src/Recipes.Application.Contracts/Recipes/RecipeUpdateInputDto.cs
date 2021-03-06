using Recipes.Files;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeUpdateInputDto
    {
        public Guid CategoryId { get; set; }

        public bool DeletePhoto { get; set; }

        [StringLength(RecipeConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        [StringLength(RecipeConsts.ForUnitMaxLength)]
        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientUpdateInputDto> Ingredients { get; set; }

        [Required]
        [StringLength(RecipeConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileInputDto Photo { get; set; }

        public ICollection<RecipeStepUpdateInputDto> Steps { get; set; }

        public RecipeUpdateInputDto()
        {
            Ingredients = new Collection<RecipeIngredientUpdateInputDto>();
            Steps = new Collection<RecipeStepUpdateInputDto>();
        }
    }

    //public class RecipeUpdateInputDtoValidator : AbstractValidator<RecipeUpdateInputDto>
    //{
    //    public RecipeUpdateInputDtoValidator(IStringLocalizer<RecipesResource> stringLocalizer)
    //    {
    //        RuleFor(x => x.Ingredients)
    //            .NotEmpty()
    //            .WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneIngredientIsRequired]);

    //        RuleFor(x => x.Steps)
    //            .NotEmpty()
    //            .WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneStepIsRequired]);
    //    }
    //}
}