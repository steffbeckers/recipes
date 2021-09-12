using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Migrations
{
    public partial class MultiTenancyConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "AppRecipeSteps",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "AppRecipes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "AppRecipeIngredients",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "AppCategories",
                type: "uniqueidentifier",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppRecipeSteps");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppRecipes");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppRecipeIngredients");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppCategories");
        }
    }
}
