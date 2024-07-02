using HireHatchServer.Data;
using HireHatchServer.Interfaces;
using HireHatchServer.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddDbContext<JobContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors(policy =>
    policy.WithOrigins("http://localhost:4200")
          .AllowAnyMethod()
          .AllowAnyHeader());

app.MapControllers();

app.Run();