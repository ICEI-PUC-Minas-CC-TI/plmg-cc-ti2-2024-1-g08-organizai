package dao;

import java.sql.*;
import model.Usuario;

public class UsuarioDAO {
	
	private Connection conn;
	
	public UsuarioDAO() {
		conn = null;
	}
	
	public boolean connect() {
		
		String driverName = "org.postgresql.Driver";
		String serverName = "ti2gustavo.postgres.database.azure.com";
		String mydb = "postgres";
		int port = 5432;
		
		String url = "jdbc:postgresql://"+serverName+":"+port+""+"/"+ mydb;
		String username = "gustavoarc";
		String password = "Organizai1234";
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
			ps.setString(2, usuario.getSenha());
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

	public Usuario[] readUsuarios() {
		
		Usuario[] usuarios = null;
		
		try {
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT email, nome, senhahash, userid FROM public.usuario ORDER BY userid ASC;");
			
			if(rs.next()) {
				rs.last();
				usuarios = new Usuario[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) {
					usuarios[i] = new Usuario(rs.getInt("userid"),
							rs.getString("nome"), 
							rs.getString("email"), 
							rs.getString("senhahash"));
				}
			}
			
			st.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return usuarios;
	}
	
	public Usuario readUsuario(int userid) {
		
		Usuario usuario = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement("SELECT email, nome, senhahash, userid FROM public.usuario WHERE userid = ?");
			ps.setInt(1, userid);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				
				usuario = new Usuario(rs.getInt("userid"),
						rs.getString("nome"), 
						rs.getString("email"), 
						rs.getString("senhahash"));
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
}
