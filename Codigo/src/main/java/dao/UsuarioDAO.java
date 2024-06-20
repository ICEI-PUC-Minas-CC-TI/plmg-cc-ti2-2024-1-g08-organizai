package dao;

import java.sql.*;

import io.github.cdimascio.dotenv.Dotenv;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import model.Usuario;

public class UsuarioDAO {

	private static final Dotenv dotenv = Dotenv.configure().load();
	
	private Connection conn;
	private Argon2 argon2 = Argon2Factory.create();
	
	public UsuarioDAO() {
		conn = null;
	}
	
	public boolean connect() {
		
		String driverName = dotenv.get("DRIVER_NAME");
        String serverName = dotenv.get("SERVER_NAME");
        String mydb = dotenv.get("MYDB");
        int port = Integer.parseInt(dotenv.get("PORT"));

        String url = "jdbc:postgresql://" + serverName + ":" + port + "/" + mydb;
        String username = dotenv.get("USER");
        String password = dotenv.get("PASSWORD");
        boolean status = false;
		
		try {
			Class.forName(driverName);
			conn = DriverManager.getConnection(url, username, password);
			status = (conn == null);
		}catch(ClassNotFoundException e) {
			System.err.println("Conexao nao efetuada com o PostgreSQL: " + e.getMessage());
		}catch(SQLException e) {
			System.err.println("Conexao nao efetuada: " + e.getMessage());
		}
		
		return status;
	}
	
	
	public boolean close() {
		boolean status = false;
		
		try {
			conn.close();
			status = true;
		}catch(SQLException e) {
			System.err.println("Erro ao fechar conexao" + e.getMessage());
		}
		
		return status;
	}
	
	/*
	 CRUD
	*/
	public boolean createUsuario(Usuario usuario) {
		
		boolean status = false;
		
		try {
			PreparedStatement ps = conn.prepareStatement("INSERT INTO public.usuario(email, senhahash, nome) VALUES (?, ?, ?)");
			ps.setString(1, usuario.getEmail());
			ps.setString(2, argon2.hash(10, 65536, 1, usuario.getSenha()));
			ps.setString(3, usuario.getNome());
			
			int rowsInserted = ps.executeUpdate();
			if (rowsInserted > 0) {
				status = true;
			}
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}

	
	public Usuario readUsuario(int userid) {
		
		Usuario usuario = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement("SELECT email, nome, userid FROM public.usuario WHERE userid = ?");
			ps.setInt(1, userid);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				
				usuario = new Usuario(rs.getInt("userid"),
						rs.getString("nome"), 
						rs.getString("email"), null);
			}
			 
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return usuario;
	}
	
	public boolean updateUsuario(Usuario usuario) {
		
		boolean status = false;
		
		try {
			PreparedStatement ps = conn.prepareStatement("UPDATE public.usuario SET nome = ?, email = ?, senhahash = ? WHERE userid = ?");
			ps.setString(1, usuario.getNome());
			ps.setString(2, usuario.getEmail());
			ps.setString(3, usuario.getSenha());
			ps.setInt(4, usuario.getUsuarioID());
			
			int rowsUpdated = ps.executeUpdate();
			if (rowsUpdated > 0) {
				status = true;
			}
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}
	
	
	public boolean deleteUsuario(Usuario usuario) {
		
		boolean status = false;
		
		try {
			PreparedStatement ps = conn.prepareStatement("DELETE FROM public.usuario WHERE userid = ?");
			ps.setInt(1, usuario.getUsuarioID());
			
			int rowsDeleted = ps.executeUpdate();
			if (rowsDeleted > 0) {
				status = true;
			}
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}

	public Usuario login(Usuario usuarioLogin) {

		Usuario usuario = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement("SELECT userid, senhahash FROM public.usuario WHERE email = ?");
			ps.setString(1, usuarioLogin.getEmail());
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				// if(usuarioLogin.getSenha().equals(rs.getString("senhahash")))
				if(argon2.verify(rs.getString("senhahash"), usuarioLogin.getSenha()))
				{
					usuario = new Usuario(rs.getInt("userid"),
					null, 
					null, 
					null);
				}
			}
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return usuario;
	}
}
