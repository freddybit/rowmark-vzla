
/* CREATE DE LAS SECUENCIAS */

CREATE SEQUENCE sequenceAttribute INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceCapability INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceColor INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceEngravingdepth INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceFinish INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceHistoricroles INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceMaterial INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequencePermission INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequencePhone INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequencePlace INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceProduct INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceProductauditlog INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceProductdimension INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceProfile INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceRole INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceSheetsize INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE sequenceUsage INCREMENT BY 1 START WITH 1;

/* CREATE DE LAS TABLAS */

CREATE TABLE Attribute (
  attributekey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  CONSTRAINT attribute_pkey PRIMARY KEY (attributekey)
);

CREATE TABLE Capability (
  capabilitykey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  CONSTRAINT capability_pkey PRIMARY KEY (capabilitykey)
);

CREATE TABLE Color (
  colorkey NUMERIC(1000,0) NOT NULL UNIQUE,
  hexadecimalcode VARCHAR(8) NOT NULL,
  name VARCHAR(150) NOT NULL,
  imgurl TEXT NOT NULL,
  imgalt VARCHAR(50) NOT NULL,
  CONSTRAINT color_pkey PRIMARY KEY (colorkey)
);

CREATE TABLE EngravingDepth (
  engravingdepthkey NUMERIC(1000,0) NOT NULL UNIQUE,
  depth NUMERIC(1000,0) NOT NULL,
  unitmedition NUMERIC(1000,0) NOT NULL,
  CONSTRAINT engravingdepth_pkey PRIMARY KEY (engravingdepthkey)
);

CREATE TABLE Place (
  placekey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  typeplace VARCHAR(200) NOT NULL,
  place_placekey NUMERIC(1000,0),
  CONSTRAINT place_pkey PRIMARY KEY (placekey),
  CONSTRAINT place_place_fk FOREIGN KEY (place_placekey) REFERENCES place(placekey)
);

CREATE TABLE Finish (
  finishkey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  CONSTRAINT finish_pkey PRIMARY KEY (finishkey)
);

CREATE TABLE Permission (
  permissionkey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  CONSTRAINT permission_pkey PRIMARY KEY (permissionkey)
);

CREATE TABLE Role (
  rolekey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(200) NOT NULL,
  CONSTRAINT role_pkey PRIMARY KEY (rolekey)
);

CREATE TABLE Profile (
  profilekey NUMERIC(1000,0) NOT NULL UNIQUE,
  firstname VARCHAR(200) NOT NULL,
  secondname VARCHAR(200) NOT NULL,
  firstlastname VARCHAR(200) NOT NULL,
  secondlastname VARCHAR(200) NOT NULL,
  place_placekey NUMERIC(1000,0) NOT NULL,
  email VARCHAR(200) NOT NULL,
  hashPassword VARCHAR(200) NOT NULL,
  id NUMERIC(1000,0) NOT NULL UNIQUE,
  CONSTRAINT profile_pkey PRIMARY KEY (profilekey),
  CONSTRAINT profile_place_fk FOREIGN KEY (place_placekey) REFERENCES place(placekey)
);

CREATE TABLE HistoricRolePermissions (
  role_rolekey NUMERIC(1000,0) NOT NULL UNIQUE,
  permission_permissionkey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT historicrolepermissions_pkey PRIMARY KEY (role_rolekey, permission_permissionkey),
  CONSTRAINT historicrolepermissions_permission_fk FOREIGN KEY (permission_permissionkey) REFERENCES permission(permissionkey),
  CONSTRAINT historicrolepermissions_role_fk FOREIGN KEY (role_rolekey) REFERENCES role(rolekey)
);

CREATE TABLE HistoricRoles (
  historicroleskey NUMERIC(1000,0) NOT NULL UNIQUE,
  dateandhour TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  role_rolekey NUMERIC(1000,0) NOT NULL,
  profile_profilekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT historicroles_pkey PRIMARY KEY (role_rolekey, profile_profilekey, historicroleskey),
  CONSTRAINT historicroles_profile_fk FOREIGN KEY (profile_profilekey) REFERENCES profile(profilekey),
  CONSTRAINT historicroles_role_fk FOREIGN KEY (role_rolekey) REFERENCES role(rolekey)
);
CREATE TABLE Material (
  materialkey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  CONSTRAINT material_pkey PRIMARY KEY (materialkey)
);

CREATE TABLE Phone (
  phonekey NUMERIC(1000,0) NOT NULL UNIQUE,
  areacode NUMERIC(1000,0) NOT NULL,
  operatorcode NUMERIC(1000,0) NOT NULL,
  numberassigned NUMERIC(1000,0) NOT NULL,
  profile_profilekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT phone_pkey PRIMARY KEY (phonekey),
  CONSTRAINT phone_profile_fk FOREIGN KEY (profile_profilekey) REFERENCES profile(profilekey)
);

CREATE TABLE Product (
  productkey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  imgurl TEXT NOT NULL,
  imgalt VARCHAR(50) NOT NULL,
  CONSTRAINT product_pkey PRIMARY KEY (productkey)
);

CREATE TABLE ProductAttribute (
  attribute_attributekey NUMERIC(1000,0) NOT NULL UNIQUE,
  product_productkey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productattribute_pkey PRIMARY KEY (attribute_attributekey, product_productkey),
  CONSTRAINT productattribute_attribute_fk FOREIGN KEY (attribute_attributekey) REFERENCES public.attribute(attributekey),
  CONSTRAINT productattribute_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE productauditlog (
  productauditlogkey NUMERIC(1000,0) NOT NULL UNIQUE,
  dateaction TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  typeaction VARCHAR(100) NOT NULL,
  product_productkey NUMERIC(1000,0) NOT NULL,
  profile_profilekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productauditlog_pkey PRIMARY KEY (product_productkey, profile_profilekey, productauditlogkey),
  CONSTRAINT productauditlog_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
  CONSTRAINT productauditlog_profile_fk FOREIGN KEY (profile_profilekey) REFERENCES profile(profilekey)
);

CREATE TABLE ProductCapabilities (
  product_productkey NUMERIC(1000,0) NOT NULL UNIQUE,
  capabilitie_capabilitiekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productcapabilities_pkey PRIMARY KEY (product_productkey, capabilitie_capabilitiekey),
  CONSTRAINT productcapabilities_capabilitie_fk FOREIGN KEY (capabilitie_capabilitiekey) REFERENCES public.capability(capabilitykey),
  CONSTRAINT productcapabilities_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductColor (
  color_colorkey NUMERIC(1000,0) NOT NULL UNIQUE,
  product_productkey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productcolor_pkey PRIMARY KEY (color_colorkey, product_productkey),
  CONSTRAINT productcolor_color_fk FOREIGN KEY (color_colorkey) REFERENCES public.color(colorkey),
  CONSTRAINT productcolor_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE SheetSize (
  sheetsizekey NUMERIC(1000,0) NOT NULL UNIQUE,
  length NUMERIC(1000,0) NOT NULL,
  width NUMERIC(1000,0) NOT NULL,
  height NUMERIC(1000,0) NOT NULL,
  unitmedition NUMERIC(1000,0) NOT NULL,
  CONSTRAINT sheetsize_pkey PRIMARY KEY (sheetsizekey)
);

CREATE TABLE usage (
  usagekey NUMERIC(1000,0) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  CONSTRAINT usage_pkey PRIMARY KEY (usagekey)
);

CREATE TABLE ProductDimension (
  productdimensionkey NUMERIC(1000,0) NOT NULL UNIQUE,
  product_productkey NUMERIC(1000,0) NOT NULL,
  productprice NUMERIC(1000,2) NOT NULL,
  engravingdepth_engravingdepthkey NUMERIC(1000,0) NOT NULL,
  unitsavailables NUMERIC(1000,0) NOT NULL,
  sheetsize_sheetsizekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productdimension_pkey PRIMARY KEY (product_productkey, productdimensionkey),
  CONSTRAINT productdimension_engravingdepth_fk FOREIGN KEY (engravingdepth_engravingdepthkey) REFERENCES public.engravingdepth(engravingdepthkey),
  CONSTRAINT productdimension_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
  CONSTRAINT productdimension_sheetsize_fk FOREIGN KEY (sheetsize_sheetsizekey) REFERENCES sheetsize(sheetsizekey)
);

CREATE TABLE ProductFinish (
  product_productkey NUMERIC(1000,0) NOT NULL UNIQUE,
  finish_finishkey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productfinish_pkey PRIMARY KEY (product_productkey, finish_finishkey),
  CONSTRAINT productfinish_finish_fk FOREIGN KEY (finish_finishkey) REFERENCES finish(finishkey),
  CONSTRAINT productfinish_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductMaterial (
  product_productkey NUMERIC(1000,0) NOT NULL UNIQUE,
  material_materialkey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productmaterial_pkey PRIMARY KEY (product_productkey, material_materialkey),
  CONSTRAINT productmaterial_material_fk FOREIGN KEY (material_materialkey) REFERENCES material(materialkey),
  CONSTRAINT productmaterial_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductUsage (
  product_productkey NUMERIC(1000,0) NOT NULL UNIQUE,
  usage_usagekey NUMERIC(1000,0) NOT NULL,
  CONSTRAINT productusage_pkey PRIMARY KEY (product_productkey, usage_usagekey),
  CONSTRAINT productusage_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
  CONSTRAINT productusage_usage_fk FOREIGN KEY (usage_usagekey) REFERENCES usage(usagekey)
);