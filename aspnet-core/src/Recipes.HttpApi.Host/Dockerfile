FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/Recipes.HttpApi.Host/Recipes.HttpApi.Host.csproj", "src/Recipes.HttpApi.Host/"]
COPY ["src/Recipes.EntityFrameworkCore/Recipes.EntityFrameworkCore.csproj", "src/Recipes.EntityFrameworkCore/"]
COPY ["src/Recipes.Domain/Recipes.Domain.csproj", "src/Recipes.Domain/"]
COPY ["src/Recipes.Domain.Shared/Recipes.Domain.Shared.csproj", "src/Recipes.Domain.Shared/"]
COPY ["src/Recipes.HttpApi/Recipes.HttpApi.csproj", "src/Recipes.HttpApi/"]
COPY ["src/Recipes.Application.Contracts/Recipes.Application.Contracts.csproj", "src/Recipes.Application.Contracts/"]
COPY ["src/Recipes.Application/Recipes.Application.csproj", "src/Recipes.Application/"]
RUN dotnet restore "src/Recipes.HttpApi.Host/Recipes.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/Recipes.HttpApi.Host"
RUN dotnet build "Recipes.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Recipes.HttpApi.Host.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Recipes.HttpApi.Host.dll"]
