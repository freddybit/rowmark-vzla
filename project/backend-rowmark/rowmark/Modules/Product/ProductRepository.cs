using System.Data;
using Dapper;
using Npgsql;
using rowmark.Modules.Product.Dtos;
using System.Text.Json;

namespace rowmark.Modules.Product;

public class ProductRepository {
    private readonly string _connectionString;

    public ProductRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    public int Insert(ProductCreateDto productDto) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        db.Open(); 

        using var transaction = db.BeginTransaction(); 

        try {
            // 1. Insertar el Producto Base
            string sqlProduct = @"
                INSERT INTO product (name, description, imgurl, imgalt, videourl) 
                VALUES (@Name, @Description, @ImgUrl, @ImgAlt, @VideoUrl) 
                RETURNING productkey;";
            
            int newProductKey = db.QuerySingle<int>(sqlProduct, productDto, transaction);

            // 2. Insertar Relaciones Puente
            if (productDto.ColorKeys.Any()) {
                string sqlColor = "INSERT INTO productcolor (color_colorkey, product_productkey) VALUES (@ColorKey, @ProductKey);";
                db.Execute(sqlColor, productDto.ColorKeys.Select(c => new { ColorKey = c, ProductKey = newProductKey }), transaction);
            }

            if (productDto.MaterialKeys.Any()) {
                string sqlMaterial = "INSERT INTO productmaterial (material_materialkey, product_productkey) VALUES (@MaterialKey, @ProductKey);";
                db.Execute(sqlMaterial, productDto.MaterialKeys.Select(m => new { MaterialKey = m, ProductKey = newProductKey }), transaction);
            }

            if (productDto.FinishKeys.Any()) {
                string sqlFinish = "INSERT INTO productfinish (finish_finishkey, product_productkey) VALUES (@FinishKey, @ProductKey);";
                db.Execute(sqlFinish, productDto.FinishKeys.Select(f => new { FinishKey = f, ProductKey = newProductKey }), transaction);
            }

            // ---> NUEVO: Insertar Capabilities <---
            if (productDto.CapabilitiesKeys.Any()) {
                string sqlCap = "INSERT INTO productcapabilities (capabilitie_capabilitiekey, product_productkey) VALUES (@CapKey, @ProductKey);";
                db.Execute(sqlCap, productDto.CapabilitiesKeys.Select(c => new { CapKey = c, ProductKey = newProductKey }), transaction);
            }

            if (productDto.AttributesKeys.Any()) {
                string sqlAtr = "INSERT INTO productattribute (attribute_attributekey, product_productkey) VALUES (@AtrKey, @ProductKey);";
                db.Execute(sqlAtr,productDto.AttributesKeys.Select(a => new { AtrKey = a, ProductKey = newProductKey}), transaction);
            }

            // 3. Insertar las Dimensiones y Precios
            if (productDto.Dimensions.Any()) {
                string sqlDim = @"
                    INSERT INTO productdimension (product_productkey, productprice, engravingdepth_engravingdepthkey, unitsavailables, sheetsize_sheetsizekey) 
                    VALUES (@ProductKey, @ProductPrice, @EngravingDepthKey, @UnitsAvailable, @SheetSizeKey);";
                
                var dimParams = productDto.Dimensions.Select(d => new {
                    ProductKey = newProductKey,
                    ProductPrice = d.ProductPrice,
                    EngravingDepthKey = d.EngravingDepthKey,
                    UnitsAvailable = d.UnitsAvailable,
                    SheetSizeKey = d.SheetSizeKey
                });
                db.Execute(sqlDim, dimParams, transaction);
            }

            // 4. Insertar la Auditoría usando el DTO
            string sqlAudit = @"
                INSERT INTO productauditlog (dateaction, typeaction, product_productkey, profile_profilekey) 
                VALUES (@DateAction, @TypeAction, @ProductKey, @ProfileKey);";
            
            db.Execute(sqlAudit, new { 
                DateAction = DateTime.UtcNow, 
                TypeAction = "CREATE_PRODUCT", 
                ProductKey = newProductKey, 
                ProfileKey = productDto.ProfileKey // <-- Lo sacamos del DTO
            }, transaction);

            // 5. COMMIT
            transaction.Commit();
            return newProductKey;
        } catch (Exception) {
            transaction.Rollback();
            throw; 
        }
    }

    public IEnumerable<Entities.Product> GetAll() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        return db.Query<Entities.Product>("SELECT * FROM product;").ToList();
    }

    // 2. GET BY ID (Trae el producto armado con sus listas)
    public Entities.Product? GetById(int productKey) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        db.Open(); 
    
        string sql = @"

        SELECT * FROM product WHERE productkey = @Id;
        
        SELECT c.* FROM color c 
        INNER JOIN productcolor pc ON c.colorkey = pc.color_colorkey 
        WHERE pc.product_productkey = @Id;

        SELECT m.* FROM material m 
        INNER JOIN productmaterial pm ON m.materialkey = pm.material_materialkey 
        WHERE pm.product_productkey = @Id;

        SELECT f.* FROM finish f 
        INNER JOIN productfinish pf ON f.finishkey = pf.finish_finishkey 
        WHERE pf.product_productkey = @Id;

        SELECT 
            productprice AS ProductPrice,
            CAST(unitsavailables AS INTEGER) AS UnitsAvailable, 
            engravingdepth_engravingdepthkey AS EngravingDept_EngravingDepthKey,
            sheetsize_sheetsizekey AS SheetSize_SheetSizeKey
        FROM productdimension 
        WHERE product_productkey = @Id;
    ";

        using var multi = db.QueryMultiple(sql, new { Id = productKey });
    
        var product = multi.ReadFirstOrDefault<Entities.Product>();
    
        if (product != null) {
            product.Colors = multi.Read<rowmark.Modules.Color.Entities.Color>().ToList();
            product.Materials = multi.Read<rowmark.Modules.Materials.Entities.Material>().ToList();
            product.Finishes = multi.Read<rowmark.Modules.Finish.Entities.Finish>().ToList();
            // Dapper leerá los Alias y los meterá en tu Entidad sin fallar
            product.Dimensions = multi.Read<rowmark.Modules.Product.Entities.ProductDimension>().ToList();
        }
    
        return product;
    }
    
    public void Delete(int productKey) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        db.Open();
        using var transaction = db.BeginTransaction();

        try {
            // Borramos todas las relaciones (tablas puente) primero
            db.Execute("DELETE FROM productcolor WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productmaterial WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productfinish WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productcapabilities WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productattribute WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productdimension WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productauditlog WHERE product_productkey = @Id;", new { Id = productKey }, transaction);

            // Finalmente, borramos el producto base
            db.Execute("DELETE FROM product WHERE productkey = @Id;", new { Id = productKey }, transaction);

            transaction.Commit();
        } catch {
            transaction.Rollback();
            throw;
        }
    }
    
    public IEnumerable<ProductCardDto> GetAllCards() {
    using IDbConnection db = new NpgsqlConnection(_connectionString);
    
    // Consulta nivel Dios usando agregación JSON de PostgreSQL
    string sql = @"
        SELECT 
            p.imgurl AS ImgName,
            p.imgalt AS ImgAlt,
            p.name AS Name,
            p.description AS Description,
            p.videourl AS VideoUrl,
            
            -- Suma todas las unidades disponibles de todas sus dimensiones
            COALESCE((SELECT SUM(unitsavailables) FROM productdimension WHERE product_productkey = p.productkey), 0) AS UnitsAvailable,
            
            -- Construimos los arrays en formato JSON
            (SELECT COALESCE(json_agg(DISTINCT m.name), '[]') FROM productmaterial pm JOIN material m ON m.materialkey = pm.material_materialkey WHERE pm.product_productkey = p.productkey) AS material_json,
            (SELECT COALESCE(json_agg(DISTINCT f.name), '[]') FROM productfinish pf JOIN finish f ON f.finishkey = pf.finish_finishkey WHERE pf.product_productkey = p.productkey) AS finish_json,
            (SELECT COALESCE(json_agg(DISTINCT c.name), '[]') FROM productcapabilities pc JOIN capability c ON c.capabilitykey = pc.capabilitie_capabilitiekey WHERE pc.product_productkey = p.productkey) AS capabilities_json,
            (SELECT COALESCE(json_agg(DISTINCT a.name), '[]') FROM productattribute pa JOIN attribute a ON a.attributekey = pa.attribute_attributekey WHERE pa.product_productkey = p.productkey) AS attributes_json,
            (SELECT COALESCE(json_agg(DISTINCT co.name), '[]') FROM productcolor pco JOIN color co ON co.colorkey = pco.color_colorkey WHERE pco.product_productkey = p.productkey) AS colors_json,
            
            -- Concatenamos la dimensión (Ej: '1200x600 mm')
            (SELECT COALESCE(json_agg(DISTINCT s.length || 'x' || s.width || ' ' || s.unitmedition), '[]') FROM productdimension pd JOIN sheetsize s ON s.sheetsizekey = pd.sheetsize_sheetsizekey WHERE pd.product_productkey = p.productkey) AS sizes_json,
            
            (SELECT COALESCE(json_agg(DISTINCT ed.depth), '[]') FROM productdimension pd JOIN engravingdepth ed ON ed.engravingdepthkey = pd.engravingdepth_engravingdepthkey WHERE pd.product_productkey = p.productkey) AS depths_json,
            
            -- Armamos el arreglo de arreglos para los precios: [[precio, unidades], [precio, unidades]]
            (SELECT COALESCE(json_agg(json_build_array(pd.productprice, pd.unitsavailables)), '[]') FROM productdimension pd WHERE pd.product_productkey = p.productkey) AS prices_json
        FROM product p;";
    
        var results = db.Query(sql);

        var cards = new List<ProductCardDto>();
        
        foreach (var row in results) 
        {
            cards.Add(new ProductCardDto
            {
                ImgName = row.imgname,
                ImgAlt = row.imgalt,
                VideoUrl = row.videourl,
                Name = row.name,
                Description = row.description,
                UnitsAvailable = Convert.ToInt32(row.unitsavailable),
                
                Material = JsonSerializer.Deserialize<List<string>>(row.material_json),
                Finish = JsonSerializer.Deserialize<List<string>>(row.finish_json),
                Capabilities = JsonSerializer.Deserialize<List<string>>(row.capabilities_json),
                Attributes = JsonSerializer.Deserialize<List<string>>(row.attributes_json),
                Colors = JsonSerializer.Deserialize<List<string>>(row.colors_json),
                Sizes = JsonSerializer.Deserialize<List<string>>(row.sizes_json),
                EngravingDepths = JsonSerializer.Deserialize<List<decimal>>(row.depths_json),
                Prices = JsonSerializer.Deserialize<List<List<decimal>>>(row.prices_json)
            });
        }
        
        return cards;
    }
    
    public void Update(int productKey, ProductUpdateDto productDto) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        db.Open(); 
        
        using var transaction = db.BeginTransaction(); 

        try {
            string sqlProduct = @"
                UPDATE product 
                SET name = @Name, 
                    description = @Description, 
                    imgurl = @ImgUrl, 
                    imgalt = @ImgAlt, 
                    videourl = @VideoUrl
                WHERE productkey = @ProductKey;";
            
            db.Execute(sqlProduct, new {
                productDto.Name,
                productDto.Description,
                productDto.ImgUrl,
                productDto.ImgAlt,
                productDto.VideoUrl,
                ProductKey = productKey
            }, transaction);
            
            db.Execute("DELETE FROM productcolor WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productmaterial WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productfinish WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productcapabilities WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productattribute WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            db.Execute("DELETE FROM productdimension WHERE product_productkey = @Id;", new { Id = productKey }, transaction);
            
            if (productDto.ColorKeys.Any()) {
                string sqlColor = "INSERT INTO productcolor (color_colorkey, product_productkey) VALUES (@ColorKey, @ProductKey);";
                db.Execute(sqlColor, productDto.ColorKeys.Select(c => new { ColorKey = c, ProductKey = productKey }), transaction);
            }

            if (productDto.MaterialKeys.Any()) {
                string sqlMaterial = "INSERT INTO productmaterial (material_materialkey, product_productkey) VALUES (@MaterialKey, @ProductKey);";
                db.Execute(sqlMaterial, productDto.MaterialKeys.Select(m => new { MaterialKey = m, ProductKey = productKey }), transaction);
            }

            if (productDto.FinishKeys.Any()) {
                string sqlFinish = "INSERT INTO productfinish (finish_finishkey, product_productkey) VALUES (@FinishKey, @ProductKey);";
                db.Execute(sqlFinish, productDto.FinishKeys.Select(f => new { FinishKey = f, ProductKey = productKey }), transaction);
            }

            if (productDto.CapabilitiesKeys.Any()) {
                string sqlCap = "INSERT INTO productcapabilities (capabilitie_capabilitiekey, product_productkey) VALUES (@CapKey, @ProductKey);";
                db.Execute(sqlCap, productDto.CapabilitiesKeys.Select(c => new { CapKey = c, ProductKey = productKey }), transaction);
            }

            if (productDto.AttributesKeys.Any()) {
                string sqlAtr = "INSERT INTO productattribute (attribute_attributekey, product_productkey) VALUES (@AtrKey, @ProductKey);";
                db.Execute(sqlAtr, productDto.AttributesKeys.Select(a => new { AtrKey = a, ProductKey = productKey }), transaction);
            }
            
            if (productDto.Dimensions.Any()) {
                string sqlDim = @"
                    INSERT INTO productdimension (product_productkey, productprice, engravingdepth_engravingdepthkey, unitsavailables, sheetsize_sheetsizekey) 
                    VALUES (@ProductKey, @ProductPrice, @EngravingDepthKey, @UnitsAvailable, @SheetSizeKey);";
                
                var dimParams = productDto.Dimensions.Select(d => new {
                    ProductKey = productKey,
                    ProductPrice = d.ProductPrice,
                    EngravingDepthKey = d.EngravingDepthKey,
                    UnitsAvailable = d.UnitsAvailable,
                    SheetSizeKey = d.SheetSizeKey
                });
                db.Execute(sqlDim, dimParams, transaction);
            }
            
            string sqlAudit = @"
                INSERT INTO productauditlog (dateaction, typeaction, product_productkey, profile_profilekey) 
                VALUES (@DateAction, @TypeAction, @ProductKey, @ProfileKey);";
            
            db.Execute(sqlAudit, new { 
                DateAction = DateTime.UtcNow, 
                TypeAction = "UPDATE_PRODUCT",
                ProductKey = productKey, 
                ProfileKey = productDto.ProfileKey 
            }, transaction);
            
            transaction.Commit();
        } catch (Exception) {
            transaction.Rollback();
            throw; 
        }
    }
    
}