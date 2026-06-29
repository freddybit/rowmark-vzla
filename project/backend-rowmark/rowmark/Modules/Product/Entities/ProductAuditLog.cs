using rowmark.Modules.Auth.entities;

namespace rowmark.models.entities;

public class ProductAuditLog {
    
    // Attributes
    
    public int ProductAuditLogKey { get; set; }
    public DateTime DateAction { get; set; }
    public string TypeAction { get; set; }
    public int Product_ProductKey { get; set; }
    public int Profile_ProfileKey { get; set; }
    public Profile? Profile { get; set; }
    
    // Constructor #1
    public ProductAuditLog() {
        ProductAuditLogKey = 0;
        DateAction = DateTime.UtcNow;
        TypeAction = "";
        Product_ProductKey = 0;
        Profile_ProfileKey = 0;
    }
    
    // Constructor #2
    public ProductAuditLog(int productAuditLogKey, DateTime dateAction, string typeAction, int productProductKey, int profileProfileKey) {
        ProductAuditLogKey = productAuditLogKey;
        DateAction = dateAction;
        TypeAction = typeAction;
        Product_ProductKey = productProductKey;
        Profile_ProfileKey = profileProfileKey;
    }

}