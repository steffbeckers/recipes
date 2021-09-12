using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Recipes.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>
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

        public Guid? PhotoId { get; set; }

        public Category(
            Guid id,
            string name)
        {
            Id = id;
            Name = name;
        }

        private Category()
        {
        }
    }
}