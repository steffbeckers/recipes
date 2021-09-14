using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;

namespace Recipes.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>, IMultiTenant
    {
        private string _description;
        private string _name;

        public virtual string Description
        {
            get => _description;
            set
            {
                Check.Length(value, nameof(Description), CategoryConsts.DescriptionMaxLength, 0);
                _description = value;
            }
        }

        public virtual string Name
        {
            get => _name;
            set
            {
                Check.NotNull(value, nameof(Name));
                Check.Length(value, nameof(Name), CategoryConsts.NameMaxLength, 0);
                _name = value;
            }
        }

        public virtual Guid? PhotoId { get; set; }

        public virtual int? SortOrder { get; set; }

        public virtual Guid? TenantId { get; private set; }

        public Category(
            Guid id,
            string name,
            Guid? tenantId = null)
        {
            Id = id;
            Name = name;
            TenantId = tenantId;
        }

        private Category()
        {
        }
    }
}