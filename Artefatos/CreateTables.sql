-- Criação da tabela Usuario
CREATE TABLE public.Usuario (
    UserID SERIAL PRIMARY KEY,
    Login VARCHAR(50),
    SenhaHash VARCHAR(255),
    Nome VARCHAR(80)
);

-- Criação da tabela Tarefa
CREATE TABLE public.Tarefa (
    TaskID SERIAL PRIMARY KEY,
    UserID INT,
    Titulo VARCHAR(255),
    Descricao TEXT,
    Prazo TIMESTAMP,
    Prioridade VARCHAR(10) CHECK (Prioridade IN ('Baixa', 'Média', 'Alta')),
    Status VARCHAR(20) CHECK (Status IN ('Pendente', 'Em Progresso', 'Concluída')),
    FOREIGN KEY (UserID) REFERENCES public.Usuario(UserID)
);

-- Criação da tabela Lembrete
CREATE TABLE public.Lembrete (
    ReminderID SERIAL PRIMARY KEY,
    UserID INT,
    Nome VARCHAR(255),
    Conteudo TEXT,
    FOREIGN KEY (UserID) REFERENCES public.Usuario(UserID)
);
