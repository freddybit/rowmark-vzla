/* CREATE DE LAS TABLAS - FORÁNEAS COMO INTEGER */

CREATE TABLE Attribute (
    attributekey SERIAL NOT NULL UNIQUE,
    imgurl TEXT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT attribute_pkey PRIMARY KEY (attributekey)
);

CREATE TABLE Capability (
    capabilitykey SERIAL NOT NULL UNIQUE,
    imgurl TEXT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(600) NOT NULL,
    CONSTRAINT capability_pkey PRIMARY KEY (capabilitykey)
);

CREATE TABLE Color (
    colorkey SERIAL NOT NULL UNIQUE,
    hexadecimalcode VARCHAR(8) NOT NULL,
    hexadecimalCore VARCHAR(8) NOT NULL,
    name VARCHAR(150) NOT NULL,
    imgurl TEXT NOT NULL,
    imgalt VARCHAR(50) NOT NULL,
    CONSTRAINT color_pkey PRIMARY KEY (colorkey)
);

CREATE TABLE EngravingDepth (
    engravingdepthkey SERIAL NOT NULL UNIQUE,
    depth NUMERIC(10,3) NOT NULL,
    unitmedition VARCHAR(2) NOT NULL,
    CONSTRAINT engravingdepth_pkey PRIMARY KEY (engravingdepthkey)
);

CREATE TABLE Place (
    placekey SERIAL NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    typeplace VARCHAR(200) NOT NULL,
    place_placekey INTEGER,
    CONSTRAINT place_pkey PRIMARY KEY (placekey),
    CONSTRAINT place_place_fk FOREIGN KEY (place_placekey) REFERENCES place(placekey)
);

CREATE TABLE Finish (
    finishkey SERIAL NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT finish_pkey PRIMARY KEY (finishkey)
);

CREATE TABLE Profile (
    profilekey SERIAL NOT NULL UNIQUE,
    firstname VARCHAR(200) NOT NULL,
    secondname VARCHAR(200),
    firstlastname VARCHAR(200) NOT NULL,
    secondlastname VARCHAR(200),
    place_placekey INTEGER NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    hashPassword TEXT NOT NULL,
    id NUMERIC(1000,0) NOT NULL UNIQUE,
    CONSTRAINT profile_pkey PRIMARY KEY (profilekey),
    CONSTRAINT profile_place_fk FOREIGN KEY (place_placekey) REFERENCES place(placekey)
);

CREATE TABLE Material (
    materialkey SERIAL NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(600),
    imgUrl TEXT,
    CONSTRAINT material_pkey PRIMARY KEY (materialkey)
);

CREATE TABLE Product (
    productkey SERIAL NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    imgurl TEXT NOT NULL,
    imgalt VARCHAR(50) NOT NULL,
    videourl TEXT,
    CONSTRAINT product_pkey PRIMARY KEY (productkey)
);

CREATE TABLE ProductAttribute (
    attribute_attributekey INTEGER NOT NULL,
    product_productkey INTEGER NOT NULL,
    CONSTRAINT productattribute_pkey PRIMARY KEY (attribute_attributekey, product_productkey),
    CONSTRAINT productattribute_attribute_fk FOREIGN KEY (attribute_attributekey) REFERENCES attribute(attributekey) ON DELETE CASCADE,
    CONSTRAINT productattribute_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE
);

CREATE TABLE productauditlog (
    productauditlogkey SERIAL NOT NULL UNIQUE,
    dateaction TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    typeaction VARCHAR(100) NOT NULL,
    product_productkey INTEGER NOT NULL,
    profile_profilekey INTEGER NOT NULL,
    CONSTRAINT productauditlog_pkey PRIMARY KEY (product_productkey, profile_profilekey, productauditlogkey),
    CONSTRAINT productauditlog_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE,
    CONSTRAINT productauditlog_profile_fk FOREIGN KEY (profile_profilekey) REFERENCES profile(profilekey) ON DELETE CASCADE
);

CREATE TABLE ProductCapabilities (
    product_productkey INTEGER NOT NULL,
    capabilitie_capabilitiekey INTEGER NOT NULL,
    CONSTRAINT productcapabilities_pkey PRIMARY KEY (product_productkey, capabilitie_capabilitiekey),
    CONSTRAINT productcapabilities_capabilitie_fk FOREIGN KEY (capabilitie_capabilitiekey) REFERENCES capability(capabilitykey) ON DELETE CASCADE,
    CONSTRAINT productcapabilities_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE
);

CREATE TABLE ProductColor (
    color_colorkey INTEGER NOT NULL, -- FK a Color
    product_productkey INTEGER NOT NULL, -- FK a Product
    CONSTRAINT productcolor_pkey PRIMARY KEY (color_colorkey, product_productkey),
    CONSTRAINT productcolor_color_fk FOREIGN KEY (color_colorkey) REFERENCES color(colorkey) ON DELETE CASCADE,
    CONSTRAINT productcolor_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE
);

CREATE TABLE SheetSize (
    sheetsizekey SERIAL NOT NULL UNIQUE,
    length NUMERIC(1000,0) NOT NULL,
    width NUMERIC(1000,0) NOT NULL,
    height NUMERIC(1000,0) NOT NULL,
    unitmedition VARCHAR(2) NOT NULL,
    CONSTRAINT sheetsize_pkey PRIMARY KEY (sheetsizekey)
);

CREATE TABLE ProductDimension (
    productdimensionkey SERIAL NOT NULL UNIQUE,
    product_productkey INTEGER NOT NULL,
    productprice NUMERIC(1000,2) NOT NULL,
    engravingdepth_engravingdepthkey INTEGER NOT NULL,
    unitsavailables NUMERIC(1000,0) NOT NULL,
    sheetsize_sheetsizekey INTEGER NOT NULL,
    CONSTRAINT productdimension_pkey PRIMARY KEY (product_productkey, productdimensionkey),
    CONSTRAINT productdimension_engravingdepth_fk FOREIGN KEY (engravingdepth_engravingdepthkey) REFERENCES engravingdepth(engravingdepthkey) ON DELETE CASCADE,
    CONSTRAINT productdimension_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE,
    CONSTRAINT productdimension_sheetsize_fk FOREIGN KEY (sheetsize_sheetsizekey) REFERENCES sheetsize(sheetsizekey) ON DELETE CASCADE
);

CREATE TABLE ProductFinish (
    product_productkey INTEGER NOT NULL,
    finish_finishkey INTEGER NOT NULL,
    CONSTRAINT productfinish_pkey PRIMARY KEY (product_productkey, finish_finishkey),
    CONSTRAINT productfinish_finish_fk FOREIGN KEY (finish_finishkey) REFERENCES finish(finishkey) ON DELETE CASCADE,
    CONSTRAINT productfinish_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE
);

CREATE TABLE ProductMaterial (
    product_productkey INTEGER NOT NULL,
    material_materialkey INTEGER NOT NULL,
    CONSTRAINT productmaterial_pkey PRIMARY KEY (product_productkey, material_materialkey),
    CONSTRAINT productmaterial_material_fk FOREIGN KEY (material_materialkey) REFERENCES material(materialkey) ON DELETE CASCADE,
    CONSTRAINT productmaterial_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey) ON DELETE CASCADE
);