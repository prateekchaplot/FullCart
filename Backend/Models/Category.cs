using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Category : Base
{
    [MaxLength(32)]
    public string Name { get; set; } = string.Empty;

    public byte[] Image { get; set; } = [];
}