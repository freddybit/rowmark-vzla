namespace rowmark.Modules.Product.Dtos;

public class ProductUpdateDto {
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImgUrl { get; set; } = string.Empty;
    public string ImgAlt { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    
    public List<int> ColorKeys { get; set; } = new List<int>();
    public List<int> MaterialKeys { get; set; } = new List<int>();
    public List<int> FinishKeys { get; set; } = new List<int>();
    public List<int> CapabilitiesKeys { get; set; } = new List<int>();
    public List<int> AttributesKeys { get; set; } = new List<int>();
    
    public List<ProductDimensionDto> Dimensions { get; set; } = new List<ProductDimensionDto>();
    public int ProfileKey { get; set; } 
}