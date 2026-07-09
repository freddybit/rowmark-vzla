using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace rowmark.Modules.EngravingDepth;

[ApiController]
[Route("api/[controller]")] 
public class EngravingDepthController : ControllerBase 
{
    private readonly EngravingDepthService _engravingDepthService;

    public EngravingDepthController(EngravingDepthService engravingDepthService) 
    {
        _engravingDepthService = engravingDepthService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.EngravingDepth>> GetAll() 
    {
        try 
        {
            var depths = _engravingDepthService.GetAllEngravingDepths();
            return Ok(depths);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.EngravingDepth> GetById(int id) 
    {
        try 
        {
            var depth = _engravingDepthService.GetEngravingDepthById(id);
            if (depth == null)
                return NotFound($"No se encontró la profundidad de grabado con ID {id}.");
            
            return Ok(depth);
        }
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message); 
        }
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPost]
    public ActionResult<Entities.EngravingDepth> Create([FromBody] Entities.EngravingDepth engravingDepth) 
    {
        try 
        {
            var createdDepth = _engravingDepthService.CreateEngravingDepth(engravingDepth);
            return CreatedAtAction(nameof(GetById), new { id = createdDepth.EngravingDepthKey }, createdDepth);
        }
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El registro enviado es nulo o inválido: {ex.Message}");
        }
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Entities.EngravingDepth engravingDepth) 
    {
        try 
        {
            bool updated = _engravingDepthService.UpdateEngravingDepth(id, engravingDepth);
            
            if (!updated)
                return NotFound($"No se encontró la profundidad de grabado con ID {id} para actualizar.");
            
            return NoContent();
        } 
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El registro enviado es nulo o inválido: {ex.Message}");
        }
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) 
    {
        try 
        {
            bool deleted = _engravingDepthService.DeleteEngravingDepth(id);
            
            if (!deleted)
                return NotFound($"No se encontró la profundidad de grabado con ID {id} para eliminar.");
            
            return NoContent();
        } 
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}