using System;
using System.Collections.Generic;
using rowmark.Modules.Color.Entities;

namespace rowmark.Modules.Color;

public class ColorService {
    private readonly ColorRepository _repository;

    public ColorService(ColorRepository repository) {
        _repository = repository;
    }

    public Entities.Color CreateColor(Entities.Color color) {
        if (color == null)
            throw new ArgumentNullException(nameof(color));
            
        if (string.IsNullOrWhiteSpace(color.Name))
            throw new ArgumentException("El nombre del color no puede estar vacío.");
            
        if (string.IsNullOrWhiteSpace(color.HexadecimalCode))
            throw new ArgumentException("El código hexadecimal no puede estar vacío.");

        int newId = _repository.Insert(color);
        color.ColorKey = newId;
        
        return color;
    }

    public IEnumerable<Entities.Color> GetAllColors() {
        return _repository.GetAll();
    }

    public Entities.Color GetColorById(int id) {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdateColor(int id, Entities.Color color) {
        if (color == null)
            throw new ArgumentNullException(nameof(color));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(color.Name))
            throw new ArgumentException("El nombre del color no puede estar vacío.");
            
        if (string.IsNullOrWhiteSpace(color.HexadecimalCode))
            throw new ArgumentException("El código hexadecimal no puede estar vacío.");

        color.ColorKey = id; 
        
        return _repository.Update(color);
    }

    public bool DeleteColor(int id) {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}