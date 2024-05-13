package service;

import dao.TarefaDAO;
import model.Tarefa;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
// import spark.Spark.*;

public class TarefaService {

	private TarefaDAO tarefaDAO = new TarefaDAO();
	private Tarefa tarefa = null;
	Gson gson = new Gson();
	
	public Object create(Request req, Response res) {
		
		tarefaDAO.connect();
	    
	    tarefa = gson.fromJson(req.body(), Tarefa.class);
		int userid = req.session().attribute("userid");

		tarefa.setUsuarioID(userid);
	    tarefaDAO.createTarefa(tarefa);
	    
	    res.status(201);

		return "Tarefa criada com sucesso";
	}
	
	
	public Object read(Request req, Response res) {
		
	    tarefaDAO.connect();
		int taskid = Integer.parseInt(req.params("taskid"));
		
		Tarefa tarefa = tarefaDAO.readTarefa(taskid);
	    
	    if (tarefa != null) {

	        res.status(200);
			res.type("application/json");
			return gson.toJson(tarefa);
	    } else {

	        res.status(404);
	        return "Tarefa não encontrado";
	    }
	}

	
	public Object readAll(Request req, Response res) {

		int userid = req.session().attribute("userid");
		tarefaDAO.connect();

		Tarefa[] tarefas = tarefaDAO.readTarefas(userid);
		
		res.status(200);
		res.type("application/json");
		return gson.toJson(tarefas);
	}

	
	public Object update(Request req, Response res) {
		
	    tarefaDAO.connect();
	    
	    tarefa = gson.fromJson(req.body(), Tarefa.class);
		tarefaDAO.updateTarefa(tarefa);
		
	    res.status(200);
		return "Tarefa atualizada com sucesso";
	}

	
	public Object delete(Request req, Response res) {
		
	    tarefaDAO.connect();
		tarefa = tarefaDAO.readTarefa(Integer.parseInt(req.params("taskid")));
	    
	    if (tarefa != null) {
	        tarefaDAO.deleteTarefa(tarefa);
	        
	        res.status(200);
	        return "Tarefa deletado com sucesso";
	    } else {
	        res.status(404);
	        return "Tarefa não encontrado";
	    }
	}

}
