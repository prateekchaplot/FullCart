using System.ComponentModel.DataAnnotations;
using Backend.Enums;

namespace Backend.Models;

public class User : Base
{
    [MaxLength(128)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(128)]
    public string Email { get; set; } = string.Empty;    

    [MaxLength(256)]
    public string PasswordHash { get; set; } = string.Empty;
    
    public UserRole UserType { get; set; } = UserRole.USER;
}