using System.Text.Json.Serialization;

namespace rowmark.Modules.Product.Dtos;

public class ProductCardDto 
{
    public string ImgName { get; set; } = string.Empty;
    public string ImgAlt { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int UnitsAvailable { get; set; }
    
    public List<string> Material { get; set; } = new();
    public List<string> Finish { get; set; } = new();
    public List<string> Capabilities { get; set; } = new();
    public List<string> Attributes { get; set; } = new();
    public List<string> Sizes { get; set; } = new();
    public List<decimal> EngravingDepths { get; set; } = new();
    public List<List<decimal>> Prices { get; set; } = new();
    public List<string>? Colors { get; set; } = new();
}