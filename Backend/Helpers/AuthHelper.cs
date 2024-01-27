using System.Security.Cryptography;
using System.Text;

namespace Backend.Helpers;

public class AuthHelper
{
    public static string HashPassword(string password)
    {
        var passwordBytes = Encoding.UTF8.GetBytes(password);
        var hashedData = SHA256.HashData(passwordBytes);
        return Convert.ToBase64String(hashedData);
    }
}