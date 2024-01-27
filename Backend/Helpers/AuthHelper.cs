using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Backend.Models;

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