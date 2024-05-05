package service;

import dao.LembreteDAO;
import model.Lembrete;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
// import spark.Spark.*;

public class LembreteService {

	private LembreteDAO lembreteDAO = new LembreteDAO();
	private Lembrete lembrete = null;
	Gson gson = new Gson();
	
	public Object create(Request req, Response res) {
		
		lembreteDAO.connect();
	    
	    lembrete = gson.fromJson(req.body(), Lembrete.class);
	    lembreteDAO.createLembrete(lembrete);
	    
	    res.status(201);

	    return null;
	}
	
	
	public Object read(Request req, Response res) {
		
	    lembreteDAO.connect();
		int numeroAtomico = Integer.parseInt(req.params("reminderid"));
		
		Lembrete lembrete = lembreteDAO.readLembrete(numeroAtomico);
	    
	    if (lembrete != null) {

	        res.status(200);
			res.type("application/json");
			return gson.toJson(lembrete);
	    } else {

	        res.status(404);
	        return "Lembrete não encontrado";
	    }
	}

	
	public Object readAll(Request req, Response res) {
		
	    lembreteDAO.connect();
	    Lembrete[] lembretes = lembreteDAO.readLembretes();
	    
	    res.status(200);
	    res.type("application/json");
	    return gson.toJson(lembretes);
	}

	
	public Object update(Request req, Response res) {
		
	    lembreteDAO.connect();
	    
	    lembrete = gson.fromJson(req.body(), Lembrete.class);
		lembreteDAO.updateLembrete(lembrete);
		
	    res.status(200);
		return null;
	}

	
	public Object delete(Request req, Response res) {
		
	    lembreteDAO.connect();
		lembrete = lembreteDAO.readLembrete(Integer.parseInt(req.params("reminderid")));
	    
	    if (lembrete != null) {
	        lembreteDAO.deleteLembrete(lembrete);
	        
	        res.status(200);
	        return "Lembrete deletado com sucesso";
	    } else {
	        res.status(404);
	        return "Lembrete não encontrado";
	    }
	}

}