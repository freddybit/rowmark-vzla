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
    depth NUMERIC(1000,0) NOT NULL,
    unitmedition NUMERIC(1000,0) NOT NULL,
    CONSTRAINT engravingdepth_pkey PRIMARY KEY (engravingdepthkey)
);

CREATE TABLE Place (
    placekey SERIAL NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    typeplace VARCHAR(200) NOT NULL,
    place_placekey INTEGER, -- FK a Place (Permite NULL)
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
    secondname VARCHAR(200) NOT NULL,
    firstlastname VARCHAR(200) NOT NULL,
    secondlastname VARCHAR(200) NOT NULL,
    place_placekey INTEGER NOT NULL, -- FK a Place
    email VARCHAR(200) NOT NULL,
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
    CONSTRAINT product_pkey PRIMARY KEY (productkey)
);

CREATE TABLE ProductAttribute (
    attribute_attributekey INTEGER NOT NULL, -- FK a Attribute
    product_productkey INTEGER NOT NULL, -- FK a Product
    CONSTRAINT productattribute_pkey PRIMARY KEY (attribute_attributekey, product_productkey),
    CONSTRAINT productattribute_attribute_fk FOREIGN KEY (attribute_attributekey) REFERENCES public.attribute(attributekey),
    CONSTRAINT productattribute_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE productauditlog (
    productauditlogkey SERIAL NOT NULL UNIQUE,
    dateaction TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    typeaction VARCHAR(100) NOT NULL,
    product_productkey INTEGER NOT NULL, -- FK a Product
    profile_profilekey INTEGER NOT NULL, -- FK a Profile
    CONSTRAINT productauditlog_pkey PRIMARY KEY (product_productkey, profile_profilekey, productauditlogkey),
    CONSTRAINT productauditlog_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
    CONSTRAINT productauditlog_profile_fk FOREIGN KEY (profile_profilekey) REFERENCES profile(profilekey)
);

CREATE TABLE ProductCapabilities (
    product_productkey INTEGER NOT NULL, -- FK a Product
    capabilitie_capabilitiekey INTEGER NOT NULL, -- FK a Capability
    CONSTRAINT productcapabilities_pkey PRIMARY KEY (product_productkey, capabilitie_capabilitiekey),
    CONSTRAINT productcapabilities_capabilitie_fk FOREIGN KEY (capabilitie_capabilitiekey) REFERENCES public.capability(capabilitykey),
    CONSTRAINT productcapabilities_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductColor (
    color_colorkey INTEGER NOT NULL, -- FK a Color
    product_productkey INTEGER NOT NULL, -- FK a Product
    CONSTRAINT productcolor_pkey PRIMARY KEY (color_colorkey, product_productkey),
    CONSTRAINT productcolor_color_fk FOREIGN KEY (color_colorkey) REFERENCES public.color(colorkey),
    CONSTRAINT productcolor_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE SheetSize (
    sheetsizekey SERIAL NOT NULL UNIQUE,
    length NUMERIC(1000,0) NOT NULL,
    width NUMERIC(1000,0) NOT NULL,
    height NUMERIC(1000,0) NOT NULL,
    unitmedition NUMERIC(1000,0) NOT NULL,
    CONSTRAINT sheetsize_pkey PRIMARY KEY (sheetsizekey)
);

CREATE TABLE usage (
    usagekey SERIAL NOT NULL UNIQUE,
    imgurl TEXT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    CONSTRAINT usage_pkey PRIMARY KEY (usagekey)
);

CREATE TABLE ProductDimension (
    productdimensionkey SERIAL NOT NULL UNIQUE,
    product_productkey INTEGER NOT NULL, -- FK a Product
    productprice NUMERIC(1000,2) NOT NULL,
    engravingdepth_engravingdepthkey INTEGER NOT NULL, -- FK a EngravingDepth
    unitsavailables NUMERIC(1000,0) NOT NULL,
    sheetsize_sheetsizekey INTEGER NOT NULL, -- FK a SheetSize
    CONSTRAINT productdimension_pkey PRIMARY KEY (product_productkey, productdimensionkey),
    CONSTRAINT productdimension_engravingdepth_fk FOREIGN KEY (engravingdepth_engravingdepthkey) REFERENCES public.engravingdepth(engravingdepthkey),
    CONSTRAINT productdimension_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
    CONSTRAINT productdimension_sheetsize_fk FOREIGN KEY (sheetsize_sheetsizekey) REFERENCES sheetsize(sheetsizekey)
);

CREATE TABLE ProductFinish (
    product_productkey INTEGER NOT NULL, -- FK a Product
    finish_finishkey INTEGER NOT NULL, -- FK a Finish
    CONSTRAINT productfinish_pkey PRIMARY KEY (product_productkey, finish_finishkey),
    CONSTRAINT productfinish_finish_fk FOREIGN KEY (finish_finishkey) REFERENCES finish(finishkey),
    CONSTRAINT productfinish_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductMaterial (
    product_productkey INTEGER NOT NULL, -- FK a Product
    material_materialkey INTEGER NOT NULL, -- FK a Material
    CONSTRAINT productmaterial_pkey PRIMARY KEY (product_productkey, material_materialkey),
    CONSTRAINT productmaterial_material_fk FOREIGN KEY (material_materialkey) REFERENCES material(materialkey),
    CONSTRAINT productmaterial_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey)
);

CREATE TABLE ProductUsage (
    product_productkey INTEGER NOT NULL, -- FK a Product
    usage_usagekey INTEGER NOT NULL, -- FK a Usage
    CONSTRAINT productusage_pkey PRIMARY KEY (product_productkey, usage_usagekey),
    CONSTRAINT productusage_product_fk FOREIGN KEY (product_productkey) REFERENCES product(productkey),
    CONSTRAINT productusage_usage_fk FOREIGN KEY (usage_usagekey) REFERENCES usage(usagekey)
);