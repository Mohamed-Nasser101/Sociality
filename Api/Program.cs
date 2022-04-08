using Api.Extensions;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

var services = app.Services.CreateScope().ServiceProvider;
var logger = services.GetRequiredService<ILogger<Program>>();

var context = services.GetRequiredService<DataContext>();
await context.SeedDatabase(logger);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("CorsPolicy");
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();