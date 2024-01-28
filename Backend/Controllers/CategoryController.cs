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
public class CategoryController(ICategoryRepository categoryRepository, IMapper mapper) : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository = categoryRepository;
    private readonly IMapper _mapper = mapper;

    [HttpGet("[action]")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return Ok(categories);
    }

    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpDelete]
    public async Task<IActionResult> DeleteBrand(Guid id)
    {
        var category = await _categoryRepository.FirstOrDefaultAsync(x => x.Id == id);
        if (category == null) return NotFound();

        _categoryRepository.Delete(category);
        await _categoryRepository.SaveAsync();
        return Ok();
    }

    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpPost]
    public async Task<IActionResult> CreateAsync(CategoryDto dto)
    {
        var exists = await _categoryRepository.AnyAsync(x => x.Name == dto.Name);
        if (exists) return BadRequest("Name exists.");

        var category = _mapper.Map<Category>(dto);
        await _categoryRepository.CreateAsync(category);
        await _categoryRepository.SaveAsync();
        return Ok();
    }
    
    [Authorize(nameof(AuthPolicy.ADMIN))]
    [HttpPut]
    public async Task<IActionResult> UpdateAsync(CategoryDto dto)
    {
        var category = await _categoryRepository.FirstOrDefaultAsync(x => x.Id == dto.Id);
        if (category == null) return BadRequest("Invalid brand");

        var categoryToUpdate = _mapper.Map<Category>(dto);
        category.Name = categoryToUpdate.Name;
        category.Image = categoryToUpdate.Image;

        _categoryRepository.Update(category);
        await _categoryRepository.SaveAsync();
        return Ok();
    }
}