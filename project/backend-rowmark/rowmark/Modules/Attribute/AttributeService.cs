using System;
using System.Collections.Generic;
using rowmark.Modules.Attribute.Entities;

namespace rowmark.Modules.Attribute;

public class AttributeService 
{
    private readonly AttributeRepository _repository;

    public AttributeService(AttributeRepository repository) 
    {
        _repository = repository;
    }

    public Entities.Attribute CreateAttribute(Entities.Attribute attribute) 
    {
        if (attribute == null)
            throw new ArgumentNullException(nameof(attribute));
            
        if (string.IsNullOrWhiteSpace(attribute.Name))
            throw new ArgumentException("El nombre del atributo no puede estar vacío.");

        int newId = _repository.Insert(attribute);
        attribute.AttributeKey = newId;
        
        return attribute;
    }

    public IEnumerable<Entities.Attribute> GetAllAttributes() 
    {
        return _repository.GetAll();
    }

    public Entities.Attribute GetAttributeById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdateAttribute(int id, Entities.Attribute attribute) 
    {
        if (attribute == null)
            throw new ArgumentNullException(nameof(attribute));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(attribute.Name))
            throw new ArgumentException("El nombre del atributo no puede estar vacío.");

        attribute.AttributeKey = id; 
        
        return _repository.Update(attribute);
    }

    public bool DeleteAttribute(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}