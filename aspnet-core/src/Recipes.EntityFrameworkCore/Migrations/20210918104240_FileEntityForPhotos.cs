using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Migrations
{
    public partial class FileEntityForPhotos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoId",
                table: "AppRecipes",
                newName: "Photo_Id");

            migrationBuilder.RenameColumn(
                name: "PhotoId",
                table: "AppCategories",
                newName: "Photo_Id");

            migrationBuilder.AddColumn<string>(
                name: "Photo_ContentType",
                table: "AppRecipes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo_Name",
                table: "AppRecipes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo_ContentType",
                table: "AppCategories",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Photo_Name",
                table: "AppCategories",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo_ContentType",
                table: "AppRecipes");

            migrationBuilder.DropColumn(
                name: "Photo_Name",
                table: "AppRecipes");

            migrationBuilder.DropColumn(
                name: "Photo_ContentType",
                table: "AppCategories");

            migrationBuilder.DropColumn(
                name: "Photo_Name",
                table: "AppCategories");

            migrationBuilder.RenameColumn(
                name: "Photo_Id",
                table: "AppRecipes",
                newName: "PhotoId");

            migrationBuilder.RenameColumn(
                name: "Photo_Id",
                table: "AppCategories",
                newName: "PhotoId");
        }
    }
}
