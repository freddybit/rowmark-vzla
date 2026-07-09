namespace rowmark.Modules.Color.Entities;

public class Color {
    
    // Attributes
    
    public int ColorKey { get; set; }
    public string HexadecimalCode { get; set; }
    public string HexadecimalCore { get; set; }
    public string Name { get; set; }
    public string ImgUrl { get; set; }
    public string? ImgAlt { get; set; }
    public List<Product.Entities.Product>? Product { get; set; } = new List<Product.Entities.Product>();
    
    // Constructor #1
    public Color() {
        ColorKey = 0;
        HexadecimalCode = "";
        HexadecimalCore = "";
        Name = "";
        ImgUrl = "";
        ImgAlt = "";
    }

    // Constructor #2
    public Color(int colorKey, string hexadecimalCode, string hexadecimalCore, string name, string imgUrl, string? imgAlt) {
        ColorKey = colorKey;
        HexadecimalCode = hexadecimalCode;
        HexadecimalCore = hexadecimalCore;
        Name = name;
        ImgUrl = imgUrl;
        ImgAlt = imgAlt;
    }

}