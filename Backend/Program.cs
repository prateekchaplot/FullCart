using System.Text;
using Backend.Data;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add database
var connStr = builder.Configuration.GetConnectionString("Database") ?? throw new Exception();
builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(connStr));

// Configure AppSettings
builder.Configuration.Bind(AppSettings.GetInstance());

// Add Authorization
builder.Services
.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    var jwtOptions = AppSettings.GetInstance().JwtOptions;
    var keyInBytes = Encoding.UTF8.GetBytes(jwtOptions.Key);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(keyInBytes)
    };
});

// Add services to the container.
builder.Services.AddRepositories();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddAutoMapper(typeof(Program));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Seed data
app.Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers()
.RequireAuthorization();

app.Run();
