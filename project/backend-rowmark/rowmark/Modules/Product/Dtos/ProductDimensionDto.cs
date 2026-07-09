namespace rowmark.Modules.Product.Dtos;

// 1. El DTO para las Dimensiones/Precios
public class ProductDimensionDto 
{
    public decimal ProductPrice { get; set; }
    public int UnitsAvailable { get; set; }
    public int EngravingDepthKey { get; set; }
    public int SheetSizeKey { get; set; }
}