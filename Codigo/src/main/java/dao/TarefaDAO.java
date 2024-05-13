package dao;
import java.sql.*;

import io.github.cdimascio.dotenv.Dotenv;
import model.Tarefa;

public class TarefaDAO {

	private static final Dotenv dotenv = Dotenv.configure().load();
	
	private Connection conn;
	
	public TarefaDAO() {
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

	public Tarefa[] readTarefas(int userid) {
		
		Tarefa[] tarefas = null;
		
		try {
			String sql = "SELECT titulo, descricao, prazo, prioridade, status, atrasada, taskid, userid FROM public.tarefa WHERE userid = ? ORDER BY taskid ASC";
			PreparedStatement ps = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ps.setInt(1, userid);

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
