using Microsoft.AspNetCore.Mvc;
using rowmark.interfaces;
using rowmark.models.dto;
using rowmark.models.entities;

namespace rowmark.controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) {
        _authService = authService;
    }

    [HttpPost("register")]
    public ActionResult<Profile> RegisterProfile([FromBody] ProfileRegisterDto request) {
        Task<Profile?> response = _authService.RegisterProfile(request);
        return Ok(response); 
    }

    [HttpPost("login")]
    public ActionResult<string> LoginProfile([FromBody] ProfileLoginDto request) {
        var response = _authService.LoginProfile(request);
        return Ok(response);
    }
    
}