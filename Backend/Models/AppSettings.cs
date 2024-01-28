namespace Backend.Models;

public class AppSettings
{
    public JwtOptions JwtOptions { get; set; } = new();

    private static AppSettings _instance = new();

    private AppSettings() { }

    public static AppSettings GetInstance()
    {
        _instance ??= new AppSettings();
        return _instance;
    }
}