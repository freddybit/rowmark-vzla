using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.Modules.Color.Entities;

namespace rowmark.Modules.Color;

[ApiController]
[Route("api/[controller]")] 
public class ColorController : ControllerBase {
    private readonly ColorService _colorService;

    public ColorController(ColorService colorService) {
        _colorService = colorService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Color>> GetAll() {
        try {
            var colors = _colorService.GetAllColors();
            return Ok(colors);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Color> GetById(int id) {
        try {
            var color = _colorService.GetColorById(id);
            if (color == null)
                return NotFound($"No se encontró el color con ID {id}.");
            
            return Ok(color);
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message); 
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPost]
    public ActionResult<Entities.Color> Create([FromBody] Entities.Color color) {
        try {
            var createdColor = _colorService.CreateColor(color);
            return CreatedAtAction(nameof(GetById), new { id = createdColor.ColorKey }, createdColor);
        } catch (ArgumentNullException ex) {
            return BadRequest($"El color enviado es nulo o inválido: {ex.Message}");
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Entities.Color color) {
        try {
            bool updated = _colorService.UpdateColor(id, color);
            
            if (!updated)
                return NotFound($"No se encontró el color con ID {id} para actualizar.");
            
            return NoContent();
        } catch (ArgumentNullException ex) {
            return BadRequest($"El color enviado es nulo o inválido: {ex.Message}");
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        try {
            bool deleted = _colorService.DeleteColor(id);
            
            if (!deleted)
                return NotFound($"No se encontró el color con ID {id} para eliminar.");
            
            return NoContent();
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}