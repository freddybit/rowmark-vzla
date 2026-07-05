namespace rowmark.Modules.Product.Dtos;

public class ProductCreateDto 
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImgUrl { get; set; } = string.Empty;
    public string ImgAlt { get; set; } = string.Empty;
    
    // Ahora el ProfileKey viene en el JSON
    public int ProfileKey { get; set; } 

    // Relaciones (Solo los IDs)
    public List<int> ColorKeys { get; set; } = new();
    public List<int> MaterialKeys { get; set; } = new();
    public List<int> AttributesKeys { get; set; } = new();
    public List<int> FinishKeys { get; set; } = new();
    public List<int> CapabilitiesKeys { get; set; } = new(); // <-- Añadido
    
    // Precios y Dimensiones
    public List<ProductDimensionDto> Dimensions { get; set; } = new();
}