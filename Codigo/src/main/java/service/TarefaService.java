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
	    tarefaDAO.createTarefa(tarefa);
	    
	    res.status(201);

	    return null;
	}
	
	
	public Object read(Request req, Response res) {
		
	    tarefaDAO.connect();
		int numeroAtomico = Integer.parseInt(req.params("taskid"));
		
		Tarefa tarefa = tarefaDAO.readTarefa(numeroAtomico);
	    
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
		
	    tarefaDAO.connect();
	    Tarefa[] tarefas = tarefaDAO.readTarefas();
	    
	    res.status(200);
	    res.type("application/json");
	    return gson.toJson(tarefas);
	}

	
	public Object update(Request req, Response res) {
		
	    tarefaDAO.connect();
	    
	    tarefa = gson.fromJson(req.body(), Tarefa.class);
		tarefaDAO.updateTarefa(tarefa);
		
	    res.status(200);
		return null;
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
