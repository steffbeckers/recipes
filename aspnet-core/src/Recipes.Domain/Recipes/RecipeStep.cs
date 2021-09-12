using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Recipes.Recipes
{
    public class RecipeStep : FullAuditedEntity<Guid>
    {
        private string _instructions;

        public virtual string Instructions
        {
            get => _instructions;
            set
            {
                Check.NotNull(value, nameof(Instructions));
                Check.Length(value, nameof(Instructions), RecipeStepConsts.InstructionsMaxLength, 0);
                _instructions = value;
            }
        }

        public virtual int Number { get; set; }

        public virtual Recipe Recipe { get; set; }

        public virtual Guid RecipeId { get; set; }

        public RecipeStep(
            Guid id,
            Guid recipeId,
            int number,
            string instructions)
        {
            Id = id;
            RecipeId = recipeId;
            Number = number;
            Instructions = instructions;
        }
    }
}