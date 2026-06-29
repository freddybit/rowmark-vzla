using Microsoft.AspNetCore.Mvc;

namespace rowmark.Modules.Capability;

[ApiController]
[Route("api/[controller]")] 
public class CapabilityController : ControllerBase {
    private readonly CapabilityService _capabilityService;

    public CapabilityController(CapabilityService capabilityService) {
        _capabilityService = capabilityService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Capability>> GetAll() {
        try {
            var capabilities = _capabilityService.GetAllCapabilities();
            return Ok(capabilities);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Capability> GetById(int id) {
        try {
            var capability = _capabilityService.GetCapabilityById(id);
            if (capability == null)
                return NotFound($"No se encontró la capacidad con ID {id}.");
            
            return Ok(capability);
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message); 
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPost]
    public ActionResult<Entities.Capability> Create([FromBody] Entities.Capability capability) {
        try {
            var createdCapability = _capabilityService.CreateCapability(capability);
            return CreatedAtAction(nameof(GetById), new { id = createdCapability.CapabilityKey }, createdCapability);
        } catch (ArgumentNullException ex) {
            return BadRequest($"La capacidad enviada es nula o inválida: {ex.Message}");
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Entities.Capability capability) {
        try {
            bool updated = _capabilityService.UpdateCapability(id, capability);
            
            if (!updated)
                return NotFound($"No se encontró la capacidad con ID {id} para actualizar.");
            
            return NoContent();
        } catch (ArgumentNullException ex) {
            return BadRequest($"La capacidad enviada es nula o inválida: {ex.Message}");
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        try {
            bool deleted = _capabilityService.DeleteCapability(id);
            
            if (!deleted)
                return NotFound($"No se encontró la capacidad con ID {id} para eliminar.");
            
            return NoContent();
        } 
        catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}