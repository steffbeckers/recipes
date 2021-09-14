using Volo.Abp.Application.Dtos;

namespace Recipes.Shared
{
    public class LookupDto<TKey> : EntityDto<TKey>
    {
        public string Name { get; set; }
    }
}