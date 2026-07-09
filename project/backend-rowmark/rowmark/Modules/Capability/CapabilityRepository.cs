using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.Capability.Entities;

namespace rowmark.Modules.Capability;

public class CapabilityRepository 
{
    private readonly string _connectionString;

    public CapabilityRepository(IConfiguration configuration) 
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.Capability capability) 
    {
        if (capability == null) throw new ArgumentNullException(nameof(capability));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO capability (name, imgurl, description, category) 
            VALUES (@Name, @ImgUrl, @Description, @Category) 
            RETURNING capabilitykey;"; 
            
        return db.ExecuteScalar<int>(query, capability);
    }

    // READ (Todos)
    public List<Entities.Capability> GetAll() 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT capabilitykey, name, imgurl, description, category FROM capability;";
        
        return db.Query<Entities.Capability>(query).ToList();
    }

    // READ (Por ID)
    public Entities.Capability? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT capabilitykey, name, imgurl, description, category FROM capability WHERE capabilitykey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.Capability>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.Capability capability) 
    {
        if (capability == null) throw new ArgumentNullException(nameof(capability));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE capability 
            SET name = @Name,
                imgurl = @ImgUrl,
                description = @Description,
                category = @Category
            WHERE capabilitykey = @CapabilityKey;";
            
        int rowsAffected = db.Execute(query, capability);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM capability WHERE capabilitykey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}