using Microsoft.AspNetCore.Mvc;
using rowmark.interfaces;
using rowmark.models.dto;

namespace rowmark.controllers;

[ApiController]
[Route("api/[controller]")]
public class RoleController : ControllerBase {

    private IRoleService _roleService;

    public RoleController(IRoleService roleService) {
        _roleService = roleService;
    }

    [HttpPost("create")]
    public ActionResult<bool> CreateRole([FromBody] RoleDto? request) {
        if (request == null)
            return BadRequest("Error: Formato de la peticion incorrecta");
        bool bol = _roleService.CreateRole(request);
        
        return (bol == true) ? Ok(bol) : BadRequest("Error: No se creo correctamente el rol");
    }
    
}