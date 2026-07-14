
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Microsoft.OpenApi;
using rowmark.Modules.Attribute;
using rowmark.modules.auth;
using rowmark.Modules.Capability;
using rowmark.Modules.Color;
using rowmark.Modules.EngravingDepth;
using rowmark.Modules.Finish;
using rowmark.Modules.Materials;
using rowmark.Modules.Place;
using rowmark.Modules.Product;
using rowmark.Modules.SheetSize;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthModule();
builder.Services.AddMaterialModule();
builder.Services.AddCapabilityModule();
builder.Services.AddColorModule();
builder.Services.AddEngravingDepthModule();
builder.Services.AddAttributeModule();
builder.Services.AddFinishModule();
builder.Services.AddPlaceModule();
builder.Services.AddSheetSizeModule();
builder.Services.AddProductModule();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularDev", policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
    options.AddPolicy("AllowAngularApp",
        policy => {
            policy.WithOrigins("http://localhost:8080", "https://rowmark-vzla.vercel.app").AllowAnyHeader() .AllowAnyMethod();
        });
});

builder.Services.AddOpenApi(options => {
    options.AddDocumentTransformer((document, context, cancellationToken) => {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes?.Add("Bearer", new OpenApiSecurityScheme {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        });
        return Task.CompletedTask;
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration.GetSection("AppSettings:Issuer").Value,
        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetSection("AppSettings:Audience").Value,
        ValidateLifetime = true
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");
app.UseCors("AllowAngularApp"); 
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
