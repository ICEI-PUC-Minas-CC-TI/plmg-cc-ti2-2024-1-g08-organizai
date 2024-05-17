-- Inserir dados na tabela Tarefa
INSERT INTO public.Tarefa (TaskID, UserID, Titulo, Descricao, Prazo, Prioridade, Status)
VALUES
    (1, 1, 'Reunião com cliente', 'Discutir os detalhes do novo projeto com cliente', '2023-09-06 09:00:00', 'Alta', 'Concluída'),
    (2, 1, 'Desenvolvimento de Software', 'Trabalhar no desenvolvimento de novas funcionalidades.', '2023-09-05 09:00:00', 'Média', 'Em Progresso'),
    (4, 1, 'Revisão de Código', 'Revisar o código para garantir qualidade e segurança.', '2023-09-12 11:00:00', 'Alta', 'Pendente'),
    (5, 1, 'Entrevista de Emprego', 'Realizar entrevista com candidato para posição de desenvolvedor.', '2023-09-15 15:30:00', 'Média', 'Pendente'),
    (6, 1, 'Treinamento da Equipe', 'Conduzir treinamento sobre novas tecnologias para a equipe.', '2023-09-20 10:00:00', 'Baixa', 'Em Progresso'),
    (7, 1, 'Apresentação de Vendas', 'Preparar e realizar apresentação de vendas para clientes.', '2023-09-25 14:30:00', 'Alta', 'Em Progresso'),
    (8, 1, 'Manutenção de Sistemas', 'Realizar manutenção preventiva nos sistemas da empresa.', '2023-09-28 09:00:00', 'Média', 'Pendente'),
    (9, 1, 'Entrega de Relatório', 'Finalizar e entregar relatório mensal aos superiores.', '2023-10-05 16:00:00', 'Baixa', 'Concluída'),
    (10, 1, 'Planejamento Estratégico', 'Participar de reunião para discutir o planejamento estratégico da empresa.', '2023-10-08 11:30:00', 'Alta', 'Pendente'),
    (11, 1, 'Treinamento de Atendimento ao Cliente', 'Participar de treinamento sobre atendimento ao cliente.', '2023-10-25 14:00:00', 'Média', 'Pendente'),
    (12, 1, 'Análise de Mercado', 'Realizar análise de mercado para identificar novas oportunidades de negócios.', '2023-10-14 10:30:00', 'Baixa', 'Pendente'),
    (13, 1, 'Entrega de Propostas', 'Preparar e entregar propostas comerciais aos clientes.', '2023-10-26 09:00:00', 'Alta', 'Pendente'),
    (14, 1, 'Seminário da Indústria', 'Participar de seminário sobre as últimas tendências na indústria.', '2023-10-20 09:00:00', 'Média', 'Concluída'),
    (15, 1, 'Avaliação de Desempenho', 'Participar de reunião para avaliação de desempenho dos colaboradores.', '2023-10-30 14:30:00', 'Baixa', 'Concluída'),
    (16, 1, 'Lançamento de Produto', 'Preparar e coordenar o lançamento de um novo produto no mercado.', '2023-11-05 13:00:00', 'Alta', 'Concluída'),
    (18, 1, 'Apresentação em Conferência', 'Preparar e apresentar palestra em conferência da indústria.', '2023-11-15 15:30:00', 'Baixa', 'Concluída'),
    (20, 1, 'Treinamento de Segurança', 'Participar de treinamento sobre práticas de segurança no trabalho.', '2023-11-25 14:00:00', 'Média', 'Concluída'),
    (21, 1, 'Entrega de Documentação', 'Preparar e entregar documentação completa do projeto ao cliente.', '2023-12-02 11:00:00', 'Baixa', 'Pendente'),
    (22, 1, 'Reunião de Avaliação', 'Participar de reunião para avaliação do desempenho da equipe.', '2023-12-07 09:00:00', 'Alta', 'Concluída'),
    (23, 1, 'Desenvolvimento de Protótipo', 'Trabalhar no desenvolvimento do protótipo para um novo projeto.', '2023-12-11 13:30:00', 'Média', 'Pendente'),
    (24, 1, 'Entrega de Resultados', 'Preparar e entregar os resultados do projeto aos acionistas.', '2023-12-16 11:30:00', 'Baixa', 'Em Progresso'),
    (25, 1, 'Celebração de Fim de Ano', 'Organizar evento de celebração de fim de ano para a equipe.', '2023-12-20 15:00:00', 'Alta', 'Em Progresso'),
    (26, 1, 'Planejamento para o Próximo Ano', 'Participar de reunião de planejamento estratégico para o próximo ano.', '2023-12-28 10:00:00', 'Média', 'Em Progresso'),
    (27, 1, 'Férias', 'Período de férias para descanso e recuperação.', '2024-01-02 00:00:00', 'Baixa', 'Em Progresso'),
    (28, 1, 'Retorno ao Trabalho', 'Retorno ao trabalho após o período de férias.', '2024-01-17 09:00:00', 'Alta', 'Em Progresso'),
    (29, 1, 'Treinamento de Novos Funcionários', 'Conduzir treinamento para novos funcionários da equipe.', '2024-01-20 14:00:00', 'Média', 'Em Progresso'),
    (30, 1, 'Revisão de Orçamento', 'Revisar e ajustar o orçamento para o próximo trimestre.', '2024-01-25 11:30:00', 'Baixa', 'Em Progresso'),
    (31, 1, 'Sessão de Treinamento de Vendas', 'Conduzir sessão de treinamento para a equipe de vendas da empresa.', '2024-01-15 11:00:00', 'Alta', 'Em Progresso'),
    (32, 1, 'Entrega de Protótipos', 'Entregar protótipos de novos produtos aos engenheiros de produção.', '2024-01-20 09:30:00', 'Média', 'Em Progresso'),
    (33, 1, 'Avaliação de Desempenho Trimestral', 'Participar de reunião para avaliação de desempenho trimestral dos colaboradores.', '2024-01-25 15:00:00', 'Baixa', 'Em Progresso'),
    (34, 1, 'Reunião de Planejamento de Produção', 'Participar de reunião para planejar a produção dos próximos meses.', '2024-01-30 10:00:00', 'Alta', 'Concluída'),
    (35, 1, 'Sessão de Feedback com Clientes', 'Conduzir sessão de feedback com clientes para melhorias nos produtos e serviços.', '2024-02-03 14:30:00', 'Média', 'Concluída'),
    (38, 1, 'Treinamento de Atendimento ao Cliente Internacional', 'Participar de treinamento sobre técnicas de atendimento ao cliente para mercados internacionais.', '2024-02-19 13:30:00', 'Média', 'Em Progresso'),
    (40, 1, 'Sessão de Brainstorming para Campanha Publicitária', 'Realizar sessão de brainstorming para criar novas ideias para uma campanha publicitária.', '2024-02-28 10:00:00', 'Alta', 'Concluída'),
    (43, 1, 'Apresentação para Parceiros de Negócios', 'Preparar e realizar apresentação para parceiros de negócios da empresa.', '2024-03-15 14:00:00', 'Alta', 'Em Progresso'),
    (44, 1, 'Sessão de Feedback de Produto', 'Conduzir sessão de feedback com clientes sobre um novo produto lançado.', '2024-03-20 15:00:00', 'Média', 'Concluída'),
    (49, 1, 'Treinamento de Novas Tecnologias', 'Participar de treinamento para aprender a usar novas tecnologias na empresa.', '2024-04-15 11:00:00', 'Alta', 'Em Progresso'),
    (52, 1, 'Reunião de Planejamento de Marketing', 'Participar de reunião para planejar estratégias de marketing para o próximo trimestre.', '2024-04-19 11:00:00', 'Alta', 'Concluída'),
    (53, 1, 'Almoço de Negócios', 'Almoçar com parceiros de negócios para discutir futuras colaborações.', '2024-04-20 13:00:00', 'Média', 'Concluída');

-- Inserir dados na tabela Lembrete
INSERT INTO public.Lembrete (ReminderID, Nome, Conteudo)
VALUES
    (1, 'Lembrete 1', 'Desligar o celular antes de começar'),
    (2, 'Lembrete 2', 'Pegar uma garrafa de água'),
    (3, 'COrrigir trb', 'Corrigir trabalhos.');
   
   
INSERT INTO public.usuario (userid, login, senhahash, nome)
VALUES (1, 'gustavoarc', 'hash', 'Gustavo');