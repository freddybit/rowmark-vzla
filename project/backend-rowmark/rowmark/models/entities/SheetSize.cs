namespace rowmark.models.entities;

public class SheetSize {
    
    // Attributes
    
    public int SheetSizeKey { get; set; }
    public int Length { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public string unitMedition { get; set; }
    
    // Constructor #1
    public SheetSize() {
        SheetSizeKey = 0;
        Length = 0;
        Width = 0;
        Height = 0;
        unitMedition = "";
    }

    // Constructor #2
    public SheetSize(int sheetSizeKey, int length, int width, int height, string unitMedition) {
        SheetSizeKey = sheetSizeKey;
        Length = length;
        Width = width;
        Height = height;
        this.unitMedition = unitMedition;
    }

}