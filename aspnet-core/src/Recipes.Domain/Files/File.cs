using System;

namespace Recipes.Files
{
    public class File
    {
        public string ContentType { get; set; }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public File(
            Guid id,
            string name,
            string contentType)
        {
            Id = id;
            Name = name;
            ContentType = contentType;
        }

        private File()
        {
        }
    }
}