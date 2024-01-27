using Backend.Helpers;
using Backend.Models;

namespace Backend.Data;

public static class Seeder
{
    public static void Seed(this IApplicationBuilder application)
    {
        var scope = application.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DataContext>();

        context.AddAdmin();
    }

    private static void AddAdmin(this DataContext context)
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
}