using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.SheetSize.Entities;

namespace rowmark.Modules.SheetSize;

public class SheetSizeRepository 
{
    private readonly string _connectionString;

    public SheetSizeRepository(IConfiguration configuration) 
    {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.SheetSize sheetSize) 
    {
        if (sheetSize == null) throw new ArgumentNullException(nameof(sheetSize));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            INSERT INTO sheetsize (length, width, height, unitmedition) 
            VALUES (@Length, @Width, @Height, @unitMedition) 
            RETURNING sheetsizekey;"; 
            
        return db.ExecuteScalar<int>(query, sheetSize);
    }

    // READ (Todos)
    public List<Entities.SheetSize> GetAll() 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT sheetsizekey, length, width, height, unitmedition FROM sheetsize;";
        
        return db.Query<Entities.SheetSize>(query).ToList();
    }

    // READ (Por ID)
    public Entities.SheetSize? GetById(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT sheetsizekey, length, width, height, unitmedition FROM sheetsize WHERE sheetsizekey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.SheetSize>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.SheetSize sheetSize) 
    {
        if (sheetSize == null) throw new ArgumentNullException(nameof(sheetSize));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE sheetsize 
            SET length = @Length,
                width = @Width,
                height = @Height,
                unitmedition = @unitMedition
            WHERE sheetsizekey = @SheetSizeKey;";
            
        int rowsAffected = db.Execute(query, sheetSize);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) 
    {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM sheetsize WHERE sheetsizekey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}