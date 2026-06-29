using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.Modules.Finish.Entities;

namespace rowmark.Modules.Finish;

[ApiController]
[Route("api/[controller]")] 
public class FinishController : ControllerBase 
{
    private readonly FinishService _finishService;

    public FinishController(FinishService finishService) 
    {
        _finishService = finishService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Finish>> GetAll() 
    {
        try 
        {
            var finishes = _finishService.GetAllFinishes();
            return Ok(finishes);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Finish> GetById(int id) 
    {
        try 
        {
            var finish = _finishService.GetFinishById(id);
            if (finish == null)
                return NotFound($"No se encontró el acabado con ID {id}.");
            
            return Ok(finish);
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
    public ActionResult<Entities.Finish> Create([FromBody] Entities.Finish finish) 
    {
        try 
        {
            var createdFinish = _finishService.CreateFinish(finish);
            return CreatedAtAction(nameof(GetById), new { id = createdFinish.FinishKey }, createdFinish);
        }
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El acabado enviado es nulo o inválido: {ex.Message}");
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
    public IActionResult Update(int id, [FromBody] Entities.Finish finish) 
    {
        try 
        {
            bool updated = _finishService.UpdateFinish(id, finish);
            
            if (!updated)
                return NotFound($"No se encontró el acabado con ID {id} para actualizar.");
            
            return NoContent();
        } 
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El acabado enviado es nulo o inválido: {ex.Message}");
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
            bool deleted = _finishService.DeleteFinish(id);
            
            if (!deleted)
                return NotFound($"No se encontró el acabado con ID {id} para eliminar.");
            
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