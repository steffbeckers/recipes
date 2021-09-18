using Recipes.Files;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Recipes.Recipes
{
    public class Recipe : FullAuditedAggregateRoot<Guid>, IMultiTenant
    {
        private string _description;
        private string _forUnit;
        private string _name;

        public virtual Guid CategoryId { get; set; }

        public virtual string Description
        {
            get => _description;
            set
            {
                Check.Length(value, nameof(Description), RecipeConsts.DescriptionMaxLength, 0);
                _description = value;
            }
        }

        public virtual int? ForAmount { get; set; }

        public virtual string ForUnit
        {
            get => _forUnit;
            set
            {
                Check.Length(value, nameof(ForUnit), RecipeConsts.ForUnitMaxLength, 0);
                _forUnit = value;
            }
        }

        public virtual ICollection<RecipeIngredient> Ingredients { get; private set; }

        public virtual string Name
        {
            get => _name;
            set
            {
                Check.NotNull(value, nameof(Name));
                Check.Length(value, nameof(Name), RecipeConsts.NameMaxLength, 0);
                _name = value;
            }
        }

        public virtual File Photo { get; set; }

        public virtual ICollection<RecipeStep> Steps { get; private set; }

        public virtual Guid? TenantId { get; private set; }

        public Recipe(
            Guid id,
            Guid categoryId,
            string name,
            Guid? tenantId = null)
        {
            Id = id;
            CategoryId = categoryId;
            Name = name;
            TenantId = tenantId;
            Ingredients = new Collection<RecipeIngredient>();
            Steps = new Collection<RecipeStep>();
        }

        private Recipe()
        {
            Ingredients = new Collection<RecipeIngredient>();
            Steps = new Collection<RecipeStep>();
        }
    }
}