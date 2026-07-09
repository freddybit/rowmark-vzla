using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using rowmark.Modules.Color.Entities;

namespace rowmark.Modules.Color;

public class ColorRepository {
    private readonly string _connectionString;

    public ColorRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("SupabaseConnection")!;
    }

    // CREATE
    public int Insert(Entities.Color color) {
        if (color == null) throw new ArgumentNullException(nameof(color));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
        INSERT INTO color (hexadecimalcode, hexadecimalcore, name, imgurl, imgalt) 
        VALUES (@HexadecimalCode, @HexadecimalCore, @Name, @ImgUrl, @ImgAlt) 
        RETURNING colorkey;"; 
        
        return db.ExecuteScalar<int>(query, color);
    }

    // READ (Todos)
    public List<Entities.Color> GetAll() {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT colorkey, hexadecimalcode, hexadecimalcore, name, imgurl, imgalt FROM color;";
        
        return db.Query<Entities.Color>(query).ToList();
    }

    // READ (Por ID)
    public Entities.Color? GetById(int id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "SELECT * FROM color WHERE colorkey = @Id;";
        
        return db.QueryFirstOrDefault<Entities.Color>(query, new { Id = id });
    }

    // UPDATE
    public bool Update(Entities.Color color) {
        if (color == null) throw new ArgumentNullException(nameof(color));

        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = @"
            UPDATE color 
            SET hexadecimalcode = @HexadecimalCode,
                hexadecimalcore = @HexadecimalCore,
                name = @Name,
                imgurl = @ImgUrl,
                imgalt = @ImgAlt
            WHERE colorkey = @ColorKey;";
            
        int rowsAffected = db.Execute(query, color);
        return rowsAffected > 0;
    }

    // DELETE
    public bool Delete(int id) {
        using IDbConnection db = new NpgsqlConnection(_connectionString);
        
        string query = "DELETE FROM color WHERE colorkey = @Id;";
        
        int rowsAffected = db.Execute(query, new { Id = id });
        return rowsAffected > 0;
    }
}