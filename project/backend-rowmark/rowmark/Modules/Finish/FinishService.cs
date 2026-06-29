using System;
using System.Collections.Generic;
using rowmark.Modules.Finish.Entities;

namespace rowmark.Modules.Finish;

public class FinishService 
{
    private readonly FinishRepository _repository;

    public FinishService(FinishRepository repository) 
    {
        _repository = repository;
    }

    public Entities.Finish CreateFinish(Entities.Finish finish) 
    {
        if (finish == null)
            throw new ArgumentNullException(nameof(finish));
            
        if (string.IsNullOrWhiteSpace(finish.Name))
            throw new ArgumentException("El nombre del acabado no puede estar vacío.");

        int newId = _repository.Insert(finish);
        finish.FinishKey = newId;
        
        return finish;
    }

    public IEnumerable<Entities.Finish> GetAllFinishes() 
    {
        return _repository.GetAll();
    }

    public Entities.Finish GetFinishById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdateFinish(int id, Entities.Finish finish) 
    {
        if (finish == null)
            throw new ArgumentNullException(nameof(finish));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(finish.Name))
            throw new ArgumentException("El nombre del acabado no puede estar vacío.");

        finish.FinishKey = id; 
        
        return _repository.Update(finish);
    }

    public bool DeleteFinish(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}