using Microsoft.EntityFrameworkCore;
using Recipes.Categories;
using Recipes.Files;
using Recipes.Recipes;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.IdentityServer.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Recipes.EntityFrameworkCore
{
    [ReplaceDbContext(typeof(IIdentityDbContext))]
    [ReplaceDbContext(typeof(ITenantManagementDbContext))]
    [ConnectionStringName("Default")]
    public class RecipesDbContext :
        AbpDbContext<RecipesDbContext>,
        IIdentityDbContext,
        ITenantManagementDbContext
    {
        /* Add DbSet properties for your Aggregate Roots / Entities here. */

        #region Entities from the modules

        /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
         * and replaced them for this DbContext. This allows you to perform JOIN
         * queries for the entities of these modules over the repositories easily. You
         * typically don't need that for other modules. But, if you need, you can
         * implement the DbContext interface of the needed module and use ReplaceDbContext
         * attribute just like IIdentityDbContext and ITenantManagementDbContext.
         *
         * More info: Replacing a DbContext of a module ensures that the related module
         * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
         */

        public DbSet<IdentityClaimType> ClaimTypes { get; set; }

        public DbSet<IdentityLinkUser> LinkUsers { get; set; }

        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }

        public DbSet<IdentityRole> Roles { get; set; }

        public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }

        public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

        // Tenant Management
        public DbSet<Tenant> Tenants { get; set; }

        // Identity
        public DbSet<IdentityUser> Users { get; set; }

        #endregion Entities from the modules

        public DbSet<Category> Categories { get; set; }

        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<RecipeStep> RecipeSteps { get; set; }

        public RecipesDbContext(DbContextOptions<RecipesDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Include modules to your migration db context */

            builder.ConfigurePermissionManagement();
            builder.ConfigureSettingManagement();
            builder.ConfigureBackgroundJobs();
            builder.ConfigureAuditLogging();
            builder.ConfigureIdentity();
            builder.ConfigureIdentityServer();
            builder.ConfigureFeatureManagement();
            builder.ConfigureTenantManagement();

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(RecipesConsts.DbTablePrefix + "YourEntities", RecipesConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});

            builder.Entity<Category>(b =>
            {
                b.ToTable(RecipesConsts.DbTablePrefix + "Categories", RecipesConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.TenantId).HasColumnName(nameof(Category.TenantId));
                b.Property(x => x.Name).HasColumnName(nameof(Category.Name)).IsRequired().HasMaxLength(CategoryConsts.NameMaxLength);
                b.Property(x => x.Description).HasColumnName(nameof(Category.Description)).HasMaxLength(CategoryConsts.DescriptionMaxLength);
                b.OwnsOne(x => x.Photo).Property(x => x.Name).HasMaxLength(FileConsts.NameMaxLength);
                b.OwnsOne(x => x.Photo).Property(x => x.ContentType).HasMaxLength(FileConsts.ContentTypeMaxLength);
                b.Property(x => x.SortOrder).HasColumnName(nameof(Category.SortOrder));
            });

            builder.Entity<RecipeIngredient>(b =>
            {
                b.ToTable(RecipesConsts.DbTablePrefix + "RecipeIngredients", RecipesConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.TenantId).HasColumnName(nameof(RecipeIngredient.TenantId));
                b.Property(x => x.RecipeId).HasColumnName(nameof(RecipeIngredient.RecipeId)).IsRequired();
                b.HasOne(x => x.Recipe).WithMany(x => x.Ingredients).HasForeignKey(x => x.RecipeId);
                b.Property(x => x.Name).HasColumnName(nameof(RecipeIngredient.Name)).IsRequired().HasMaxLength(RecipeIngredientConsts.NameMaxLength);
                b.Property(x => x.Amount).HasColumnName(nameof(RecipeIngredient.Amount)).IsRequired().HasPrecision(11, 2);
                b.Property(x => x.Unit).HasColumnName(nameof(RecipeIngredient.Unit)).HasMaxLength(RecipeIngredientConsts.UnitMaxLength);
                b.Property(x => x.SortOrder).HasColumnName(nameof(RecipeIngredient.SortOrder));
            });

            builder.Entity<Recipe>(b =>
            {
                b.ToTable(RecipesConsts.DbTablePrefix + "Recipes", RecipesConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.TenantId).HasColumnName(nameof(Recipe.TenantId));
                b.Property(x => x.CategoryId).HasColumnName(nameof(Recipe.CategoryId)).IsRequired();
                b.HasOne<Category>().WithMany().HasForeignKey(x => x.CategoryId);
                b.Property(x => x.Name).HasColumnName(nameof(Recipe.Name)).IsRequired().HasMaxLength(RecipeConsts.NameMaxLength);
                b.Property(x => x.Description).HasColumnName(nameof(Recipe.Description)).HasMaxLength(RecipeConsts.DescriptionMaxLength);
                b.OwnsOne(x => x.Photo).Property(x => x.Name).HasMaxLength(FileConsts.NameMaxLength);
                b.OwnsOne(x => x.Photo).Property(x => x.ContentType).HasMaxLength(FileConsts.ContentTypeMaxLength);
                b.Property(x => x.ForAmount).HasColumnName(nameof(Recipe.ForAmount));
                b.Property(x => x.ForUnit).HasColumnName(nameof(Recipe.ForUnit)).HasMaxLength(RecipeConsts.ForUnitMaxLength);
            });

            builder.Entity<RecipeStep>(b =>
            {
                b.ToTable(RecipesConsts.DbTablePrefix + "RecipeSteps", RecipesConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.TenantId).HasColumnName(nameof(RecipeStep.TenantId));
                b.Property(x => x.RecipeId).HasColumnName(nameof(RecipeStep.RecipeId)).IsRequired();
                b.HasOne(x => x.Recipe).WithMany(x => x.Steps).HasForeignKey(x => x.RecipeId);
                b.Property(x => x.Number).HasColumnName(nameof(RecipeStep.Number)).IsRequired();
                b.Property(x => x.Instructions).HasColumnName(nameof(RecipeStep.Instructions)).IsRequired().HasMaxLength(RecipeStepConsts.InstructionsMaxLength);
            });
        }
    }
}