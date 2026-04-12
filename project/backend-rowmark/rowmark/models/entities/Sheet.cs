namespace rowmark.models.entities;

public class Sheet {
    
    // Attributes 

    private string? _imgUrl;
    private string? _imgAlt;
    private string? _name;
    private string? _description;
    private string? _material;
    private string? _finish;
    private string? _attributes;
    private string? _usage;
    private string? _capabilities;
    private int? _unitsAvailable;
    private List<float>? _prices;
    private List<float>? _engravingDepth;
    private List<string>? _sizes;
    private List<string>? _urlVideos;
    
    // Methods
    
    // Constructor #1
    public Sheet() {}
    
    // Constructor #2
    public Sheet(string? imgUrl, string? imgAlt, string? name, string? description, string? material, string? finish, string? attributes, string? usage, string? capabilities, int? unitsAvailable, List<float>? prices, List<float>? engravingDepth, List<string>? sizes, List<string>? urlVideos) {
        _imgUrl = imgUrl;
        _imgAlt = imgAlt;
        _name = name;
        _description = description;
        _material = material;
        _finish = finish;
        _attributes = attributes;
        _usage = usage;
        _capabilities = capabilities;
        _unitsAvailable = unitsAvailable;
        _prices = prices;
        _engravingDepth = engravingDepth;
        _sizes = sizes;
        _urlVideos = urlVideos;
    }

    // Getter and Setter Methods

    public string? ImgUrl {
        get => _imgUrl;
        set => _imgUrl = value;
    }

    public string? ImgAlt {
        get => _imgAlt;
        set => _imgAlt = value;
    }

    public string? Name {
        get => this._name;
        set => this._name = value;
    }

    public string? Description {
        get => this._description;
        set => this._description = value;
    }

    public string? Material {
        get => _material;
        set => _material = value;
    }

    public string? Finish {
        get => _finish;
        set => _finish = value;
    }

    public string? Attributes {
        get => _attributes;
        set => _attributes = value;
    }

    public string? Usage {
        get => _usage;
        set => _usage = value;
    }

    public string? Capabilities {
        get => _capabilities;
        set => _capabilities = value;
    }

    public int? UnitsAvailable {
        get => _unitsAvailable;
        set => _unitsAvailable = value;
    }

    public List<float>? Prices {
        get => _prices;
        set => _prices = value;
    }

    public List<float>? EngravingDepth {
        get => _engravingDepth;
        set => _engravingDepth = value;
    }

    public List<string>? Sizes {
        get => _sizes;
        set => _sizes = value;
    }

    public List<string>? UrlVideos {
        get => _urlVideos;
        set => _urlVideos = value;
    }
}