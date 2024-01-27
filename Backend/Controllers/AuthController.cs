using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(ILogger<AuthController> logger) : ControllerBase
{
    private readonly ILogger<AuthController> logger = logger;
}