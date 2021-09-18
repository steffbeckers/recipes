using FluentValidation;
using Microsoft.Extensions.Localization;
using Recipes.Files;
using Recipes.Localization;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Recipes
{
    public class RecipeCreateDto
    {
        public Guid CategoryId { get; set; }

        [StringLength(RecipeConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        [StringLength(RecipeConsts.ForUnitMaxLength)]
        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientCreateDto> Ingredients { get; set; }

        [Required]
        [StringLength(RecipeConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileDto Photo { get; set; }

        public ICollection<RecipeStepCreateDto> Steps { get; set; }

        public RecipeCreateDto()
        {
            Ingredients = new Collection<RecipeIngredientCreateDto>();
            Steps = new Collection<RecipeStepCreateDto>();
        }
    }

    public class RecipeCreateDtoValidator : AbstractValidator<RecipeCreateDto>
    {
        public RecipeCreateDtoValidator(IStringLocalizer<RecipesResource> stringLocalizer)
        {
            RuleFor(x => x.Ingredients).NotEmpty().WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneIngredientIsRequired]);
            RuleFor(x => x.Steps).NotEmpty().WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneStepIsRequired]);
        }
    }
}