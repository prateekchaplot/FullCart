using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Brand : Base
{
    [MinLength(4)]
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    public byte[] Image { get; set; } = [];
}