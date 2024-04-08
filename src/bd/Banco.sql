CREATE TABLE FeedBack (
    Id VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    FeedBackDescricao VARCHAR(255) NOT NULL
);

CREATE TABLE Fornecedores (
    Id VARCHAR(255) PRIMARY KEY,
    Nome VARCHAR(255),
    CnpjCpf VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);

CREATE TABLE Produtos (
    Id VARCHAR(255) PRIMARY KEY,
    Nome VARCHAR(255),
    Descricao VARCHAR(255) NOT NULL,
    Quantidade INT NOT NULL,
    Valor DECIMAL(18,2) NOT NULL,
    Localizacao VARCHAR(255),
    CodigoProduto VARCHAR(255),
    EstadoProduto VARCHAR(255) NOT NULL,
    Categoria VARCHAR(255) NOT NULL,
    FornecedorId VARCHAR(255),
    FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id)
);

CREATE TABLE Users (
    Id VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Cnpj VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    CONSTRAINT chk_email CHECK (Email LIKE '%_@__%.__%')
);
