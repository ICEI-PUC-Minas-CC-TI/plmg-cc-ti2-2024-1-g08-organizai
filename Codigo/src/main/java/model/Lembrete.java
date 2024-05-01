package model;

public class Lembrete {
    
    private int lembreteID;
    private int usuarioID;
    private String nome;
    private String conteudo;

    public Lembrete(int lembreteID, int usuarioID, String nome, String conteudo) {
        this.lembreteID = lembreteID;
        this.usuarioID = usuarioID;
        this.nome = nome;
        this.conteudo = conteudo;
    }

    // Getters
    public int getLembreteID() {
        return lembreteID;
    }

    public int getUsuarioID() {
        return usuarioID;
    }

    public String getNome() {
        return nome;
    }

    public String getConteudo() {
        return conteudo;
    }

    // Setters
    public void setLembreteID(int lembreteID) {
        this.lembreteID = lembreteID;
    }

    public void setUsuarioID(int usuarioID) {
        this.usuarioID = usuarioID;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }
}
