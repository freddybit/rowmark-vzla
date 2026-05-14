namespace rowmark.models.entities;

public class ProductDimension {
    
    // Attributes
    
    public int ProductDimensionKey { get; set; }
    public int Product_ProductKey { get; set; }
    public decimal ProductPrice { get; set; }
    public int EngravingDept_EngravingDepthKey { get; set; }
    public int UnitsAvailable { get; set; }
    public int SheetSize_SheetSizeKey { get; set; }
    public Product? Product { get; set; }
    public EngravingDepth? EngravingDept { get; set; }
    public SheetSize? SheetSize { get; set; }
    
    // Constructor #1
    public ProductDimension() {
        ProductDimensionKey = 0;
        ProductPrice = 0; 
        EngravingDept_EngravingDepthKey = 0;
        UnitsAvailable = 0;
        SheetSize_SheetSizeKey = 0;
    }
    
    // Construtor #2
    public ProductDimension(int productDimensionKey, int productProductKey, decimal productPrice, int engravingDeptEngravingDepthKey, int unitsAvailable, int sheetSizeSheetSizeKey) {
        ProductDimensionKey = productDimensionKey;
        Product_ProductKey = productProductKey;
        ProductPrice = productPrice;
        EngravingDept_EngravingDepthKey = engravingDeptEngravingDepthKey;
        UnitsAvailable = unitsAvailable;
        SheetSize_SheetSizeKey = sheetSizeSheetSizeKey;
    }

}