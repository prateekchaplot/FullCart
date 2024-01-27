using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Backend.Dtos;
using Backend.Helpers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IUserRepository userRepository, IOptions<JwtOptions> jwtOptions, IMapper mapper) : ControllerBase
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IOptions<JwtOptions> _jwtOptions = jwtOptions;
    private readonly IMapper _mapper = mapper;

    [HttpPost("[action]")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _userRepository.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (user == null) return BadRequest("Invalid email.");
        
        var hashPassword = AuthHelper.HashPassword(dto.Password);
        if (hashPassword == user.PasswordHash)
        {
            var jwt = GenerateJWT(user);
            return Ok(new { jwt });
        }

        return BadRequest("Incorrect password.");
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var hasUser = await _userRepository.AnyAsync(x => x.Email == dto.Email);
        if (hasUser) return BadRequest("Email exists.");

        var user = _mapper.Map<User>(dto);
        user.PasswordHash = AuthHelper.HashPassword(dto.Password);

        await _userRepository.CreateAsync(user);
        await _userRepository.SaveAsync();

        var jwt = GenerateJWT(user);
        return Ok(new { jwt });
    }

    private string GenerateJWT(User user)
    {
        var claims = new List<Claim>()
        {
            new("name", user.Name),
            new("email", user.Email),
            new("role", user.UserType.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(_jwtOptions.Value.ExpireDays);

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Value.Issuer,
            audience: _jwtOptions.Value.Audience,
            claims: claims,
            signingCredentials: creds,
            expires: expires
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}