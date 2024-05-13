package dao;
import java.sql.*;
import model.Lembrete;

public class LembreteDAO {
	
	private Connection conn;
	
	public LembreteDAO() {
		conn = null;
	}
	
	public boolean connect() {
		
		String driverName = "org.postgresql.Driver";
		String serverName = "ti2gustavo.postgres.database.azure.com";
		String mydb = "postgres";
		int port = 5432;
		
		String url = "jdbc:postgresql://"+serverName+":"+port+""+"/"+ mydb;
		String username = "gustavoarc";
		String password = "0Xe40|G3I4u8";
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
	public boolean createLembrete(Lembrete lembrete) {
		
		boolean status = false;
		
		try {
			String sql = "INSERT INTO public.lembrete(userid, nome, conteudo) VALUES (?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, lembrete.getUsuarioID());
			ps.setString(2, lembrete.getNome());
			ps.setString(3, lembrete.getConteudo());
			
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

	public Lembrete[] readLembretes() {
		
		Lembrete[] lembretes = null;
		
		try {
			String sql = "SELECT nome, conteudo, reminderid, userid FROM public.lembrete ORDER BY reminderid ASC";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				rs.last();
				lembretes = new Lembrete[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) {
					lembretes[i] = new Lembrete(rs.getInt("reminderid"),
							rs.getInt("userid"), 
							rs.getString("nome"), 
							rs.getString("conteudo"));
				}
			}
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return lembretes;
	}
	
	public Lembrete readLembrete(int reminderid) {
		
		Lembrete lembrete = null;
		
		try {
			String sql = "SELECT nome, conteudo, reminderid, userid FROM public.lembrete WHERE reminderid = ?";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, reminderid);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				
				lembrete = new Lembrete(rs.getInt("reminderid"),
						rs.getInt("reminderid"), 
						rs.getString("nome"), 
						rs.getString("conteudo"));
			}
			 
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return lembrete;
	}
	
	public boolean updateLembrete(Lembrete lembrete) {
		
		boolean status = false;
		
		try {
			String sql = "UPDATE public.lembrete SET userid = ?, nome = ?, conteudo = ? WHERE reminderid = ?";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, lembrete.getUsuarioID());
			ps.setString(2, lembrete.getNome());
			ps.setString(3, lembrete.getConteudo());
			ps.setInt(4, lembrete.getLembreteID());
			
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
	
	
	public boolean deleteLembrete(Lembrete lembrete) {
		
		boolean status = false;
		
		try {
			String sql = "DELETE FROM public.lembrete WHERE reminderid = ?";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, lembrete.getLembreteID());
			
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
