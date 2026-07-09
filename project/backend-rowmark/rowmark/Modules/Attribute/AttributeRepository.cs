using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.Attribute.Entities;

namespace rowmark.Modules.Attribute;

public class AttributeRepository 
{
    private readonly string _connectionString;

    public AttributeRepository(IConfiguration configuration) 
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.Attribute attribute) 
    {
        if (attribute == null) throw new ArgumentNullException(nameof(attribute));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO attribute (name, description, imgurl) 
            VALUES (@Name, @Description, @ImgUrl) 
            RETURNING attributekey;"; 
            
        return db.ExecuteScalar<int>(query, attribute);
    }

    // READ (Todos)
    public List<Entities.Attribute> GetAll() 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT attributekey, name, description, imgurl FROM attribute;";
        
        return db.Query<Entities.Attribute>(query).ToList();
    }

    // READ (Por ID)
    public Entities.Attribute? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT attributekey, name, description, imgurl FROM attribute WHERE attributekey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.Attribute>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.Attribute attribute) 
    {
        if (attribute == null) throw new ArgumentNullException(nameof(attribute));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE attribute 
            SET name = @Name,
                description = @Description,
                imgurl = @ImgUrl
            WHERE attributekey = @AttributeKey;";
            
        int rowsAffected = db.Execute(query, attribute);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM attribute WHERE attributekey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}