using AutoMapper;
using Backend.Dtos;
using Backend.Enums;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandController(IBrandRepository brandRepository, IMapper mapper) : ControllerBase
{
    private readonly IBrandRepository _brandRepository = brandRepository;
    private readonly IMapper _mapper = mapper;

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

    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpPost]
    public async Task<IActionResult> CreateAsync(BrandDto dto)
    {
        var exists = await _brandRepository.AnyAsync(x => x.Name == dto.Name);
        if (exists) return BadRequest("Name exists.");

        var brand = _mapper.Map<Brand>(dto);
        await _brandRepository.CreateAsync(brand);
        await _brandRepository.SaveAsync();
        return Ok();
    }
    
    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpPut]
    public async Task<IActionResult> UpdateAsync(BrandDto dto)
    {
        var brand = await _brandRepository.FirstOrDefaultAsync(x => x.Id == dto.Id);
        if (brand == null) return BadRequest("Invalid brand");

        var brandToUpdate = _mapper.Map<Brand>(dto);
        brandToUpdate.CreatedAt = brand.CreatedAt;

        _brandRepository.Update(brandToUpdate);
        await _brandRepository.SaveAsync();
        return Ok();
    }
}