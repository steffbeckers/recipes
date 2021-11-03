using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.BlobStoring;

namespace Recipes.Files
{
    [RemoteService(IsEnabled = false)]
    public class FilesAppService : RecipesAppServiceBase, IFilesAppService
    {
        private readonly IBlobContainer _blobContainer;

        public FilesAppService(IBlobContainer blobContainer)
        {
            _blobContainer = blobContainer;
        }

        public virtual async Task<byte[]> GetAsync(Guid id)
        {
            return await _blobContainer.GetAllBytesOrNullAsync(id.ToString());
        }
    }
}