package dao;

import java.sql.*;
import model.Tarefa;

public class TarefaDAO {
	
	private Connection conn;
	
	public TarefaDAO() {
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
	public boolean createTarefa(Tarefa tarefa) {
		
		boolean status = false;
		
		try {
			Statement st = conn.createStatement();
			st.executeUpdate("INSERT INTO public.tarefa(userid, titulo, descricao, prazo, prioridade, status) "
					+ "VALUES ("+ tarefa.getUsuarioID() +", "
						   + "'"+ tarefa.getTitulo()+"', "
						   + "'"+ tarefa.getDescricao()+"', "
						   + "'"+ tarefa.getPrazo()+"', "
						   + "'"+ tarefa.getPrioridade()+"', "
						   + "'"+ tarefa.getStatus()+"');");
			
			st.close();
			status = true;
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}

	public Tarefa[] readTarefas() {
		
		Tarefa[] tarefas = null;
		
		try {
			Statement st = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM public.tarefa ORDER BY taskid ASC;");
			
			if(rs.next()) {
				rs.last();
				tarefas = new Tarefa[rs.getRow()];
				rs.beforeFirst();
				
				for(int i = 0; rs.next(); i++) {
					tarefas[i] = new Tarefa(rs.getInt("taskid"),
							rs.getInt("userid"), 
							rs.getString("titulo"), 
							rs.getString("descricao"), 
							rs.getString("prazo"), 
							rs.getString("prioridade"), 
							rs.getString("status"), 
							rs.getBoolean("atrasada"));
				}
			}
			
			st.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return tarefas;
	}
	
	public Tarefa readTarefa(int taskid) {
		
		Tarefa tarefa = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM public.tarefa WHERE taskid = ?");
            ps.setInt(1, taskid);
            ResultSet rs = ps.executeQuery();
            
			if(rs.next()) {
				
				tarefa = new Tarefa(rs.getInt("taskid"),
                rs.getInt("userid"), 
                rs.getString("titulo"), 
                rs.getString("descricao"), 
                rs.getString("prazo"), 
                rs.getString("prioridade"), 
                rs.getString("status"), 
                rs.getBoolean("atrasada"));
			}
             
            ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return tarefa;
	}
	
	public boolean updateTarefa(Tarefa tarefa) {
		
		boolean status = false;
		
		try {
            Statement st = conn.createStatement();
            String sql = "UPDATE public.tarefa SET "
					+ "userid = '"+tarefa.getUsuarioID()+"', "
					+ "titulo = '"+tarefa.getTitulo()+"', "
					+ "descricao = '"+tarefa.getDescricao()+"', "
					+ "prazo = '"+tarefa.getPrazo()+"', "
					+ "prioridade = '"+tarefa.getPrioridade()+"', "
					+ "status = '"+tarefa.getStatus()+"', "
					+ "atrasada = '"+tarefa.isAtrasada()+"' "
                    + "WHERE taskid = "+ tarefa.getTarefaID();
            
            st.executeUpdate(sql);
            st.close();
            status = true;
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}
	
	
	public boolean deleteTarefa(Tarefa tarefa) {
		
		boolean status = false;
		
		try {
			PreparedStatement ps = conn.prepareStatement("DELETE FROM public.tarefa WHERE taskid = ?");
            ps.setInt(1, tarefa.getTarefaID());
            ps.executeUpdate();
            ps.close();
            
            status = true;
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}
}