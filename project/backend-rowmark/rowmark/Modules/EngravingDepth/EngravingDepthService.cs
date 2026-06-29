using System;
using System.Collections.Generic;
using rowmark.models.entities;

namespace rowmark.Modules.EngravingDepth;

public class EngravingDepthService 
{
    private readonly EngravingDepthRepository _repository;

    public EngravingDepthService(EngravingDepthRepository repository) 
    {
        _repository = repository;
    }

    public Entities.EngravingDepth CreateEngravingDepth(Entities.EngravingDepth engravingDepth) 
    {
        if (engravingDepth == null)
            throw new ArgumentNullException(nameof(engravingDepth));
            
        if (string.IsNullOrWhiteSpace(engravingDepth.UnitMedition))
            throw new ArgumentException("La unidad de medida no puede estar vacía.");

        int newId = _repository.Insert(engravingDepth);
        engravingDepth.EngravingDepthKey = newId;
        
        return engravingDepth;
    }

    public IEnumerable<Entities.EngravingDepth> GetAllEngravingDepths() 
    {
        return _repository.GetAll();
    }

    public Entities.EngravingDepth GetEngravingDepthById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id)!;
    }

    public bool UpdateEngravingDepth(int id, Entities.EngravingDepth engravingDepth) 
    {
        if (engravingDepth == null)
            throw new ArgumentNullException(nameof(engravingDepth));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(engravingDepth.UnitMedition))
            throw new ArgumentException("La unidad de medida no puede estar vacía.");

        engravingDepth.EngravingDepthKey = id; 
        
        return _repository.Update(engravingDepth);
    }

    public bool DeleteEngravingDepth(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}