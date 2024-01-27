using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class LoginDto
{
    [Required]
    [MinLength(4)]
    [MaxLength(128)]
    public string Email { get; set; }

    [Required]
    [MinLength(8)]
    [MaxLength(16)]
    public string Password { get; set; }
}