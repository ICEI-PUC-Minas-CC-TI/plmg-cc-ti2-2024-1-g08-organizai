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
	public boolean createLembrete(Lembrete lembrete) {
		
		boolean status = false;
		
		try {
			Statement st = conn.createStatement();
			st.executeUpdate("INSERT INTO public.lembrete(reminderid, nome, conteudo) "
					+ "VALUES ("+ lembrete.getUsuarioID() +", "
						   + "'"+ lembrete.getNome()+"', "
						   + "'"+ lembrete.getConteudo()+"');");
			
			st.close();
			status = true;
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}

	public Lembrete[] readLembretes() {
		
		Lembrete[] lembretes = null;
		
		try {
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM public.lembrete ORDER BY reminderid ASC;");
			
			if(rs.next()) {
				rs.last();
				lembretes = new Lembrete[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) {
					lembretes[i] = new Lembrete(rs.getInt("reminderid"),
							rs.getInt("reminderid"), 
							rs.getString("nome"), 
							rs.getString("conteudo"));
				}
			}
			
			st.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return lembretes;
	}
	
	public Lembrete readLembrete(int reminderid) {
		
		Lembrete lembrete = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM public.lembrete WHERE reminderid = ?");
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
            Statement st = conn.createStatement();
            String sql = "UPDATE public.lembrete SET "
					+ "userid = '"+lembrete.getUsuarioID()+"', "
					+ "nome = '"+lembrete.getNome()+"', "
					+ "conteudo = '"+lembrete.getConteudo()+"' "
                    + "WHERE reminderid = "+ lembrete.getLembreteID();
            
            st.executeUpdate(sql);
            st.close();
            status = true;
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}
	
	
	public boolean deleteLembrete(Lembrete lembrete) {
		
		boolean status = false;
		
		try {
			PreparedStatement ps = conn.prepareStatement("DELETE FROM public.lembrete WHERE reminderid = ?");
            ps.setInt(1, lembrete.getLembreteID());
            ps.executeUpdate();
            ps.close();
            
            status = true;
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}
}
