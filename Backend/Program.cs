using Microsoft.EntityFrameworkCore;
using Scheduler.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<SchedulerDb>(options => options.UseInMemoryDatabase("items"));
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo {
        Title = "D&D Scheduler",
        Description = "For scheduling D&D",
        Version = "v1"
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "D&D Scheduler API V1");
});

app.MapGet("/", () => "Hello World!");
app.MapGet("/players", async (SchedulerDb db) => await db.Players.ToListAsync());

app.Run();
