using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public abstract class Base
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}