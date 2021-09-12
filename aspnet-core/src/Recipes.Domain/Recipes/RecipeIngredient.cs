using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Recipes.Recipes
{
    public class RecipeIngredient : FullAuditedEntity<Guid>, IMultiTenant
    {
        private string _name;
        private string _unit;

        public virtual decimal Amount { get; set; }

        public virtual string Name
        {
            get => _name;
            set
            {
                Check.NotNull(value, nameof(Name));
                Check.Length(value, nameof(Name), RecipeIngredientConsts.NameMaxLength, 0);
                _name = value;
            }
        }

        public virtual Recipe Recipe { get; set; }

        public virtual Guid RecipeId { get; set; }

        public virtual Guid? TenantId { get; private set; }

        public virtual string Unit
        {
            get => _unit;
            set
            {
                Check.Length(value, nameof(Unit), RecipeIngredientConsts.UnitMaxLength, 0);
                _unit = value;
            }
        }

        public RecipeIngredient(
            Guid id,
            Guid recipeId,
            string name,
            decimal amount,
            Guid? tenantId = null)
        {
            Id = id;
            RecipeId = recipeId;
            Name = name;
            Amount = amount;
            TenantId = tenantId;
        }

        private RecipeIngredient()
        {
        }
    }
}