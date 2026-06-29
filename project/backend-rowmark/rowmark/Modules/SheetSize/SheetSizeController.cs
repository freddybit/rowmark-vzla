using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.Modules.SheetSize.Entities;

namespace rowmark.Modules.SheetSize;

[ApiController]
[Route("api/[controller]")] 
public class SheetSizeController : ControllerBase 
{
    private readonly SheetSizeService _sheetSizeService;

    public SheetSizeController(SheetSizeService sheetSizeService) 
    {
        _sheetSizeService = sheetSizeService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.SheetSize>> GetAll() 
    {
        try 
        {
            var sheetSizes = _sheetSizeService.GetAllSheetSizes();
            return Ok(sheetSizes);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.SheetSize> GetById(int id) 
    {
        try 
        {
            var sheetSize = _sheetSizeService.GetSheetSizeById(id);
            if (sheetSize == null)
                return NotFound($"No se encontró el tamaño de lámina con ID {id}.");
            
            return Ok(sheetSize);
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
    public ActionResult<Entities.SheetSize> Create([FromBody] Entities.SheetSize sheetSize) 
    {
        try 
        {
            var createdSheetSize = _sheetSizeService.CreateSheetSize(sheetSize);
            return CreatedAtAction(nameof(GetById), new { id = createdSheetSize.SheetSizeKey }, createdSheetSize);
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
    public IActionResult Update(int id, [FromBody] Entities.SheetSize sheetSize) 
    {
        try 
        {
            bool updated = _sheetSizeService.UpdateSheetSize(id, sheetSize);
            
            if (!updated)
                return NotFound($"No se encontró el tamaño de lámina con ID {id} para actualizar.");
            
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
            bool deleted = _sheetSizeService.DeleteSheetSize(id);
            
            if (!deleted)
                return NotFound($"No se encontró el tamaño de lámina con ID {id} para eliminar.");
            
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