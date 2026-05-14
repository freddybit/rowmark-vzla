namespace rowmark.models.entities;

public class Color {
    
    // Attributes
    
    public int ColorKey { get; set; }
    public string HexadecimalCode { get; set; }
    public string Name { get; set; }
    public string ImgUrl { get; set; }
    public string? ImgAlt { get; set; }
    public List<Product>? Product { get; set; } = new List<Product>();
    
    // Constructor #1
    public Color() {
        ColorKey = 0;
        HexadecimalCode = "";
        Name = "";
        ImgUrl = "";
        ImgAlt = "";
    }

    // Constructor #2
    public Color(int colorKey, string hexadecimalCode, string name, string imgUrl, string? imgAlt) {
        ColorKey = colorKey;
        HexadecimalCode = hexadecimalCode;
        Name = name;
        ImgUrl = imgUrl;
        ImgAlt = imgAlt;
    }

}