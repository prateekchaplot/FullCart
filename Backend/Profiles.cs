using System.Text;
using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend;

public class Profiles : Profile
{
    public Profiles()
    {
        CreateMap<RegisterDto, User>();

        CreateMap<BrandDto, Brand>()
        .ForMember(b => b.Image, opt => opt.MapFrom(dto => Convert.FromBase64String(dto.Image)));

        CreateMap<CategoryDto, Category>()
        .ForMember(b => b.Image, opt => opt.MapFrom(dto => Convert.FromBase64String(dto.Image)));
    }
}