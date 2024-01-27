namespace Backend.Models;

public static partial class Configuration
{
    public static void AddModelOptions(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection("JwtOptions"));
    }
}