using Backend.Enums;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpDelete]
    public async Task<IActionResult> DeleteBrand(Guid id)
    {
        var brand = await _brandRepository.FirstOrDefaultAsync(x => x.Id == id);
        if (brand == null) return NotFound();

        _brandRepository.Delete(brand);
        await _brandRepository.SaveAsync();
        return Ok();
    }
}