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
			String sql = "INSERT INTO public.tarefa(userid, titulo, descricao, prazo, prioridade, status) "
					+ "VALUES (?, ?, ?, CAST(? AS timestamp), ?, ?)";
			
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, tarefa.getUsuarioID());
			ps.setString(2, tarefa.getTitulo());
			ps.setString(3, tarefa.getDescricao());
			ps.setString(4, tarefa.getPrazo());
			ps.setString(5, tarefa.getPrioridade());
			ps.setString(6, tarefa.getStatus());
			
			ps.executeUpdate();
			
			ps.close();
			status = true;
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}

	public Tarefa[] readTarefas() {
		
		Tarefa[] tarefas = null;
		
		try {
			String sql = "SELECT titulo, descricao, prazo, prioridade, status, atrasada, taskid, userid FROM public.tarefa ORDER BY taskid ASC";
			
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet rs = ps.executeQuery();
			
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
			
			ps.close();
			
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return tarefas;
	}
	
	public Tarefa readTarefa(int taskid) {
		
		Tarefa tarefa = null;
		
		try {
			String sql = "SELECT titulo, descricao, prazo, prioridade, status, atrasada, taskid, userid FROM public.tarefa WHERE taskid = ?";
			
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
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
			String sql = "UPDATE public.tarefa SET "
					+ "userid = ?, "
					+ "titulo = ?, "
					+ "descricao = ?, "
					+ "prazo = CAST(? AS timestamp), "
					+ "prioridade = ?, "
					+ "status = ?, "
					+ "atrasada = ? "
					+ "WHERE taskid = ?";
			
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, tarefa.getUsuarioID());
			ps.setString(2, tarefa.getTitulo());
			ps.setString(3, tarefa.getDescricao());
			ps.setString(4, tarefa.getPrazo());
			ps.setString(5, tarefa.getPrioridade());
			ps.setString(6, tarefa.getStatus());
			ps.setBoolean(7, tarefa.isAtrasada());
			ps.setInt(8, tarefa.getTarefaID());
			
			ps.executeUpdate();
			
			ps.close();
			status = true;
		}catch(SQLException e){
			System.err.println(e.getMessage());
		}
		
		return status;
	}	

	
	public boolean deleteTarefa(Tarefa tarefa) {
		
		boolean status = false;
		
		try {
			String sql = "DELETE FROM public.tarefa WHERE taskid = ?";
			
			PreparedStatement ps = conn.prepareStatement(sql);
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
