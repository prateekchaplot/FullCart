using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;

public class BrandDto
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Image { get; set; } = string.Empty;   //[];
}