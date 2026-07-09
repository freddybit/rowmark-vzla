using Microsoft.AspNetCore.Mvc;
using rowmark.Modules.Product.Dtos;

namespace rowmark.Modules.Product;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase {
    private readonly ProductService _productService;

    public ProductController(ProductService productService) {
        _productService = productService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Entities.Product>> GetAll() {
        return Ok(_productService.GetAllProducts());
    }

    [HttpGet("{id}")]
    public ActionResult<Entities.Product> GetById(int id) {
        try {
            var product = _productService.GetProductById(id);
            if (product == null) return NotFound();
            return Ok(product);
        } catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public ActionResult<Entities.Product> Create([FromBody] ProductCreateDto dto) {
        try {
            // El Service también debes actualizarlo para que reciba solo el dto
            var newProduct = _productService.CreateProduct(dto);
            return CreatedAtAction(nameof(GetById), new { id = newProduct.ProductKey }, newProduct);
        } catch (Exception ex) {
            return StatusCode(500, "Error interno al crear el producto: " + ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id) {
        try {
            _productService.DeleteProduct(id);
            return NoContent(); // 204
        }
        catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } catch (Exception ex) {
            // Puede ser la excepción de que no existe
            return NotFound(ex.Message);
        }
    }
    
    [HttpGet("cards")]
    public ActionResult<IEnumerable<ProductCardDto>> GetAllCards() {
        return Ok(_productService.GetAllProductCards());
    }
    
    // ... Tus otros endpoints (GetAll, GetById, Create, Delete) ...

    [HttpPut("{id}")]
    public ActionResult<Entities.Product> Update(int id, [FromBody] ProductUpdateDto dto) {
        try {
            var updatedProduct = _productService.UpdateProduct(id, dto);
            return Ok(updatedProduct);
        } 
        catch (ArgumentException ex) {
            return BadRequest(ex.Message);
        } 
        catch (Exception ex) {
            return StatusCode(500, "Error interno al actualizar el producto: " + ex.Message);
        }
    }
    
}