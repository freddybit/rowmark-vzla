using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using rowmark.Modules.Place.Entities;

namespace rowmark.Modules.Place;

[ApiController]
[Route("api/[controller]")] 
public class PlaceController : ControllerBase 
{
    private readonly PlaceService _placeService;

    public PlaceController(PlaceService placeService) 
    {
        _placeService = placeService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Place>> GetAll() 
    {
        try 
        {
            var places = _placeService.GetAllPlaces();
            return Ok(places);
        } 
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Place> GetById(int id) 
    {
        try 
        {
            var place = _placeService.GetPlaceById(id);
            if (place == null)
                return NotFound($"No se encontró el lugar con ID {id}.");
            
            return Ok(place);
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
    public ActionResult<Entities.Place> Create([FromBody] Entities.Place place) 
    {
        try 
        {
            var createdPlace = _placeService.CreatePlace(place);
            return CreatedAtAction(nameof(GetById), new { id = createdPlace.PlaceKey }, createdPlace);
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
    public IActionResult Update(int id, [FromBody] Entities.Place place) 
    {
        try 
        {
            bool updated = _placeService.UpdatePlace(id, place);
            
            if (!updated)
                return NotFound($"No se encontró el lugar con ID {id} para actualizar.");
            
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
            bool deleted = _placeService.DeletePlace(id);
            
            if (!deleted)
                return NotFound($"No se encontró el lugar con ID {id} para eliminar.");
            
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