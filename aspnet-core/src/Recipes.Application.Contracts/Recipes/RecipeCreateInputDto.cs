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
    public class RecipeCreateInputDto
    {
        public Guid CategoryId { get; set; }

        [StringLength(RecipeConsts.DescriptionMaxLength)]
        public string Description { get; set; }

        public int? ForAmount { get; set; }

        [StringLength(RecipeConsts.ForUnitMaxLength)]
        public string ForUnit { get; set; }

        public ICollection<RecipeIngredientCreateInputDto> Ingredients { get; set; }

        [Required]
        [StringLength(RecipeConsts.NameMaxLength)]
        public string Name { get; set; }

        public FileInputDto Photo { get; set; }

        public ICollection<RecipeStepCreateInputDto> Steps { get; set; }

        public RecipeCreateInputDto()
        {
            Ingredients = new Collection<RecipeIngredientCreateInputDto>();
            Steps = new Collection<RecipeStepCreateInputDto>();
        }
    }

    public class RecipeCreateInputDtoValidator : AbstractValidator<RecipeCreateInputDto>
    {
        public RecipeCreateInputDtoValidator(IStringLocalizer<RecipesResource> stringLocalizer)
        {
            RuleFor(x => x.Ingredients)
                .NotEmpty()
                .WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneIngredientIsRequired]);

            RuleFor(x => x.Steps)
                .NotEmpty()
                .WithMessage(stringLocalizer[RecipesDomainErrorCodes.Recipes.AtLeastOneStepIsRequired]);
        }
    }
}