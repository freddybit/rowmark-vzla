using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.models.entities;
using rowmark.Modules.Materials.Entities;

namespace rowmark.Modules.Materials;

[ApiController]
[Route("api/[controller]")] // La ruta será: api/Material
public class MaterialController : ControllerBase {
    private readonly MaterialService _materialService;

    // Inyectamos el servicio
    public MaterialController(MaterialService materialService) {
        _materialService = materialService;
    }

    // READ ALL: GET api/Material
    [HttpGet]
    public ActionResult<IEnumerable<Material>> GetAll() {
        try {
            var materials = _materialService.GetAllMaterials();
            return Ok(materials); // Retorna 200 OK con la lista
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // READ ONE: GET api/Material/{id}
    [HttpGet("{id}")]
    public ActionResult<Material> GetById(int id) {
        try {
            var material = _materialService.GetMaterialById(id);
            if (material == null)
                return NotFound($"No se encontró el material con ID {id}."); // Retorna 404
            
            return Ok(material); // Retorna 200 OK con el objeto
        }
        catch (ArgumentException ex) {
            return BadRequest(ex.Message); 
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // CREATE: POST api/Material
    [HttpPost]
    public ActionResult<Material> Create([FromBody] Material material) {
        try {
            // ⬅️ CAMBIO AQUÍ: Ahora le pasamos el objeto completo al servicio
            var createdMaterial = _materialService.CreateMaterial(material);
            
            // Retorna 201 Created y la URL para consultar el nuevo recurso
            return CreatedAtAction(nameof(GetById), new { id = createdMaterial.MaterialKey }, createdMaterial);
        }
        catch (ArgumentNullException ex) {
            return BadRequest($"El material enviado es nulo o inválido: {ex.Message}");
        }
        catch (ArgumentException ex) {
            return BadRequest(ex.Message); // Ej. Si el nombre viene vacío
        }
        catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // UPDATE: PUT api/Material/{id}
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Material material) {
        try {
            // ⬅️ CAMBIO AQUÍ: Ahora le pasamos el ID y el objeto completo al servicio
            bool updated = _materialService.UpdateMaterial(id, material);
            
            if (!updated)
                return NotFound($"No se encontró el material con ID {id} para actualizar.");
            
            return NoContent(); // 204 No Content es el estándar REST para un PUT exitoso
        } 
        catch (ArgumentNullException ex) {
            return BadRequest($"El material enviado es nulo o inválido: {ex.Message}");
        }
        catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } 
        catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    // DELETE: DELETE api/Material/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        try {
            bool deleted = _materialService.DeleteMaterial(id);
            
            if (!deleted)
                return NotFound($"No se encontró el material con ID {id} para eliminar.");
            
            return NoContent(); // 204 No Content
        } 
        catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } 
        catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}