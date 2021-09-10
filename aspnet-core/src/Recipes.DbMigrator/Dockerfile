FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/Recipes.DbMigrator/Recipes.DbMigrator.csproj", "src/Recipes.DbMigrator/"]
COPY ["src/Recipes.EntityFrameworkCore/Recipes.EntityFrameworkCore.csproj", "src/Recipes.EntityFrameworkCore/"]
COPY ["src/Recipes.Domain/Recipes.Domain.csproj", "src/Recipes.Domain/"]
COPY ["src/Recipes.Domain.Shared/Recipes.Domain.Shared.csproj", "src/Recipes.Domain.Shared/"]
COPY ["src/Recipes.Application.Contracts/Recipes.Application.Contracts.csproj", "src/Recipes.Application.Contracts/"]
RUN dotnet restore "src/Recipes.DbMigrator/Recipes.DbMigrator.csproj"
COPY . .
WORKDIR "/src/src/Recipes.DbMigrator"
RUN dotnet build "Recipes.DbMigrator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Recipes.DbMigrator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Recipes.DbMigrator.dll"]
