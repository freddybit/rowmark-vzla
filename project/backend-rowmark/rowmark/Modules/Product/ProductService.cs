using rowmark.Modules.Product.Dtos;
using rowmark.Modules.Product.Entities;

namespace rowmark.Modules.Product;

public class ProductService {
    private readonly ProductRepository _repository;

    public ProductService(ProductRepository repository) {
        _repository = repository;
    }

    public IEnumerable<Entities.Product> GetAllProducts() {
        return _repository.GetAll();
    }

    public Entities.Product? GetProductById(int id) {
        if (id <= 0) throw new ArgumentException("El ID del producto no es válido.");
        return _repository.GetById(id);
    }

    // Recibimos el ProfileKey de quien ejecuta la acción para la tabla de Auditoría
    public Entities.Product CreateProduct(ProductCreateDto dto) {
        if (string.IsNullOrWhiteSpace(dto.Name)) 
            throw new ArgumentException("El nombre del producto es obligatorio.");
            
        if (!dto.Dimensions.Any())
            throw new ArgumentException("El producto debe tener al menos una configuración de precio/dimensión.");

        int newId = _repository.Insert(dto);
        
        // Retornamos el producto recién creado (con todas sus relaciones)
        return _repository.GetById(newId)!; 
    }

    public void DeleteProduct(int id) {
        if (id <= 0) throw new ArgumentException("El ID del producto no es válido.");
        
        var existingProduct = _repository.GetById(id);
        if (existingProduct == null) 
            throw new Exception("El producto que intentas eliminar no existe.");

        _repository.Delete(id);
    }
    
    public IEnumerable<ProductCardDto> GetAllProductCards() {
        return _repository.GetAllCards();
    }
    
}