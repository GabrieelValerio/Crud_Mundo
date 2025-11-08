DROP DATABASE IF EXISTS crud_mundo;
CREATE DATABASE crud_mundo;
USE crud_mundo;

CREATE TABLE tb_pais (
    id_pais INT PRIMARY KEY AUTO_INCREMENT,
    nome_oficial VARCHAR(100) NOT NULL UNIQUE,
    continente VARCHAR(50) NOT NULL,
    populacao INT NOT NULL,
    idioma_principal VARCHAR(60) NOT NULL
);

CREATE TABLE tb_cidade (
    id_cidade INT PRIMARY KEY AUTO_INCREMENT,
    nome_oficial VARCHAR(100) NOT NULL,
    populacao INT NOT NULL,
    id_pais INT,
    FOREIGN KEY (id_pais) REFERENCES tb_pais(id_pais)
);

-- América
INSERT INTO tb_pais (nome_oficial, continente, populacao, idioma_principal) VALUES
('Brasil', 'América', 214000000, 'Português'),
('Argentina', 'América', 46000000, 'Espanhol'),
('Estados Unidos', 'América', 333000000, 'Inglês'),
('Canadá', 'América', 39000000, 'Inglês'),
('México', 'América', 128000000, 'Espanhol');

-- Europa
INSERT INTO tb_pais (nome_oficial, continente, populacao, idioma_principal) VALUES
('Portugal', 'Europa', 10300000, 'Português'),
('Espanha', 'Europa', 47000000, 'Espanhol'),
('França', 'Europa', 67000000, 'Francês'),
('Alemanha', 'Europa', 83000000, 'Alemão'),
('Itália', 'Europa', 59000000, 'Italiano');

-- África
INSERT INTO tb_pais (nome_oficial, continente, populacao, idioma_principal) VALUES
('Nigéria', 'África', 223000000, 'Inglês'),
('Egito', 'África', 110000000, 'Árabe'),
('África do Sul', 'África', 60000000, 'Zulu'),
('Quênia', 'África', 54000000, 'Suaíli'),
('Marrocos', 'África', 37000000, 'Árabe');

-- Ásia
INSERT INTO tb_pais (nome_oficial, continente, populacao, idioma_principal) VALUES
('China', 'Ásia', 1412000000, 'Mandarim'),
('Índia', 'Ásia', 1408000000, 'Hindi'),
('Japão', 'Ásia', 124000000, 'Japonês'),
('Coreia do Sul', 'Ásia', 52000000, 'Coreano'),
('Arábia Saudita', 'Ásia', 36000000, 'Árabe');

-- Oceania
INSERT INTO tb_pais (nome_oficial, continente, populacao, idioma_principal) VALUES
('Austrália', 'Oceania', 26000000, 'Inglês'),
('Nova Zelândia', 'Oceania', 5100000, 'Inglês'),
('Fiji', 'Oceania', 930000, 'Inglês'),
('Nova Guiné', 'Oceania', 9500000, 'Inglês'),
('Samoa', 'Oceania', 220000, 'Samoano');

-- CIDADES 
-- Brasil (id_pais = 1)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('São Paulo', 12300000, 1),
('Rio de Janeiro', 6700000, 1),
('Brasília', 3100000, 1),
('Salvador', 2900000, 1),
('Fortaleza', 2700000, 1);

-- Argentina (id_pais = 2)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Buenos Aires', 3000000, 2),
('Córdoba', 1400000, 2),
('Rosário', 1200000, 2),
('Mendoza', 1150000, 2),
('La Plata', 800000, 2);

-- Estados Unidos (id_pais = 3)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Nova Iorque', 8500000, 3),
('Los Angeles', 4000000, 3),
('Chicago', 2700000, 3),
('Houston', 2300000, 3),
('Miami', 470000, 3);

-- Canadá (id_pais = 4)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Toronto', 2800000, 4),
('Vancouver', 675000, 4),
('Montreal', 1700000, 4),
('Calgary', 1200000, 4),
('Ottawa', 1000000, 4);

-- México (id_pais = 5)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Cidade do México', 9200000, 5),
('Guadalajara', 1500000, 5),
('Monterrey', 1100000, 5),
('Puebla', 1400000, 5),
('Tijuana', 1800000, 5);

-- Portugal (id_pais = 6)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Lisboa', 500000, 6),
('Porto', 240000, 6),
('Braga', 190000, 6),
('Coimbra', 140000, 6),
('Faro', 60000, 6);

-- Espanha (id_pais = 7)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Madri', 3200000, 7),
('Barcelona', 1600000, 7),
('Valência', 800000, 7),
('Sevilha', 700000, 7),
('Bilbao', 345000, 7);

-- França (id_pais = 8)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Paris', 2100000, 8),
('Marselha', 870000, 8),
('Lyon', 520000, 8),
('Toulouse', 490000, 8),
('Nice', 340000, 8);

-- Alemanha (id_pais = 9)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Berlim', 3700000, 9),
('Hamburgo', 1800000, 9),
('Munique', 1500000, 9),
('Colônia', 1100000, 9),
('Frankfurt', 750000, 9);

-- Itália (id_pais = 10)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Roma', 2800000, 10),
('Milão', 1400000, 10),
('Nápoles', 960000, 10),
('Turim', 870000, 10),
('Palermo', 650000, 10);

-- Nigéria (id_pais = 11)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Lagos', 15000000, 11),
('Abuja', 3600000, 11),
('Kano', 4000000, 11),
('Ibadan', 3500000, 11),
('Benin City', 1500000, 11);

-- Egito (id_pais = 12)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Cairo', 10000000, 12),
('Alexandria', 5200000, 12),
('Giza', 8700000, 12),
('Shubra El-Kheima', 1100000, 12),
('Luxor', 500000, 12);

-- África do Sul (id_pais = 13)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Joanesburgo', 6000000, 13),
('Cidade do Cabo', 4300000, 13),
('Durban', 3700000, 13),
('Pretória', 2400000, 13),
('Port Elizabeth', 1200000, 13);

-- Quênia (id_pais = 14)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Nairóbi', 4500000, 14),
('Mombaça', 1200000, 14),
('Kisumu', 600000, 14),
('Nakuru', 570000, 14),
('Eldoret', 500000, 14);

-- Marrocos (id_pais = 15)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Casablanca', 3700000, 15),
('Rabat', 1700000, 15),
('Fez', 1200000, 15),
('Marrakech', 1000000, 15),
('Tânger', 950000, 15);

-- China (id_pais = 16)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Pequim', 21500000, 16),
('Xangai', 24000000, 16),
('Guangzhou', 14000000, 16),
('Shenzhen', 12500000, 16),
('Chongqing', 31000000, 16);

-- Índia (id_pais = 17)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Nova Délhi', 16700000, 17),
('Mumbai', 20000000, 17),
('Bangalore', 12000000, 17),
('Chennai', 10000000, 17),
('Hyderabad', 9700000, 17);

-- Japão (id_pais = 18)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Tóquio', 13900000, 18),
('Osaka', 2700000, 18),
('Yokohama', 3700000, 18),
('Nagoya', 2300000, 18),
('Sapporo', 1900000, 18);

-- Coreia do Sul (id_pais = 19)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Seul', 9700000, 19),
('Busan', 3500000, 19),
('Incheon', 2900000, 19),
('Daegu', 2400000, 19),
('Daejeon', 1500000, 19);

-- Arábia Saudita (id_pais = 20)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Riad', 7000000, 20),
('Jidá', 4000000, 20),
('Meca', 2000000, 20),
('Medina', 1300000, 20),
('Dammam', 1200000, 20);

-- Austrália (id_pais = 21)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Sydney', 5300000, 21),
('Melbourne', 5100000, 21),
('Brisbane', 2500000, 21),
('Perth', 2100000, 21),
('Adelaide', 1400000, 21);

-- Nova Zelândia (id_pais = 22)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Auckland', 1600000, 22),
('Wellington', 215000, 22),
('Christchurch', 380000, 22),
('Hamilton', 180000, 22),
('Dunedin', 120000, 22);

-- Fiji (id_pais = 23)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Suva', 94000, 23),
('Lautoka', 71000, 23),
('Nadi', 42000, 23),
('Ba', 15000, 23),
('Labasa', 28000, 23);

-- Papua-Nova Guiné (id_pais = 24)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Port Moresby', 400000, 24),
('Lae', 200000, 24),
('Madang', 30000, 24),
('Mount Hagen', 46000, 24),
('Kokopo', 26000, 24);

-- Samoa (id_pais = 25)
INSERT INTO tb_cidade (nome_oficial, populacao, id_pais) VALUES
('Apia', 40000, 25),
('Vaitele', 7000, 25),
('Faleula', 5000, 25),
('Siusega', 3000, 25),
('Leulumoega', 2500, 25);



