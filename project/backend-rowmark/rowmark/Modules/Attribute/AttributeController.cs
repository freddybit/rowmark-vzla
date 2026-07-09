using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.Modules.Attribute.Entities;

namespace rowmark.Modules.Attribute;

[ApiController]
[Route("api/[controller]")] 
public class AttributeController : ControllerBase 
{
    private readonly AttributeService _attributeService;

    public AttributeController(AttributeService attributeService) 
    {
        _attributeService = attributeService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Attribute>> GetAll() 
    {
        try 
        {
            var attributes = _attributeService.GetAllAttributes();
            return Ok(attributes);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Attribute> GetById(int id) 
    {
        try 
        {
            var attribute = _attributeService.GetAttributeById(id);
            if (attribute == null)
                return NotFound($"No se encontró el atributo con ID {id}.");
            
            return Ok(attribute);
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
    public ActionResult<Entities.Attribute> Create([FromBody] Entities.Attribute attribute) 
    {
        try 
        {
            var createdAttribute = _attributeService.CreateAttribute(attribute);
            return CreatedAtAction(nameof(GetById), new { id = createdAttribute.AttributeKey }, createdAttribute);
        }
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El atributo enviado es nulo o inválido: {ex.Message}");
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
    public IActionResult Update(int id, [FromBody] Entities.Attribute attribute) 
    {
        try 
        {
            bool updated = _attributeService.UpdateAttribute(id, attribute);
            
            if (!updated)
                return NotFound($"No se encontró el atributo con ID {id} para actualizar.");
            
            return NoContent();
        } 
        catch (ArgumentNullException ex) 
        {
            return BadRequest($"El atributo enviado es nulo o inválido: {ex.Message}");
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
            bool deleted = _attributeService.DeleteAttribute(id);
            
            if (!deleted)
                return NotFound($"No se encontró el atributo con ID {id} para eliminar.");
            
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