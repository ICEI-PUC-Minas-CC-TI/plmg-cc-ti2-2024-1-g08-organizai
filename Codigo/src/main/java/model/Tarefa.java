package model;

public class Tarefa {

    private int tarefaID;
    private int usuarioID;
    private String titulo;
    private String descricao;
    private String prazo;
    private String prioridade;
    private String status;
    private boolean atrasada;

    public Tarefa(int tarefaID, int usuarioID, String titulo, String descricao, String prazo, String prioridade, String status, boolean atrasada) {
        this.tarefaID = tarefaID;
        this.usuarioID = usuarioID;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prazo = prazo;
        this.prioridade = prioridade;
        this.status = status;
        this.atrasada = atrasada;
    }

    // Getters
    public int getTarefaID() {
        return tarefaID;
    }

    public int getUsuarioID() {
        return usuarioID;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getPrazo() {
        return prazo;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public String getStatus() {
        return status;
    }

    public boolean isAtrasada() {
        return atrasada;
    }

    // Setters
    public void setTarefaID(int tarefaID) {
        this.tarefaID = tarefaID;
    }

    public void setUsuarioID(int usuarioID) {
        this.usuarioID = usuarioID;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setPrazo(String prazo) {
        this.prazo = prazo;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAtrasada(boolean atrasada) {
        this.atrasada = atrasada;
    }
}
