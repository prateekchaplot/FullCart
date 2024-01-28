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
            var url = f.Image.PicsumUrl();
            Console.WriteLine("URL: {0}", url);
            return httpClient.GetByteArrayAsync(url).GetAwaiter().GetResult();
        });

        var brands = fakeBrand.Generate(5);
        context.Brands.AddRange(brands);
        context.SaveChanges();
    }
}