package model;

public class Usuario {
    
    private int usuarioID;
    private String nome;
    private String email;
    private String senha;

    public Usuario(){};

    public Usuario(int usuarioID, String nome, String email, String senha) {
        this.usuarioID = usuarioID;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    //getters
    public int getUsuarioID() {
        return usuarioID;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
    
    //setters
    public void setUsuarioID(int usuarioID) {
        this.usuarioID = usuarioID;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
