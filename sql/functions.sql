
CREATE OR REPLACE FUNCTION create_profile_func(
    p_firstname VARCHAR,
    p_secondname VARCHAR,
    p_firstlastname VARCHAR,
    p_secondlastname VARCHAR,
    p_place_placekey INT,
    p_email VARCHAR,
    p_hashpassword VARCHAR,
    p_id INT
)
RETURNS INT AS $$
DECLARE
    new_profilekey INT;
BEGIN
    -- Se insertan los datos asignando el siguiente valor de la secuencia al profilekey
    INSERT INTO profile (
        profilekey,
        firstname,
        secondname,
        firstlastname,
        secondlastname,
        place_placekey,
        email,
        hashPassword,
        id
    )
    VALUES (
        nextval('sequenceProfile'), -- Llamamos a la secuencia para el autoincremental
        p_firstname,
        p_secondname,
        p_firstlastname,
        p_secondlastname,
        p_place_placekey,
        p_email,
        p_hashpassword,
        p_id
    )
    RETURNING profilekey INTO new_profilekey;

    -- Devolvemos la llave primaria generada
    RETURN new_profilekey;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION assign_role_func(
    p_profile_profilekey INT,
    p_role_rolekey INT
)
RETURNS VOID AS $$
BEGIN
    -- Insertamos en la tabla de histórico usando su respectiva secuencia
    INSERT INTO historicroles (
        historicroleskey,
        dateandhour,
        role_rolekey,
        profile_profilekey
    )
    VALUES (
        nextval('sequenceHistoricroles'), -- Secuencia para el autoincremental
        NOW(),                            -- Registramos el momento exacto
        p_role_rolekey,                   -- El rol a asignar
        p_profile_profilekey              -- El perfil asociado
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_role_func(
    p_name VARCHAR,
    p_description VARCHAR
)
RETURNS INT AS $$
DECLARE
    new_rolekey INT;
BEGIN
    -- Se insertan los datos asignando el siguiente valor de la secuencia al rolekey
    INSERT INTO role (
        rolekey,
        name,
        description
    )
    VALUES (
        nextval('sequenceRole'), -- Usamos la secuencia correspondiente al rol
        p_name,
        p_description
    )
    RETURNING rolekey INTO new_rolekey;

    -- Devolvemos la llave primaria generada
    RETURN new_rolekey;
END;
$$ LANGUAGE plpgsql;