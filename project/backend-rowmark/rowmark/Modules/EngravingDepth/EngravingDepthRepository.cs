using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.models.entities;

namespace rowmark.Modules.EngravingDepth;

public class EngravingDepthRepository 
{
    private readonly string _connectionString;

    public EngravingDepthRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.EngravingDepth engravingDepth) {
        if (engravingDepth == null) throw new ArgumentNullException(nameof(engravingDepth));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO engravingdepth (depth, unitmedition) 
            VALUES (@Depth, @UnitMedition) 
            RETURNING engravingdepthkey;"; 
            
        return db.ExecuteScalar<int>(query, engravingDepth);
    }

    // READ (Todos)
    public List<Entities.EngravingDepth> GetAll() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT engravingdepthkey, depth, unitmedition FROM engravingdepth;";
        
        return db.Query<Entities.EngravingDepth>(query).ToList();
    }

    // READ (Por ID)
    public Entities.EngravingDepth? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT engravingdepthkey, depth, unitmedition FROM engravingdepth WHERE engravingdepthkey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.EngravingDepth>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.EngravingDepth engravingDepth) 
    {
        if (engravingDepth == null) throw new ArgumentNullException(nameof(engravingDepth));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE engravingdepth 
            SET depth = @Depth,
                unitmedition = @UnitMedition
            WHERE engravingdepthkey = @EngravingDepthKey;";
            
        int rowsAffected = db.Execute(query, engravingDepth);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM engravingdepth WHERE engravingdepthkey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}