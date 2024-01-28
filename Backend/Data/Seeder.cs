using Backend.Helpers;
using Backend.Models;
using Bogus;

namespace Backend.Data;

public static class Seeder
{
    public static void Seed(this IApplicationBuilder application)
    {
        var scope = application.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        var client = scope.ServiceProvider.GetRequiredService<HttpClient>();

        context.AddAdminUser();
        context.AddBrands(client);
        context.AddCategories(client);
    }

    private static void AddAdminUser(this DataContext context)
    {
        if (context.Users.Any()) return;

        var user = new User
        {
            Name = "Admin",
            Email = "admin@fullcart.com",
            PasswordHash = AuthHelper.HashPassword("password"),
            UserType = Enums.UserRole.ADMIN
        };

        context.Add(user);
        context.SaveChanges();
    }

    private static void AddBrands(this DataContext context, HttpClient httpClient)
    {
        if (context.Brands.Any()) return;

        var fakeBrand = new Faker<Brand>()
        .RuleFor(x => x.Id, f => Guid.NewGuid())
        .RuleFor(x => x.CreatedAt, f => f.Date.Past(0))
        .RuleFor(x => x.Name, f => f.Company.CompanyName(0))
        .RuleFor(x => x.Image, f => {
            var url = f.Image.PicsumUrl(120, 90);
            return httpClient.GetByteArrayAsync(url).GetAwaiter().GetResult();
        });

        var brands = fakeBrand.Generate(5);
        context.Brands.AddRange(brands);
        context.SaveChanges();
    }

    private static void AddCategories(this DataContext context, HttpClient httpClient)
    {
        if (context.Brands.Any()) return;

        var fakeCategory = new Faker<Category>()
        .RuleFor(x => x.Id, f => Guid.NewGuid())
        .RuleFor(x => x.CreatedAt, f => f.Date.Past(0))
        .RuleFor(x => x.Name, f => f.Commerce.Categories(1).First())
        .RuleFor(x => x.Image, f => {
            var url = f.Image.PicsumUrl(120, 90);
            return httpClient.GetByteArrayAsync(url).GetAwaiter().GetResult();
        });

        var categories = fakeCategory.Generate(5);
        context.Categories.AddRange(categories);
        context.SaveChanges();
    }
}