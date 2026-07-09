using System;
using System.Collections.Generic;
using rowmark.Modules.SheetSize.Entities;

namespace rowmark.Modules.SheetSize;

public class SheetSizeService 
{
    private readonly SheetSizeRepository _repository;

    public SheetSizeService(SheetSizeRepository repository) 
    {
        _repository = repository;
    }

    public Entities.SheetSize CreateSheetSize(Entities.SheetSize sheetSize) 
    {
        if (sheetSize == null)
            throw new ArgumentNullException(nameof(sheetSize));
            
        if (string.IsNullOrWhiteSpace(sheetSize.unitMedition))
            throw new ArgumentException("La unidad de medida no puede estar vacía.");

        int newId = _repository.Insert(sheetSize);
        sheetSize.SheetSizeKey = newId;
        
        return sheetSize;
    }

    public IEnumerable<Entities.SheetSize> GetAllSheetSizes() 
    {
        return _repository.GetAll();
    }

    public Entities.SheetSize GetSheetSizeById(int id) 
    {
        if (id <= 0)
            throw new ArgumentException("ID inválido.");

        return _repository.GetById(id);
    }

    public bool UpdateSheetSize(int id, Entities.SheetSize sheetSize) 
    {
        if (sheetSize == null)
            throw new ArgumentNullException(nameof(sheetSize));

        if (id <= 0)
            throw new ArgumentException("ID inválido.");
            
        if (string.IsNullOrWhiteSpace(sheetSize.unitMedition))
            throw new ArgumentException("La unidad de medida no puede estar vacía.");

        sheetSize.SheetSizeKey = id; 
        
        return _repository.Update(sheetSize);
    }

    public bool DeleteSheetSize(int id) 
    {
        if (id <= 0) 
            throw new ArgumentException("ID inválido.");
        
        return _repository.Delete(id);
    }
}