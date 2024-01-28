using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class BrandController(IBrandRepository brandRepository) : ControllerBase
{
    private readonly IBrandRepository _brandRepository = brandRepository;

    [HttpGet("[action]")]
    public async Task<IActionResult> GetBrands()
    {
        var brands = await _brandRepository.GetAllAsync();
        return Ok(brands);
    }
}