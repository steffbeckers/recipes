using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Recipes.Files
{
    public interface IFilesAppService : IApplicationService
    {
        Task<byte[]> GetAsync(Guid id);
    }
}