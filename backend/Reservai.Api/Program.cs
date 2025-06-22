using Microsoft.EntityFrameworkCore;
using Reservai.Api.Data;
using Reservai.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

// Minimal Auth API Example
app.MapPost("/register", async (AppDbContext db, User user) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Ok(user);
});

app.MapPost("/login", async (AppDbContext db, User creds) =>
{
    var user = await db.Users
        .FirstOrDefaultAsync(u => u.Email == creds.Email && u.Password == creds.Password);

    return user != null ? Results.Ok(user) : Results.Unauthorized();
});

app.Run();
