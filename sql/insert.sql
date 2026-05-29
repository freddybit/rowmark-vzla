
/* PERMISOS */
INSERT INTO permission VALUES (nextval('sequencepermission'), 'crear producto');
INSERT INTO permission VALUES (nextval('sequencepermission'), 'editar producto');
INSERT INTO permission VALUES (nextval('sequencepermission'), 'eliminar producto');

/* ROLES */
INSERT INTO role VALUES (nextval('sequencerole'), 'Administrador', '');

INSERT INTO place (placekey, name, typeplace)
VALUES (1, 'Caracas', 'Ciudad');

SELECT * FROM place;