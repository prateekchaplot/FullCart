using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend;

public class Profiles : Profile
{
    public Profiles()
    {
        CreateMap<RegisterDto, User>();
    }
}