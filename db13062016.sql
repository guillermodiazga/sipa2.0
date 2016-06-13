
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 14-06-2016 a las 00:37:12
-- Versión del servidor: 10.0.23-MariaDB
-- Versión de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `u321971772_sipa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE IF NOT EXISTS `alimento` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `idtalimento` varchar(2) NOT NULL,
  `valor` double NOT NULL,
  `iva` varchar(2) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- Volcado de datos para la tabla `alimento`
--

INSERT INTO `alimento` (`id`, `nombre`, `descripcion`, `idtalimento`, `valor`, `iva`, `bitactivo`) VALUES
(1, 'Menú 1 - Sopa de  Frijoles', 'Frijoles: 1 porción x 300grsr; Arroz blanco : 1 porción x 110 gr en cocido; Chicharrón carnudo y pulpo: 1 porción x 100 grs en cocido; Huevo cocido o frito: 1 unid tipo A; Patacón: 1 unid x 60 gr; Arepa redonda: 1 unid x 40 gr; Ensalada a base de:  (repollo, zanahoria, tomate y pepino, cilantro) 100 grs. Postre: bocadillo 1 porción x 30 gr; Jugo de fruta en empaque individual tetrapack, ó en botella por 250ml. Todos los gramajes son en cocido.', '1', 7783, '16', 1),
(2, 'Menú 2- Carne de cerdo o res a la plancha y Sopa d', 'Carne de cerdo (pierna o solomo ) o res (punta de anca) 1 porción por 140 grs. Sopa de tortilla o guineo : 1 porción x 250 gr. Arroz: 1 porción x 110 gr en cocido; croquetas de yuca: 1 porción x 80 gr. Ensalda a base de: legumbres: zanahoria, habichuela, suquini ,repollo. 1 porción x 100 gr. Postre: panelita copelia. Jugo de fruta en empaque individual tetrapack, ó en botella por 250ml. Todos los gramajes son en cocido.', '1', 7891, '16', 1),
(3, 'Menú 3- Posta sudada con sopa de verduras.', 'Posta Sudada, 140 grs. Sopa de verduras 1 porción x 250 grs. Arroz blanco, porción x 110 gr en cocido, Acompañante papa chip o tajada de maduro 80gr; Ensalada a base de: (remolacha,zanahoria, repollo y cilantro). 1 porción x 100gr; Arepa redonda 1 unid x 40 gr. Postre: paqueta de galletas waffer. 1 porción x 30 gr; Jugo de fruta en empaque individual tetrapack o gaseosa. de 250 ml. Todos los gramajes son en cocido.', '1', 7881, '16', 1),
(4, 'Menú 4 - Carne de res en salsa de champiñones', 'Carne, Muchacho en salsa de champiñones: 1 porción x 140 gr en cocido, Puré al gratín: 1 porción x 90 grs; Arroz con verduras: 1 porción x 110 gr; Ensaldaa base de legumbres:Lechuga, zanahoria, pepino, cilantro. Pan tipo buffet: 1 und x 30gr. Postre: 1 porción x 40 gr (mousse de limón o mora); Jugo de fruta en empaque individual tetrapack o gaseosa por 250 ml. todos los gramajes son en cocido.', '1', 9712, '16', 1),
(5, 'Menú 5- Fiambre en hoja de biao', 'Porción de migo de papa y arroz, x 300 gr; Chicharrón carnudo, porción x 100 gr; Carne molida 100 grs, chorizo, 1 unidad, Huevo cocido o frito, 1 unidad. Patacón o tajada de maduro, 1 unid x 60 gr Arepa redonda: 1 unid x 25 gr. Jugo de fruta en empaque individual, o gaseosa 250ml. Todos los gramajes son en cocido.', '1', 8570, '16', 1),
(6, 'Menú- 6 Sopa de Mondongo', 'Sopa de Mondongo : 1 porción x 300 grs (papa, mondongo, tripa decayo, carne decerdo, yuca, arveja, zanahoria) ; Arroz porción x 110 grs con 1/2 aguacate mediano 80 grs , banano 50 grs, arepa redonda 1 unIdad 40 grms. Postre: Platano maduro cocinado en almibar 40 grs . Jugo de fruta en empaque individual tetrapack, ó en botella por 250ml.', '1', 8811, '16', 1),
(7, 'Menu- 7 Pollo a la broster sopa de patacon.', 'Pollo a la broster 140 grs. pechuga. (sopa de patocón 250 grs. Arroz con verduras: 1 porción x 110. Croqueta de yuca 80 grs Ensalada fria. (papa,huevo, salchicaha y zanahoria cilatro con mayonesa). postre. Flan de leche 4o grs. Jugo de fruta en empaque individual tetrapack, ó en botella por 250ml. Todos los gramajes son en cocido.', '1', 8423, '16', 1),
(8, 'Menú 8 Róbalo Apanado', 'Róbalo apanado 100 grs. crema de zanahoria o tortilla, 250 grs , arroz blanco 110 grs, papas a la francesa 80 grs. Ensalada de de remolacha, zanahoria, lechuga y cilantro 100 grs . Arepa o pan, postre: breva con arequipe. 40 grs. Jugo de fruta en empaque individual tetrapack, ó en botella por 250 ml Todos los gramajes son en cocido.', '1', 8259, '16', 1),
(9, 'Menú 9 1/4 de pollo asado', '1/4 de pollo asado, (muslo y contramuslo), 2 papas cocinadas cada una de 40 grs aprox , 2 arepas fritas,porción 25 grams, ensalada a base de : repollo,zanahoria y piña. porción por 100 grs. jugo en botella o caja tetrapak 250ml.', '1', 7670, '16', 1),
(10, 'Almojábana y fruta', 'Almojabana de 80 gramos. unidades: 1 y porción de fruta de 100 grs 1 unidad .( puede ser: paya, piña o pera) .compañado de una de las siguientes bebidas: Jugo, malta, gaseosa en botella de 250ml o caja tetra pack, de 250ml. Café con leche, chocolate o chocolate en leche, cantidad: 12 onzas. Para s servir en sitio.', '2', 2449, '16', 1),
(11, 'Empanada típica y fruta', 'Empanadas típicas antioqueñas de 50 gr (2 unidades) y 1 porción de fruta de 100 grs.( puede ser: paya, piña o pera) con en ncurtido o salsa: Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2507, '16', 1),
(12, 'Arepa de chocolo', 'Arepa de Chocolo 150 gramos. Con mantequilla, quesito o cuajada 60 grs. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2352, '16', 1),
(13, 'Buñuelo y fruta', 'Buñuelos 1 unidades de 80 grs. y 1 porción de fruta de 100 grs.( puede ser: paya, piña o pera). Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para servir en sitio.', '2', 2294, '16', 1),
(14, 'Palito de queso con centro de guayaba hojaldrado', 'Palito de queso en hojaldre con centro de guayaba 120grs. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 1877, '16', 1),
(15, 'Palito con queso y Mozarela', 'Palito con queso y mozaralla, acompañado con con salsa de frutas.120 gr: Sobrecito de salsa de futas de 8 grs. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2143, '16', 1),
(16, 'Croissant de jamón y queso ', 'Croissant de Jamón y Queso 120 grs. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 1868, '16', 1),
(17, 'Croissant con pollo y champiñones', 'Croissant con pollo y champiñones (120 gramos). Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2315, '16', 1),
(18, 'Empanada argentina .', 'Empanada Argentina 130 gramos. Relleno: carne, maíz con salsa bechamel, pollo, jamón y queso, espinaca, etc. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con leche, chocolate o chocolate en leche, 12 onzas para servir en sitio.', '2', 2699, '16', 1),
(19, 'Empanada hojaldra de pollo con legumbres y verdura', 'Empanada hojaldrada de 130 gr.R relleno (equivale a 90 gms de los 130 gms totales) de pollo y verduras, aderezado con salsa. Acompañado de Jugo, malta o gaseosa en botella de 250mlml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2282, '16', 1),
(20, 'Panzerotti de jamón y queso.', 'Panzerottis (100 gramos): Jamón y queso Acompañado de Jugo, malta o gaseosa en botella bolsa o caja tetra pack, de 250ml. Café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 1758, '16', 1),
(21, 'Panzerottis Hawaiano.', 'Panzerottis (100 gramos): Hawaiano: Acompañado de de Jugo, malta o gaseosa en botella de 250ml. caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para servir en sitio.', '2', 2017, '16', 1),
(22, 'Pastel hojaldrado de carne de res con verduras', 'Pastel hojaldrado de carne con verduras en masa hojaldrada: 1 und x 130 gr, con salsa showy de 10 gr. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 2260, '16', 1),
(23, 'Pastel de pollo o de carne en masa frito', 'Pastel de pollo o carne en masa frito: 1 und x 100 gr, encurtido o salsa de tomate : Acompañado de de Jugo, malta o gaseosa en botella de 250ml o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche,12 onzas para s servir en sitio', '2', 2056, '16', 1),
(24, 'Tortillas de pan Árabe', 'Tortillas de pan árabe, rellenas en su interior con jamón 44 gr, queso 60 gr, pasta mizo 60 gr, verduras 80 gr, aderezadas con salsa alioli 20 grs. Acompañado de de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para servir en sitio', '2', 3722, '16', 1),
(25, 'Hamburguesa con carne de res', 'Hamburguesa con carne de res, queso mozarela, (100 gramos carne cocida) Aros de cebolla, lechuga, tomate, perejil y salsas Acompañado de gaseosa en botella de 250ml o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio', '2', 3387, '16', 1),
(26, 'Sánduche especial pan Alemán', 'Sánduche especial de pan alemán, con doble porción de jamón (44 gr), doble porción de queso (60 gr), vegetales frescos 80 gr (tomate, aros de cebolla, lechuga rizada), pasta jamonada 40 gr, aderezados con salsa de ciruelas 16grs u otra a elcción 20 gr: Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 3693, '16', 1),
(27, 'Sánduche vegetal con pan integral', 'Sánduche vegetal con pan integral: 3 rebanas pan molde integral , 1 rebanada grande de tomate , 2 rodajs de huevo cocido duro, 2 lonjas de jamon cocido maizitos, lechuga bien picada , atún, 1 lonja de queso 300 grs, . Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 3772, '16', 1),
(28, 'Sanduche pan Danés', 'Sanduche Conformado por Pan Danés : 1 und x 160 gr, Jamón de primera calidad: tajadas de 44 gr, Queso mozarella de primera calidad: 2 tajada x 30 gr c/u, Sobre salsa rosada: 10 gr, verduras (tomate, cebolla, lechuga crespa 80 gr Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250cc, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 3380, '16', 1),
(29, 'Sanduche gratinado', 'Sánduche gratinado en pan hojaldrado gurmet (200 gramos): Jamón,queso,Pollo, bañado en salsa bechamel y gratinado salsa marfil. Acompañado de Jugo, malta o gaseosa en botella de 250ml o caja tetra pack,o bolsa pequeña de 250cc, ó café con leche, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 4580, '16', 1),
(30, 'Pinchos de pollo apanado (Especial)', 'Pinchos de pollo apanado (2 unidades) 120 gr, papas a la francesa 50 gr, sala de tomate o de frutas en bolsa de 8 grs, arepa : Acompañado de de Jugo, malta o gaseosa en botella de 250ml o caja tetra pack,o bolsa pequeña de 250ml, ó café con lecha, chocolate o chocolate en leche, 12 onzas para servir en sitio.', '2', 3833, '16', 1),
(31, 'Desayuno Ejecutivo # 1 CREPS DE POLLO', 'Creps de pollo con champiñones-220-grms, pan 25 grms, porción de futas 200 grms. ugo natural: Naranja, Piña o Papaya (9 onzas) Café en leche o chocolate en leche (8 onzas) Ensalada tropical ( 70 gramos): Lechuga, papaya, melón. (30 gramos): Pan de la casa, croissant,o francés o , pan integral. Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250cc, ó café con lecha, chocolate o chocolate en leche, 12 onzas para s servir en sitio.', '2', 4925, '16', 1),
(32, 'Brownie', 'Brownie relleno de arequipe, o chocolate, 100grs: Acompañado de de Jugo, o gaseosa en botella, caja tetra pack,o de 250mlml, ó Bolsa de leche o yogur de 200cc.', '2', 2288, '16', 1),
(33, 'Pastel de arequipe en hojaldre', 'Pastel de arequipe en hojaldre: 1 und x 120 gr Acompañado de Jugo, malta o gaseosa en botella de 250ml,o caja tetra pack,o bolsa pequeña de 250cc, Bolsa de leche yogur de 200cc.', '2', 1925, '16', 1),
(34, 'Pastel de guayaba y queso en hojaldre', 'Pastel de guayaba y queso en hojaldre: 1 und x 120 gr .Acompañado de Jugo, malta o gaseosa en botella de 300ml,o caja tetra pack,o bolsa pequeña de 250ml, Bolsa de leche yogur de 200ml.', '2', 1981, '16', 1),
(35, 'Pastel hawaiano en hojaldre', 'Pastel Hawayano: 1 und x 120 gr. Acompañado de Jugo, malta o gaseosa en botella de 300ml,o caja tetra pack,o bolsa pequeña de 250cc, Bolsa de leche yogur de 200cc. y Jugo caja tetra pack o doy - pack,, malta o gaseosa, cantidad: 1 und x 250ml', '2', 2116, '16', 1),
(36, 'Porción de torta', 'Porción de torta 100 gr (naranja, brevas, zanahoria, u otros sabores, Acompañado de Jugo, malta o gaseosa en botella de 300ml,o caja tetra pack,o bolsa pequeña de 250cc, Bolsa de leche yogur de 200cc.', '2', 1915, '16', 1),
(37, 'Arroz con leche', 'Arroz con leche 200 grs. Con pasas, canela, coco, leche, una rebana de queso de 60 grs. En empaque desechable con tapita y cuchara.', '2', 2088, '16', 1),
(38, 'Quibees de res en salsa picante o al gusto', 'Quibees de res en salsa picante o al gusto 25 grs (Pasabocas). Servido en sitio.', '2', 1351, '16', 1),
(39, 'Croquetas de pollo', 'Crquetas de pollo. 30 grs cada una', '2', 1157, '16', 1),
(40, 'Deditos de róbalo gratinados', 'Pasabocas- Deditos de róbalo gratinados 25 gms. acompañados con salsa, miel y/o mostaza. Servidos en sitio.', '2', 1370, '16', 1),
(41, 'Salpicón 12 onzas', 'Salpicón 12 onzas, con helado dos bolas de 30 gr c/u, crema chantilly 30 gr, barquillo y galleta', '2', 2430, '16', 1),
(42, 'Ensalada de frutas', 'Frutas 300 grs: Ffresas, kiwi, papaya, piña, uvas, papaya, melon, mango, . En empaque plástico transparentecon tapa cuhara y tenedor plástico y una bolsa de yogur de 200cc (separada).', '2', 3758, '16', 1),
(43, 'Vaso de fruta', 'Vaso de fruta por 300 grm de uva chilena, trozos de mango maduro o  de papaya. En  vaso plástico transparente con tapa y tenedor.', '2', 2939, '16', 1),
(44, 'Cereal con yogurt o/ kumis', 'Cereal con yogurt o Kumis : 40 gramos. Kumis o yogurt Individual bolsa de 200cc, cereal para mezclar 30 grs: 1 vaso 200cc CEREAL: 30 gramos. Fruta entera: manzana roja, o pera, 150 gramos.', '2', 3336, '16', 1),
(45, 'Gaseosa de 600ml', 'Gaseosa de una marca reconocida , Diferentes sabores de 600ml', '2', 1290, '16', 1),
(46, 'Refrigerio navideño', 'Refrigerio navideño: Natilla de 100 gr, 2 buñuelos de 40 gr c/u, hojuela de 40 gr, jugo caja tetra pack o doy - pack, o gaseosa, cantidad: 1 und x 250ml. En su empaque navideño.', '2', 2480, '16', 1),
(47, 'Refrigerio navideño especial', 'Refrigerio navideño especial: Natilla de 80 gr, Manjar blanco de 8 gr, buñuelo de 30 gr, hojuela de 20 gr, brownie de 20 gr, 3 galletas navideñas cada una de 20 grs, Jugo caja tetra pack o doy - pack, malta o gaseosa, cantidad: 1 und x 250ml. Presentado en empaque navideño propidado para la ocasión.', '2', 2985, '16', 1),
(48, 'Vaso de agua', 'Vaso de agua 250 cc. Marca reconocida.', '3', 778, '0', 1),
(49, 'Bolsa de agua', 'Bolsa de agua de 250cc . Marca reconocida y confiable del mercado.', '3', 438, '0', 1),
(50, 'Botella de agua', 'Botella de agua 350 ml. Marca reconocida.', '3', 1206, '0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE IF NOT EXISTS `estados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(30) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `estado`, `bitactivo`) VALUES
(1, 'Anulado', 1),
(2, 'Pendiente', 1),
(3, 'Aprobado', 1),
(4, 'Rechazado', 1),
(5, 'Pagado', 0),
(6, 'Para Despacho', 1),
(7, 'Rechazado Proveedor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historico_estados_ped`
--

CREATE TABLE IF NOT EXISTS `historico_estados_ped` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `pedido` int(10) NOT NULL,
  `newestado` int(11) NOT NULL,
  `iduser` int(10) NOT NULL,
  `comentario` varchar(250) NOT NULL,
  `log` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=79 ;

--
-- Volcado de datos para la tabla `historico_estados_ped`
--

INSERT INTO `historico_estados_ped` (`id`, `pedido`, `newestado`, `iduser`, `comentario`, `log`) VALUES
(1, 1, 2, 0, 'Creado', '03/06/2016 - 13:47 user: 71800210'),
(2, 2, 2, 0, 'Creado', '03/06/2016 - 16:59 user: 73104042'),
(3, 3, 2, 0, 'Creado', '03/06/2016 - 17:02 user: 73104042'),
(4, 1, 3, 0, '', '03/06/2016 - 18:50 user: 21486033'),
(5, 2, 3, 0, '', '03/06/2016 - 18:50 user: 21486033'),
(6, 3, 3, 0, '', '03/06/2016 - 18:50 user: 21486033'),
(7, 1, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 15:00 user: 43167810'),
(8, 2, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 15:00 user: 43167810'),
(9, 3, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 15:00 user: 43167810'),
(10, 4, 2, 0, 'Creado', '03/06/2016 - 20:28 user: 43263603'),
(11, 5, 2, 0, 'Creado', '03/06/2016 - 20:30 user: 43263603'),
(12, 6, 2, 0, 'Creado', '03/06/2016 - 20:30 user: 43263603'),
(13, 7, 2, 0, 'Creado', '03/06/2016 - 20:35 user: 43263603'),
(14, 8, 2, 0, 'Creado', '03/06/2016 - 20:38 user: 43263603'),
(15, 4, 3, 0, '', '03/06/2016 - 20:52 user: 21486033'),
(16, 6, 3, 0, '', '03/06/2016 - 20:52 user: 21486033'),
(17, 7, 3, 0, '', '03/06/2016 - 20:53 user: 21486033'),
(18, 8, 3, 0, '', '03/06/2016 - 20:53 user: 21486033'),
(19, 8, 3, 0, '', '03/06/2016 - 20:53 user: 21486033'),
(20, 4, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 16:02 user: 43167810'),
(21, 6, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 16:02 user: 43167810'),
(22, 7, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 16:02 user: 43167810'),
(23, 8, 6, 43167810, 'Aprobacion+Masiva', '03/06/2016 - 16:02 user: 43167810'),
(24, 5, 1, 21486033, 'Anulado', '05/06/2016 - 16:38 user: 21486033'),
(25, 9, 2, 0, 'Creado', '07/06/2016 - 19:44 user: 43865093'),
(26, 9, 3, 0, '', '07/06/2016 - 19:47 user: 21486033'),
(27, 9, 6, 43167810, '', '07/06/2016 - 15:50 user: 43167810'),
(28, 9, 6, 43167810, '', '07/06/2016 - 15:51 user: 43167810'),
(29, 10, 2, 0, 'Creado', '08/06/2016 - 18:09 user: 71800210'),
(30, 10, 3, 0, '', '08/06/2016 - 19:03 user: 21486033'),
(31, 10, 6, 43167810, 'Aprobacion+Masiva', '08/06/2016 - 14:09 user: 43167810'),
(32, 11, 3, 0, '', '08/06/2016 - 19:44 user: 21486033'),
(33, 11, 6, 43167810, '', '08/06/2016 - 14:49 user: 43167810'),
(34, 12, 2, 0, 'Creado', '08/06/2016 - 21:38 user: 43865093'),
(35, 13, 2, 0, 'Creado', '08/06/2016 - 21:43 user: 43865093'),
(36, 12, 3, 21486033, '', '08/06/2016 - 16:47 user: 21486033'),
(37, 12, 3, 21486033, '', '08/06/2016 - 16:48 user: 21486033'),
(38, 13, 3, 21486033, '', '08/06/2016 - 16:48 user: 21486033'),
(39, 12, 6, 43167810, 'Aprobacion+Masiva', '08/06/2016 - 16:56 user: 43167810'),
(40, 13, 6, 43167810, 'Aprobacion+Masiva', '08/06/2016 - 16:56 user: 43167810'),
(41, 14, 2, 0, 'Creado', '10/06/2016 - 14:25 user: 43865093'),
(42, 14, 3, 0, '', '10/06/2016 - 14:31 user: 21486033'),
(43, 14, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 9:42 user: 43167810'),
(44, 15, 2, 0, 'Creado', '10/06/2016 - 16:58 user: 71800210'),
(45, 15, 3, 0, '', '10/06/2016 - 16:59 user: 21486033'),
(46, 15, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 12:04 user: 43167810'),
(47, 16, 2, 0, 'Creado', '10/06/2016 - 18:32 user: 43098599'),
(48, 17, 2, 0, 'Creado', '10/06/2016 - 18:33 user: 43098599'),
(49, 18, 2, 0, 'Creado', '10/06/2016 - 18:33 user: 43098599'),
(50, 19, 2, 0, 'Creado', '10/06/2016 - 18:43 user: 43098599'),
(51, 20, 2, 0, 'Creado', '10/06/2016 - 18:49 user: 43098599'),
(52, 16, 3, 0, '', '10/06/2016 - 18:52 user: 21486033'),
(53, 19, 3, 0, '', '10/06/2016 - 18:52 user: 21486033'),
(54, 20, 3, 0, '', '10/06/2016 - 18:52 user: 21486033'),
(55, 16, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 13:57 user: 43167810'),
(56, 19, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 13:57 user: 43167810'),
(57, 20, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 13:57 user: 43167810'),
(58, 17, 1, 21486033, 'Anulado', '10/06/2016 - 14:38 user: 21486033'),
(59, 18, 1, 21486033, 'Anulado', '10/06/2016 - 14:43 user: 21486033'),
(60, 21, 2, 0, 'Creado', '10/06/2016 - 20:15 user: 16075710'),
(61, 21, 3, 0, '', '10/06/2016 - 21:17 user: 21486033'),
(62, 22, 3, 0, '', '10/06/2016 - 21:17 user: 21486033'),
(63, 23, 3, 0, '', '10/06/2016 - 21:17 user: 21486033'),
(64, 21, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(65, 22, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(66, 23, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(67, 21, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(68, 22, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(69, 23, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(70, 21, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(71, 22, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(72, 23, 6, 43167810, 'Aprobacion+Masiva', '10/06/2016 - 16:24 user: 43167810'),
(73, 24, 2, 0, 'Creado', '11/06/2016 - 18:31 user: 73104042'),
(74, 25, 2, 0, 'Creado', '11/06/2016 - 18:34 user: 73104042'),
(75, 24, 3, 21486033, '', '13/06/2016 - 7:34 user: 21486033'),
(76, 25, 3, 21486033, '', '13/06/2016 - 7:35 user: 21486033'),
(77, 24, 6, 43167810, 'Aprobacion+Masiva', '13/06/2016 - 10:34 user: 43167810'),
(78, 25, 6, 43167810, 'Aprobacion+Masiva', '13/06/2016 - 10:34 user: 43167810');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idsecretaria` int(10) NOT NULL,
  `idusuario` int(10) NOT NULL,
  `idppto` varchar(20) NOT NULL,
  `fchreg` varchar(20) NOT NULL,
  `fchentrega` date NOT NULL,
  `hora` time NOT NULL,
  `idtalimento` int(2) NOT NULL,
  `idalimento` int(10) NOT NULL,
  `comentario` varchar(150) DEFAULT NULL,
  `evento` varchar(50) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `cantidad` int(4) NOT NULL,
  `personarecibe` varchar(35) NOT NULL,
  `telfjorecibe` varchar(10) NOT NULL,
  `movilrecibe` varchar(10) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '0',
  `valorpedido` decimal(20,0) NOT NULL,
  `valoradic` decimal(20,0) NOT NULL,
  `remision` varchar(50) NOT NULL,
  `factura` varchar(50) NOT NULL,
  `iplog` varchar(20) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `idsecretaria`, `idusuario`, `idppto`, `fchreg`, `fchentrega`, `hora`, `idtalimento`, `idalimento`, `comentario`, `evento`, `direccion`, `cantidad`, `personarecibe`, `telfjorecibe`, `movilrecibe`, `estado`, `valorpedido`, `valoradic`, `remision`, `factura`, `iplog`, `bitactivo`) VALUES
(1, 705, 71800210, '4700050449-120368-2', '03/06/2016 - 13:47', '2016-06-07', '09:00:00', 2, 10, 'Con jugo tetra pack, fruta variada. ', 'CAPACITACIÓN ', 'Carrera 43F No. 18-60 (TELEMEDELLIN-EL POBLADO)', 26, 'DIANA MARCELA MONSALVE VALDERRAMA ', '383 11 91', '3183724509', 6, '73862', '0', '', '', '', 1),
(2, 733, 73104042, '4700050458-120309-1', '03/06/2016 - 16:59', '2016-06-04', '13:00:00', 1, 2, '', 'EVENTO MASIVO ESTADIO ATANASIO GIRARDOT', 'Puerta 36 ', 10, 'Carlos Andres Quintero Monsalve', '3834375', '3104477501', 6, '91536', '0', '', '', '', 1),
(3, 733, 73104042, '4700050458-120309-1', '03/06/2016 - 17:02', '2016-06-05', '12:00:00', 1, 9, '', 'EVENTO MASIVO ESTADIO ATANASIO GIRARDOT', 'PUERTA 36', 10, 'Carlos Andres Quintero Monsalve', '383 7572', '3104477501', 6, '88972', '0', '', '', '', 1),
(4, 761, 43263603, '4700050470-120218-2', '03/06/2016 - 20:28', '2016-06-07', '15:00:00', 2, 36, '', 'Capacitacion MGA', 'ALCALDIA DE MEDELLIN PISO XX OFICINA 810 – piso 8', 15, 'Janeth Ocampo - Sandra ', '3855830-38', '3022020608', 6, '33321', '0', '', '', '', 1),
(5, 761, 43263603, '4700050470-120218-2', '03/06/2016 - 20:30', '2016-06-07', '10:00:00', 2, 13, '', 'Capacitacion MGA', 'ALCALDIA DE MEDELLIN PISO XX OFICINA 810 – piso 8', 15, 'Janeth Ocampo - Sandra ', '3855830-38', '3022020608', 1, '39916', '0', '', '', '', 0),
(6, 761, 43263603, '4700050470-120218-2', '03/06/2016 - 20:30', '2016-06-07', '10:00:00', 2, 13, '', 'Capacitacion MGA', 'ALCALDIA DE MEDELLIN PISO XX OFICINA 810 – piso 8', 15, 'Janeth Ocampo - Sandra ', '3855830-38', '3022020608', 6, '39916', '0', '', '', '', 1),
(7, 761, 43263603, '4700050470-120218-2', '03/06/2016 - 20:35', '2016-06-09', '15:34:00', 2, 10, '', 'Capacitacion MGA', 'ALCALDIA DE MEDELLIN PISO XX OFICINA 810 – piso 8', 15, 'Natalia Andrea Salazar  ', '3855815-38', '3022020608', 6, '42613', '0', '', '', '', 1),
(8, 761, 43263603, '4700050470-120218-2', '03/06/2016 - 20:38', '2016-06-09', '15:00:00', 2, 14, '', 'Capacitacion MGA', 'ALCALDIA DE MEDELLIN PISO XX OFICINA 810 – piso 8', 15, 'Natalia Andrea Salazar  ', '3855815-38', '3022020608', 6, '32660', '0', '', '', '', 1),
(9, 721, 43865093, '4700050451-120029-2', '07/06/2016 - 19:44', '2016-06-09', '07:00:00', 2, 11, 'Autorizado por la Doctora Clara Luz Trujillo', 'sensibilización acueductos', 'carrera 53A 42 161 Recepción', 30, 'Fernando castrillom', '3856703', '3003674441', 6, '87244', '0', '', '', '', 1),
(10, 705, 71800210, '4700050449-120368-2', '08/06/2016 - 18:09', '2016-06-09', '09:00:00', 2, 16, 'Con Tetra Pack. ADEMAS UNA BOTELLA DE AGUA DE 350 ML', 'CAPACITACIÓN-COACHING ', 'Carrera 43F No. 18-60 (TELEMEDELLIN-EL POBLADO)', 25, 'DIANA MARCELA MONSALVE VALDERRAMA ', '383 11 91', '3183724509', 6, '54172', '0', '', '', '', 1),
(11, 731, 43593203, '4700050440-120274-2', '08/06/2016 - 14:07', '2016-06-09', '14:30:00', 2, 16, 'Favor recordar entregar refrigerios a las 08:00 a.m en la Unidad Inspecciones de Policía Casa de Justicia ', 'Reunión Unidad Inspeciones', 'Carrera 52 #71-84 Segundo Piso ', 50, 'Edgardo Alfonso Bedoya', '4939744', '3113120296', 6, '108344', '0', '', '', '', 1),
(12, 721, 43865093, '4700050451-120029-2', '08/06/2016 - 21:38', '2016-06-14', '07:00:00', 2, 20, 'Acompañado de Jugo de caja tetra pack. Autorizado por la Dra. Clara Luz Trujillo. Entregar en la entrada del edificio.\r\n', 'capacitación acueductos', 'Carrera 53 A No. 42-161. Edificio Plaza De La Libertad.', 30, 'FERNANDO CASTRILLÓN MACÍAS', '3856703', '3003674441', 6, '61178', '0', '', '', '', 1),
(13, 721, 43865093, '4700050451-120029-2', '08/06/2016 - 21:43', '2016-06-21', '07:00:00', 2, 23, 'Pastel de pollo acompañado de Jugo de caja tetra pack. Autorizado por la Dra. Clara Luz Trujillo. Entregar en la entrada del edificio\r\n', 'capacitación acueductos', 'Carrera 53 A No. 42-161. Edificio Plaza De La Libertad.', 30, 'FERNANDO CASTRILLÓN MACÍAS', '3856703', '3003674441', 6, '71549', '0', '', '', '', 1),
(14, 721, 43865093, '4700050451-120029-2', '10/06/2016 - 14:25', '2016-06-14', '12:30:00', 2, 18, 'Acompañado de Jugo de caja tetra pack. Autorizado por la Dra. Clara Luz Trujillo\r\n', 'Reunión PAI de Ciudad.', 'Parque Biblioteca de Belén. Carrera 76 Nº 18 A 19', 200, 'Norma Elena Orrego', '3855060', '3002555156', 6, '626168', '0', '', '', '', 1),
(15, 705, 71800210, '4700050449-120368-2', '10/06/2016 - 16:58', '2016-06-13', '09:00:00', 2, 19, 'Con caja tetra pack', 'CAPACITACIÓN-COACHING ', 'Carrera 43F No. 18-60 (TELEMEDELLIN-EL POBLADO)', 25, 'DIANA MARCELA MONSALVE VALDERRAMA ', '385 6191', '3183724509', 6, '66178', '0', '', '', '', 1),
(16, 713, 43098599, '4700050462-120173-1', '10/06/2016 - 18:32', '2016-06-12', '12:30:00', 1, 2, '', 'Programa de Bibliotecas', 'Teatro Lido 20, Av. Ecuador #54, Medellín, Antioquia', 8, 'Andres Carvajal', '3858042', '300 609 67', 6, '73228', '0', '', '', '', 1),
(17, 713, 43098599, '4700050462-120173-1', '10/06/2016 - 18:33', '2016-06-12', '12:30:00', 1, 2, '', 'Programa de Bibliotecas', 'Teatro Lido 20, Av. Ecuador #54, Medellín, Antioquia', 8, 'Andres Carvajal', '3858042', '300 609 67', 1, '73228', '0', '', '', '', 0),
(18, 713, 43098599, '4700050462-120173-1', '10/06/2016 - 18:33', '2016-06-12', '12:30:00', 1, 2, '', 'Programa de Bibliotecas', 'Teatro Lido 20, Av. Ecuador #54, Medellín, Antioquia', 8, 'Andres Carvajal', '3858042', '300 609 67', 1, '73228', '0', '', '', '', 0),
(19, 713, 43098599, '4700050462-120173-1', '10/06/2016 - 18:43', '2016-06-12', '12:30:00', 1, 4, '', 'Programa Bibliotecas', 'Teatro Lido 20, Av. Ecuador #54, Medellín, Antioquia', 8, 'Andres Carvajal, ', '3858020', '300 609 67', 6, '90127', '0', '', '', '', 1),
(20, 713, 43098599, '4700050462-120173-1', '10/06/2016 - 18:49', '2016-06-13', '12:30:00', 1, 7, '', 'Programa de Bibliotecas', 'Teatro Lido 20, Av. Ecuador #54, Medellín, Antioquia', 8, 'Andres Carvajal', '3858020', '3006096714', 6, '78165', '0', '', '', '', 1),
(21, 751, 16075710, '4700050444-120235-2', '10/06/2016 - 20:15', '2016-06-13', '07:00:00', 2, 10, 'Solicitamos 13 refrigerios Opción almojábana y fruta.\r\n Las bebidas deben ser:\r\n6 jugos\r\n4 Café con leche\r\n3 Chocolates', 'Reunion Banco de las Oportunidades', 'calle 44 #52-165 Sotano CAM- Banco de las Oportunidades', 13, 'Teresita Castañeda L', '3857382', '3216117238', 6, '36931', '0', '', '', '', 1),
(22, 733, 73104042, '4700050458-120309-1', '10/06/2016 - 15:50', '2016-06-11', '16:00:00', 1, 9, '', 'AFLUENCIA MASIVA', 'Estadio Atanasio Girardot, puerta 36', 5, 'Juan DAvid Perez Gallego', '3857569', '3006152215', 6, '44486', '0', '', '', '', 1),
(23, 733, 73104042, '4700050458-120309-1', '10/06/2016 - 15:54', '2016-06-12', '12:00:00', 1, 2, '', 'AFLUENCIAA MASIVA', 'Estadio Atanasio Girardot, puerta 36', 5, 'JUAN DAVID PEREZ', '3857569', '300615215', 6, '45768', '0', '', '', '', 1),
(24, 733, 73104042, '4700050458-120309-1', '11/06/2016 - 18:31', '2016-06-12', '13:26:00', 1, 9, 'Estos 10 almuerzos se entregan el día de hoy sábado 11 de junio en la Planta de HB', 'AFLUENCIA MASIVA', 'Planta de alimentos HB', 10, 'Hector Franco', '3857567', '3126710579', 6, '88972', '0', '', '', '', 1),
(25, 733, 73104042, '4700050458-120309-1', '11/06/2016 - 18:34', '2016-06-12', '13:31:00', 1, 2, 'Este pedido es para  completar 15 almuerzos en total que se necesitan para el día domingo 12 a las 12:00 en el estadio Atanasio Girardot', 'AFLUENCIA MASIVA', 'Estadio Atanasio Girardot, puerta 36', 10, 'Juan David Perez Gallego', '3857569', '3006152215', 6, '91536', '0', '', '', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona-ppto`
--

CREATE TABLE IF NOT EXISTS `persona-ppto` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `idusuario` int(10) NOT NULL,
  `idppto` varchar(20) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

--
-- Volcado de datos para la tabla `persona-ppto`
--

INSERT INTO `persona-ppto` (`id`, `idusuario`, `idppto`, `bitactivo`) VALUES
(1, 43098599, '4700050466-120170-2', 1),
(2, 43098599, '4700050466-120173-2', 1),
(3, 43098599, '4700050466-120174-2', 1),
(4, 43098599, '4700050466-120176-2', 1),
(5, 43098599, '4700050466-120179-2', 1),
(6, 43098599, '4700050466-120181-2', 1),
(7, 43098599, '4700050466-120182-2', 1),
(8, 71082082, '4700050463-120192-2', 1),
(9, 71800210, '4700050449-120368-2', 1),
(10, 71667989, '4700050457-120117-2', 1),
(11, 43593203, '4700050440-120274-2', 1),
(12, 43760116, '4700050440-120280-2', 1),
(13, 39354691, '4700050436-100000-2', 1),
(14, 42986692, '4700050435-150059-2', 1),
(15, 21595439, '4700050472-100000-2', 1),
(16, 30290901, '4700050455-120093-2', 1),
(17, 30290901, '4700050455-120097-2', 1),
(18, 30290901, '4700050455-120098-2', 1),
(19, 30290901, '4700050455-120100-2', 1),
(20, 30290901, '4700050455-120101-2', 1),
(21, 43263603, '4700050470-120167-2', 1),
(22, 43263603, '4700050470-120218-2', 1),
(23, 43263603, '4700050470-120219-2', 1),
(24, 43263603, '4700050470-120220-2', 1),
(25, 43263603, '4700050470-120222-2', 1),
(26, 43865093, '4700050451-120029-2', 1),
(27, 43865093, '4700050451-120044-2', 1),
(28, 43865093, '4700050451-120045-2', 1),
(29, 73104042, '4700050458-120309-2', 1),
(30, 16075710, '4700050444-120235-2', 1),
(31, 16075710, '4700050444-120242-2', 1),
(32, 16075710, '4700050444-120243-2', 1),
(33, 16075710, '4700050444-120248-2', 1),
(34, 43098599, '4700050462-120173-1', 1),
(35, 43098599, '4700050462-120174-1', 1),
(36, 43098599, '4700050462-120176-1', 1),
(37, 43098599, '4700050462-120181-1', 1),
(38, 43098599, '4700050462-120182-1', 1),
(39, 43593203, '4700050440-120274-1', 1),
(40, 43760116, '4700050440-120280-1', 1),
(41, 42986692, '4700050435-150059-1', 1),
(42, 39354691, '4700050436-100000-1', 1),
(43, 30290901, '4700050455-120100-1', 1),
(44, 30290901, '4700050455-120101-1', 1),
(45, 30290901, '4700050455-120093-1', 1),
(46, 30290901, '4700050455-120097-1', 1),
(47, 30290901, '4700050455-120098-1', 1),
(48, 43263603, '4700050469-120219-1', 1),
(49, 43263603, '4700050469-120218-1', 1),
(50, 43263603, '4700050469-120220-1', 1),
(51, 43263603, '4700050469-120222-1', 1),
(52, 43263603, '4700050469-120167-1', 1),
(53, 73104042, '4700050458-120309-1', 1),
(54, 43098599, '4700050466-120174-3', 1),
(55, 43098599, '4700050466-120173-3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE IF NOT EXISTS `presupuesto` (
  `id` varchar(20) NOT NULL,
  `proyecto` varchar(6) NOT NULL,
  `pedido` varchar(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contrato` varchar(10) NOT NULL,
  `idsecretaria` int(3) NOT NULL,
  `valorini` decimal(11,0) NOT NULL,
  `valorpedido` decimal(11,0) NOT NULL,
  `valorpagado` decimal(11,0) NOT NULL,
  `valorNoRequerido` decimal(10,0) NOT NULL,
  `observacion` varchar(60) NOT NULL,
  `idproveedor` int(10) NOT NULL,
  `idtalimento` int(2) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `presupuesto`
--

INSERT INTO `presupuesto` (`id`, `proyecto`, `pedido`, `nombre`, `contrato`, `idsecretaria`, `valorini`, `valorpedido`, `valorpagado`, `valorNoRequerido`, `observacion`, `idproveedor`, `idtalimento`, `bitactivo`) VALUES
('4700050466-120170-2', '120170', '4700050466', 'Divulgación y apropiacón del patrimonio cultural m', '4600064861', 713, '5000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120173-2', '120173', '4700050466', 'Bibliotecas, Lecturas y patrimonio.', '4600064861', 713, '19000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120174-2', '120174', '4700050466', 'Cultura Ciudadada en equidad', '4600064861', 713, '19000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120176-2', '120176', '4700050466', 'Formación y Creación para la Ciudadania.', '4600064861', 713, '20000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120179-2', '120179', '4700050466', 'Desarrollo y Foralecimiento de la cultura como sec', '4600064861', 713, '15000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120181-2', '120181', '4700050466', 'Fomento de Identdad de Ciudad', '4600064861', 713, '30000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050466-120182-2', '120182', '4700050466', 'ciudad Cultural para la vida, Movilidad, convivenc', '4600064861', 713, '10000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050463-120192-2', '120192', '4700050463', 'Transparencia como garantía de buen gobierno', '4600064861', 703, '7700000', '0', '0', '0', '', 71525604, 2, 1),
('4700050449-120368-2', '120368', '4700050449', 'Gerencia Jurídica   en el Municipio de Medellín.', '4600064861', 705, '4140000', '194212', '0', '0', '', 71525604, 2, 1),
('4700050457-120117-2', '120117', '4700050457', 'Gestión Proceso de de conservación catastral ', '4600064861', 762, '2000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050440-120274-2', '120274', '4700050440', 'Sistema Municipal de Justicia Cercana al Ciudadano', '4600064861', 731, '15000000', '108344', '0', '0', '', 71525604, 2, 1),
('4700050440-120280-2', '120280', '4700050440', 'Reintegración social y prom. de la paz', '4600064861', 731, '6499029', '0', '0', '0', '', 71525604, 2, 1),
('4700050436-100000-2', '100000', '4700050436', 'Programa de Gastos. ', '4600064861', 704, '2000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050435-150059-2', '150059', '4700050435', 'Implementación NICS Municipio de Medellín', '4600064861', 704, '1003000', '0', '0', '0', '', 71525604, 2, 1),
('4700050472-100000-2', '100000', '4700050472', 'Programa de Gastos. ', '4600064861', 722, '5820949', '0', '0', '0', '', 71525604, 2, 1),
('4700050455-120093-2', '120093', '4700050455', 'Promoción seguridad pública para las Mujeres', '4600064861', 723, '3033456', '0', '0', '0', '', 71525604, 2, 1),
('4700050455-120097-2', '120097', '4700050455', 'Educación incluyente para las Mujeres', '4600064861', 723, '2386279', '0', '0', '0', '', 71525604, 2, 1),
('4700050455-120098-2', '120098', '4700050455', 'Promoción de fomento al a Mujer Rural', '4600064861', 723, '1132942', '0', '0', '0', '', 71525604, 2, 1),
('4700050455-120100-2', '120100', '4700050455', 'Gestión equidad de genero para la vida ', '4600064861', 723, '2634198', '0', '0', '0', '', 71525604, 2, 1),
('4700050455-120101-2', '120101', '4700050455', 'Promoción y participación Social y Política', '4600064861', 723, '1813126', '0', '0', '0', '', 71525604, 2, 1),
('4700050470-120167-2', '120167', '4700050470', 'Planificación de los proyectos estratégicos ', '4600064861', 761, '10000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050470-120218-2', '120218', '4700050470', 'Fortalecimiiento estratégico  planeación  socioal ', '4600064861', 761, '5000000', '108594', '0', '0', '', 71525604, 2, 1),
('4700050470-120219-2', '120219', '4700050470', 'Direccionamiento  planeación Participativa', '4600064861', 761, '5225294', '0', '0', '0', '', 71525604, 2, 1),
('4700050470-120220-2', '120220', '4700050470', 'Gestión Articulada territorio Regional', '4600064861', 761, '4000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050470-120222-2', '120222', '4700050470', 'Observatorio de políticas Públicas', '4600064861', 761, '2500000', '0', '0', '0', '', 71525604, 2, 1),
('4700050451-120029-2', '120029', '4700050451', 'Pomoción y Educación en Salud', '4600064861', 721, '15000000', '846139', '0', '0', '', 71525604, 2, 1),
('4700050451-120044-2', '120044', '4700050451', 'Articu inters e interi: alian salud vida.', '4600064861', 721, '4000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050451-120045-2', '120045', '4700050451', 'Fortalecimiento recursos Humanos, Físicos, y Técni', '4600064861', 721, '1907436', '0', '0', '0', '', 71525604, 2, 1),
('4700050458-120309-2', '120309', '4700050458', 'Atención Integral de Emergencias  y Desastres', '4600064861', 733, '20000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050444-120235-2', '120235', '4700050444', 'Banco de los pobres- Banco de las oportunidades.', '4600064861', 751, '1000000', '36931', '0', '0', '', 71525604, 2, 1),
('4700050444-120242-2', '120242', '4700050444', 'Cedezo para la asistencia empresarial a Redes soci', '4600064861', 751, '1500000', '0', '0', '0', '', 71525604, 2, 1),
('4700050444-120243-2', '120243', '4700050444', 'Apoyo a unidades productivas para el fortalecimien', '4600064861', 751, '2080000', '0', '0', '0', '', 71525604, 2, 1),
('4700050444-120248-2', '120248', '4700050444', 'Implementación plan de Desarrollo Turístico Medell', '4600064861', 751, '1000000', '0', '0', '0', '', 71525604, 2, 1),
('4700050462-120173-1', '120173', '4700050462', 'Bibliotecas, Lecturas  y Patrimonio', '4600064861', 713, '10000000', '168292', '0', '0', '', 71525604, 1, 1),
('4700050462-120174-1', '120174', '4700050462', 'Cultura Ciudadada en equidad', '4600064861', 713, '15000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050462-120176-1', '120176', '4700050462', 'Formación y Creación para la Ciudadania.', '4600064861', 713, '10000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050462-120181-1', '120181', '4700050462', 'Fomento de Identdad de Ciudad', '4600064861', 713, '130000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050462-120182-1', '120182', '4700050462', 'Culrura Ciudadana para la vida, la movidad, la con', '4600064861', 713, '5000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050440-120274-1', '120274', '4700050440', 'Sistema Municipal de Justicia Cercana al Ciudadano', '4600064861', 731, '7800000', '0', '0', '0', '', 71525604, 1, 1),
('4700050440-120280-1', '120280', '4700050440', 'Reintegración social y prom. de la paz', '4600064861', 731, '9999120', '0', '0', '0', '', 71525604, 1, 1),
('4700050435-150059-1', '150059', '4700050435', 'Implementación NICS Municipio de Medellín', '4600064861', 704, '690000', '0', '0', '0', '', 71525604, 1, 1),
('4700050436-100000-1', '100000', '4700050436', 'Programa de Gastos. ', '4600064861', 704, '1600000', '0', '0', '0', '', 71525604, 1, 1),
('4700050455-120100-1', '120100', '4700050455', 'Gestión equidad de genero para la vida ', '4600064861', 723, '1707711', '0', '0', '0', '', 71525604, 1, 1),
('4700050455-120101-1', '120101', '4700050455', 'Promoción y participación Social y Política', '4600064861', 723, '1175423', '0', '0', '0', '', 71525604, 1, 1),
('4700050455-120093-1', '120093', '4700050455', 'Promoción seguridad pública para las Mujeres', '4600064861', 723, '1966544', '0', '0', '0', '', 71525604, 1, 1),
('4700050455-120097-1', '120097', '4700050455', 'Educación incluyente para las Mujeres', '4600064861', 723, '1546989', '0', '0', '0', '', 71525604, 1, 1),
('4700050455-120098-1', '120098', '4700050455', 'Promoción de fomento al a Mujer Rural', '4600064861', 723, '734469', '0', '0', '0', '', 71525604, 1, 1),
('4700050469-120219-1', '120219', '4700050469', 'Direccionamiento  planeación Participativa', '4600064861', 761, '2000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050469-120218-1', '120218', '4700050469', 'Fortalecimiiento estratégico de la   planeación  s', '4600064861', 761, '1000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050469-120220-1', '120220', '4700050469', 'Gestión Articulada territorio Regional', '4600064861', 761, '1000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050469-120222-1', '120222', '4700050469', 'Observatorio de políticas Públicas', '4600064861', 761, '2500000', '0', '0', '0', '', 71525604, 1, 1),
('4700050469-120167-1', '120167', '4700050469', 'Planificación proyectos estratégicos ', '4600064861', 761, '5000000', '0', '0', '0', '', 71525604, 1, 1),
('4700050458-120309-1', '120309', '4700050458', 'Atención Integral de Emergencias  y Desastres', '4600064861', 733, '25000000', '451270', '0', '0', '', 71525604, 1, 1),
('4700050466-120174-3', '120174', '4700050466', 'Cultura Ciudadada en equidad', '4600064861', 713, '1000000', '0', '0', '0', '', 71525604, 3, 1),
('4700050466-120173-3', '120173', '4700050466', 'Bibliotecas, Lecturas y patrimonio.', '4600064861', 713, '1000000', '0', '0', '0', '', 71525604, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE IF NOT EXISTS `proveedor` (
  `id` int(10) NOT NULL,
  `proveedor` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `bitactivo` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `proveedor`, `email`, `telefono`, `direccion`, `bitactivo`) VALUES
(71525604, 'Alimentos y Servicios HB\n', 'alimentosyservicios.hb@gmail.com', '448 69 18', 'Calle 10B Sur Nro. 51-89 Medellín.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `id` tinyint(1) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `interventor` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `descripcion`, `interventor`) VALUES
(0, '', 21486033),
(1, 'usuario', 0),
(2, 'Interventor', 0),
(3, 'Proveedor', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secretaria`
--

CREATE TABLE IF NOT EXISTS `secretaria` (
  `id` int(3) NOT NULL,
  `secretaria` varchar(50) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `secretaria`
--

INSERT INTO `secretaria` (`id`, `secretaria`, `bitactivo`) VALUES
(205, 'SSAA', 1),
(703, ' Evaluación y control ', 1),
(704, ' Hacienda ', 1),
(705, ' General', 1),
(713, ' Cultura Ciudadana', 1),
(721, 'Salud ', 1),
(722, 'Inclusión Social  Familia y Derechos Humanos.', 1),
(723, ' Mujeres', 1),
(731, ' Gobierno y DDHH', 1),
(733, 'DAGRD ', 1),
(751, 'Desarrollo Económico ', 1),
(761, ' Planeación', 1),
(762, ' Gestion y control territorial', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoalimento`
--

CREATE TABLE IF NOT EXISTS `tipoalimento` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `talimento` varchar(50) NOT NULL,
  `idproveedor` int(10) NOT NULL,
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `tipoalimento`
--

INSERT INTO `tipoalimento` (`id`, `talimento`, `idproveedor`, `bitactivo`) VALUES
(1, 'Almuerzo', 71525604, 1),
(2, 'Refrigerio', 71525604, 1),
(4, 'Servicio', 71525604, 0),
(3, 'Agua', 71525604, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `password` varchar(10) NOT NULL,
  `idsecretaria` int(3) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `log` int(11) NOT NULL,
  `oficina` varchar(20) NOT NULL,
  `telefono` varchar(7) NOT NULL,
  `movil` varchar(10) NOT NULL,
  `fchcreacion` date NOT NULL,
  `idrol` tinyint(1) NOT NULL DEFAULT '1',
  `bitrecibemail` tinyint(1) NOT NULL DEFAULT '1',
  `bitactivo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `password`, `idsecretaria`, `mail`, `log`, `oficina`, `telefono`, `movil`, `fchcreacion`, `idrol`, `bitrecibemail`, `bitactivo`) VALUES
('43072618', 'Rubiela Urrea Ramírez', '43072618', 201, 'rubiela.urrea@medellin.gov.co', 0, '318', '3855099', '3127148051', '2011-05-20', 1, 1, 0),
('70082450', 'Javier Darío Villeg', '70082450', 201, 'maria.bedoya@medellin.gov.co', 0, '326', '3855345', '3014636888', '2011-05-20', 1, 1, 0),
('39354691', 'Ivonne Lucia Yepes Peralta', '39354691', 606, 'ivonne.yepes@medellin.gov.co', 0, 'Servicios Generales', '3857217', '314 719416', '2011-05-20', 1, 1, 1),
('42896690', 'Gloria Cecilia Alzate Gómez', '42896690', 202, 'gloria.alzate@medellin.gov.co', 0, '0', '0', '0', '2011-05-20', 1, 1, 0),
('42679126', 'Bertha Oliva Duque Gómez', '42679126', 205, 'bertha.duque@medellin.gov.co', 0, '626', '0', '0', '2011-05-20', 1, 1, 0),
('79506304', 'Diego Mauricio Maya Correa', '79506304', 205, 'diego.maya@medellin.gov.co', 0, '607', '3856881', '3122867465', '2011-05-20', 1, 1, 0),
('43905376', 'Sandra Milena Guerra Valencia', '43905376', 207, 'sandra.guerra@medellin.gov.co', 0, '304', '5148372', '3113137173', '2011-05-20', 1, 1, 0),
('15433616', 'Jaime Alberto Zapata Parra', '15433616', 208, 'jaime.zapata@medellin.gov.co', 0, '308', '3855103', '3113480746', '2011-05-20', 1, 1, 0),
('43264928', 'Carolina Toro Carvalho', '43264928', 209, 'carolina.toro@medellin.gov.co', 0, '128', '3857109', '3137364383', '2011-05-20', 1, 1, 0),
('42880352', 'Liliana Marí­a Duque Henao', '42880352', 210, 'liliana.duque@medellin.gov.co', 0, '404', '3857514', '3015636868', '2011-05-20', 1, 1, 0),
('71023175', 'Fabio Alfonso Goez López', '71023175', 216, 'fabio.goez@medellin.gov.co', 0, '129', '3857508', '3122123239', '2011-05-20', 1, 1, 0),
('52990503', 'Greta Lucelli romero Deluque', '52990503', 217, 'greta.romero@medellin.gov.co', 0, '425', '3855202', '3106410139', '2011-05-20', 1, 1, 0),
('73104042', 'Jaime Enrique Herrera', '73104042', 634, 'jaime.herrera@medellin.gov.co', 0, '1002', '3857567', '3202398452', '2011-05-20', 1, 1, 1),
('43098599', 'Claudia Beatriz Gomez Botero', '43098599', 613, 'claudiab.gomez@medellin.gov.co', 0, '702', '3856458', '3002012229', '2011-05-20', 1, 1, 1),
('21486033', 'Amanda Soto Sanchez', '21486033', 205, 'amanda.soto@medellin.gov.co', 0, '704', '3855011', '3015400676', '2011-05-20', 2, 1, 1),
('1128428892', 'Vanessa Sierra Valencia', '1128428892', 205, 'vanessa.sierra@medellin.gov.co', 0, '626', '3855747', '3136984136', '2011-05-20', 1, 1, 0),
('71450700', 'Mauricio Ortegon Cervera', '71450700', 205, 'mauricio.ortegon@medellin.gov.co', 0, '626', '3857385', '3154660199', '2011-05-20', 1, 1, 0),
('8175482', 'Yohan Camilo Quintero Bonet ', '8175482', 0, 'cquinterob@outlook.com', 0, '', '4486918', '3116749730', '2016-05-31', 3, 1, 1),
('1128417298', 'MarÃƒÂ­a Carolina Bustamante G.', '1128417298', 208, 'mariac.bustamante@medellin.gov.co', 71450700, '308', '3855103', '3113519013', '2011-07-08', 1, 1, 0),
('42896850', 'Claudia Susana Herrera Arenas', '42896850', 203, 'claudia.herrera@medellin.gov.co', 71450700, '416', '3855468', '3113534007', '2011-08-29', 1, 1, 0),
('1128464786', 'Diana Catalina Paniagua GÃƒÂ³mez', '1128464786', 207, 'diana.paniagua@medellin.gov.co', 71450700, 'Carre 304', '5148372', '3013561732', '2011-10-10', 1, 1, 0),
('98551317', 'Jose Wldarico Osorio Garcia', '98551317', 205, 'jose.osorio@medellin.gov.co', 71450700, '626', '3856451', '3104410788', '2011-10-14', 1, 1, 0),
('8472605', 'Rom Alberto Gallego', '8472605', 217, 'roman.gallego@medellin.gov.co', 71450700, '425', '3855372', '3007849480', '2012-02-28', 1, 1, 0),
('1128467916', 'Andres Felipe Tangarife Yepes', '1128467916', 1000, 'produccion@tiamima.com', 0, '', '', '', '0000-00-00', 1, 1, 0),
('43760116', 'Margarita María Escobar Osorio', '43760116', 0, 'margarita.escobar@medellin.gov.co', 71450700, 'Paz y reconciliacion', '4457853', '3005796580', '2012-05-24', 1, 1, 1),
('43728644', 'Adriana Patricia Bedoya PÃƒÂƒÃ‚ÂƒÃƒÂ‚Ã‚Â¡ez', '43728644', 220, 'adriana.bedoya@medellin.gov.co', 71450700, '321', '3855729', '301 789 25', '2012-05-28', 1, 1, 0),
('42762990', 'Blanca Wbielly Granda Granda', '42762990', 225, 'blanca.granada@medellin.gov.co', 71450700, '303', '3855164', '3116245703', '2012-06-04', 1, 1, 0),
('70750560', 'Luis Fernando Restrepo S', '70750560', 201, 'luisf.restrepo@medellin.gov.co', 71450700, '318', '3855099', '3206677611', '2012-06-15', 1, 1, 0),
('43075819', 'Maria Emperatriz Saldarriaga ', '43075819', 201, 'maria.saldarriaga@medellin.gov.co', 71450700, '315', '3855328', '3148629725', '2012-08-06', 1, 1, 0),
('43092243', 'Elsy del Socorro VÃƒÂ©lez Correa', '43092243', 210, 'elsy.velez@medellin.gov.co', 71450700, '404', '3855401', '3207430746', '2012-08-28', 1, 1, 0),
('19491696', 'Amanda Soto Sanchez', '19491696', 205, 'amanda.soto@medellin.gov.co', 0, '626', '3855011', '3015400676', '2013-02-28', 1, 1, 0),
('9855897', 'Oscar Alberto Castaño Hoyos', '9855897', 604, 'oscar.castano@medellin.gov.co', 0, 'No especificada', '3858076', '301376187', '0000-00-00', 1, 1, 0),
('98662845', 'Carlos Eduardo Restrepo R', '98662845', 605, 'carlose.restrepo@medellin.gov.co', 0, 'piso 10', '3856448', '3185202101', '0000-00-00', 1, 1, 0),
('43806997', 'Luz Yasmin Villa Chica', '43806997', 202, 'luz.villa@medellin.gov.co', 0, 'No especificada', '3856223', '3117937293', '0000-00-00', 1, 1, 0),
('42983660', 'Gloria Cecilia Montoya', '42983660', 219, 'gloria.montoya@medellin.gov.co', 21486033, '704', '3857184', '3002423025', '2013-07-03', 1, 1, 0),
('71315605', 'Jose Julian Arango Guerra', '71315605', 217, 'josej.arangog@medellin.gov.co', 19491696, '', '3855212', '', '2013-05-15', 1, 1, 0),
('43599008', 'Lina Maria Velez Ruiz', '43599008', 226, 'lina.velez@medellin.gov.co', 19491696, '1018 CAM', '3856203', '3004149451', '2013-05-17', 1, 1, 0),
('1017134864', 'Jaime Ochoa ', '1017134864', 219, 'jaime.ochoa@medellin.gov.co', 21486033, '702', '3855084', '3113130002', '2013-07-02', 1, 1, 0),
('71659021', 'Uriel Castrillon Macias', '71659021', 220, 'uriel.castrillon@medellin.gov.co', 0, 'No especificada', '3855728', '3104328565', '0000-00-00', 1, 1, 0),
('43518108', 'Diana Maria Graciano', '43518108', 631, 'diana.graciano@medellin.gov.co', 0, 'Unidad de Convivenci', '4939729', '3015913183', '0000-00-00', 1, 1, 0),
('71367933', 'Dubian Tobon Orozco', '71367933', 631, 'dubian.tobon@medellin.gov.co', 0, 'No especificada', '4939805', '3003243376', '0000-00-00', 1, 1, 0),
('43669192', 'Vilma Tabares Rúa ', '43669192', 201, 'vilma.tabares@medellin.gov.co', 0, 'No especificada', '493 97 ', '0', '0000-00-00', 1, 1, 0),
('79284038', 'Nelson Grimaldos Fonseca', '79284038', 222, 'nelson.grimaldos@medellin.gov.co', 0, 'No especificada', '3859484', '3015472191', '0000-00-00', 1, 1, 0),
('42778961', 'Luz Maria Mejia Botero', '42778961', 210, 'luz.mejia@medellin.gov.co', 0, 'No especificada', '3856857', '3108474563', '0000-00-00', 1, 1, 0),
('70104703', 'Jose Maria Perez  Lora', '70104703', 631, 'jose.perez@medellin.gov.co', 21486033, '', '4939735', '3006011262', '2013-07-12', 1, 1, 0),
('43865093', 'Paula Andrea Peña', '43865093', 721, 'paula.pena@medellin.gov.co', 21486033, '400', '3856838', '', '2013-08-08', 1, 1, 1),
('21595439', 'Andrea Mariaca Franco', '21595439', 622, 'andrea.mariaca@medellin.gov.co', 21486033, '416', '3855415', '3103829802', '2013-10-08', 1, 1, 1),
('66682194', 'Diana Alexandra Delgado A', '66682194', 623, 'diana.delgado@medellin.gov.co', 21486033, 'piso 10 ', '3856211', '3004302324', '2014-01-14', 1, 1, 0),
('43201107', 'Lina Fernanda Estupinan ', '43201107', 207, 'lina.estupiÃ±an@medellin.gov.co', 21486033, '', '514706', '000', '2014-01-22', 1, 1, 0),
('43085051', 'Maria Magdalena Bedoya G', '43085051', 631, 'maria.bedoya@medellin.gov.co', 21486033, '308', '3855345', '3014636888', '2014-02-17', 1, 1, 0),
('42986692', 'Luz Andrea  Cano\n', '42986692', 704, 'luz.cano1@medellin.gov.co', 0, '', '', '', '2014-04-23', 1, 1, 1),
('32150171', 'Juliana Fernandez Restrepo', '32150171', 621, 'juliana.fernandez@medellin.gov.co', 21486033, '1111', '3834149', '3137191504', '2014-04-23', 1, 1, 0),
('71666995', 'Luios Fernando Marin Jaramillo', '71666995', 219, 'luisf.marin@medellin.gov.co', 21486033, '702', '3856967', '350563133', '2014-04-23', 1, 1, 0),
('32299639', 'Andrea López Lozada', '32299639', 604, 'andrea.lopez@medellin.gov.co', 21486033, 'Piso 11', '3856851', '3105962228', '2014-06-16', 1, 1, 0),
('43531961', 'Nasay Alvarez Ospina ', '43531961', 604, 'nasay.alvarez@medellin.gov.co', 21486033, 'piso 11', '3855868', '3105962228', '2014-06-17', 1, 1, 0),
('71082082', 'Luis Fernando Marin Fonnegra', '71082082', 603, 'luisf.marinf@medellin.gov.co', 21486033, '1 piso', '385553', '3146168072', '2014-06-17', 1, 1, 1),
('71371616', 'Oscar Emilio Marín Garcés', '71371616', 613, 'oscare.marin@medellin.gov.co', 21486033, '704', '3855715', '3013767187', '2014-06-24', 1, 1, 0),
('16075710', 'Ricardo Andrés Alvarez R ', '16075710', 651, 'ricardo.alvarez@medellin,gov.co', 21486033, '1090', '3855635', '3216117238', '2014-07-10', 1, 1, 1),
('71216356', 'Oslber Mauricio Ortíz Hernande', '71216356', 605, 'oslber.ortiz@medellin.gov.co', 21486033, 'Piso 10', '3834387', '3007332249', '2014-09-10', 1, 1, 0),
('30290901', 'Gloria Ines Villa Sanche', '30290901', 623, 'gloria.villa@medellin.gov.co', 21486033, 'UPJ  e lBosque ', '4939735', '3148969710', '2014-10-09', 1, 1, 1),
('35116188', 'María Claudia González Benite ', '35116188', 605, 'maria.gonzalez@medellin.gov.co', 21486033, 'piso 10.', '3857191', '3113846023', '2015-01-20', 1, 1, 0),
('43167810', 'Johana Shirley Quintero Bonet', '43167810', 0, 'comprasylogística.hb@gmail.com', 0, '', '4486918', '3148555748', '2016-05-31', 3, 1, 1),
('43263603', 'ERIKA OROZCO OSPINA ', '43263603', 604, 'erika.orozco@medellin.gov.co', 21486033, '301', '3856209', '3012385931', '2015-04-13', 1, 1, 1),
('71800210', 'CARLOS HUMBERTO LUJAN M', '71800210', 605, 'carlos.lujan@medellin.gov.co', 21486033, '1000', '3834387', '3122914614', '2015-04-13', 1, 1, 1),
('71388130', 'Luis Alfonso Castaño GIL', '71388130', 631, 'luis.castaño@medellin.gov.co ', 21486033, '001', '4457858', '3103999670', '2015-04-13', 1, 1, 0),
('42798692', 'LUZ ANDREA CANO', '42798692', 606, 'luza.cano@medellin.gov.co', 21486033, '425', '3856223', '3004225659', '2015-04-13', 1, 1, 0),
('43594075', 'JENY CIRO JARAMILLO ', '43594075', 631, 'jeny.ciro@medellin.gov.co', 21486033, '1000', '9736', '3136501694', '2015-04-13', 1, 1, 1),
('71667989', 'Juan Carlos Gómez S', '71667989', 604, 'juancar.gomez@medellin.gov.co', 21486033, 'Plaza Liber.p.1', '3856851', '3105962228', '2015-04-17', 1, 1, 1),
('71603669', 'Gustavo Acevedo', '71603669', 631, 'gustavo.acevedo@medellin.gov.co', 21486033, '001', '4939736', '3113134917', '2015-09-22', 1, 1, 0),
('43400469', 'Angela María Ramirez', '43400469', 624, 'angela.ramirez@medellin.gov.co', 21486033, 'piso 10 E. Liber', '3858520', '3007747769', '2015-11-13', 1, 1, 0),
('70755040', 'Carlos Augusto Sánchez Montoya', '70755040', 0, 'alimentosyservicios.hb@gmail.com', 0, '', '4486918', '3112768144', '2016-05-31', 3, 1, 1),
('43593203', 'Gloria  Alexandra Orrego', '43593203', 731, '', 0, '', '', '', '2016-05-31', 1, 1, 1),
('60450182', 'Luz Adriana Torres Bautista', '60450182', 0, 'adriana.torresbautista@hotmail.com', 0, '', '4486918', '3104250990', '2016-05-31', 3, 1, 1),
('43831614', 'Daleska Johana Parra', '43831614', 0, 'daleskaparra@hotmail.com', 0, '', '4486918', '3506347175', '2016-05-31', 3, 1, 1),
('1026130703', 'Julie Arias Gòmez', '1026130703', 0, 'alimentamos.nutrición@gmail.com', 0, '', '4486918', '3122157459', '2016-05-31', 3, 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
