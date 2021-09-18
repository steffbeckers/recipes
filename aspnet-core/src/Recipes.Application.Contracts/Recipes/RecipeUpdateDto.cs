using FluentValidation;
using Microsoft.Extensions.Localization;
using Recipes.Localization;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeUpdateDto
    {
        public Guid CategoryId { get; set; }

        public bool DeletePhoto { get; set; }

        [StringLength(RecipeConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        [StringLength(RecipeConsts.ForUnitMaxLength)]
        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientUpdateDto> Ingredients { get; set; }

        [Required]
        [StringLength(RecipeConsts.NameMaxLength)]
        public string Name { get; set; }

        public byte[] Photo { get; set; }

        public ICollection<RecipeStepUpdateDto> Steps { get; set; }

        public RecipeUpdateDto()
        {
            Ingredients = new Collection<RecipeIngredientUpdateDto>();
            Steps = new Collection<RecipeStepUpdateDto>();
        }
    }

    public class RecipeUpdateDtoValidator : AbstractValidator<RecipeUpdateDto>
    {
        public RecipeUpdateDtoValidator(IStringLocalizer<RecipesResource> stringLocalizer)
        {
            RuleFor(x => x.Ingredients).NotEmpty().WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneIngredientIsRequired]);
            RuleFor(x => x.Steps).NotEmpty().WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneStepIsRequired]);
        }
    }
}