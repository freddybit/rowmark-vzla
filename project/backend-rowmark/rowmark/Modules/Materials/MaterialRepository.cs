using System.Data;
using Dapper;
using Npgsql;
using rowmark.Modules.Materials.Entities;

namespace rowmark.Modules.Materials;

public class MaterialRepository {
    
    private readonly string _connectionString;

    public MaterialRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Material material) {
        if (material == null) throw new ArgumentNullException(nameof(material));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO material (imgurl, name, category, description) 
            VALUES (@ImgUrl, @Name, @Category, @Description) 
            RETURNING materialkey;"; 
            
        return db.ExecuteScalar<int>(query, material);
    }

    // READ (Todos)
    public List<Material> GetAll() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT materialkey, imgurl, name, category, description FROM material;";
        
        return db.Query<Material>(query).ToList();
    }

    // READ (Por ID)
    public Material? GetById(int id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT materialkey, imgurl, name, category, description FROM material WHERE materialkey = @Id;";
        
        return db.QueryFirstOrDefault<Material>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Material material) {
        if (material == null) throw new ArgumentNullException(nameof(material));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE material 
            SET imgurl = @ImgUrl,
                name = @Name,
                category = @Category,
                description = @Description
            WHERE materialkey = @MaterialKey;";
            
        int rowsAffected = db.Execute(query, material);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM material WHERE materialkey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}