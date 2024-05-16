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
		int userid = req.session().attribute("userid");

		lembrete.setUsuarioID(userid);
	    lembreteDAO.createLembrete(lembrete);
	    
	    res.status(201);

		return "Lembrete criado com sucesso";
	}
	
	
	public Object read(Request req, Response res) {
		
	    lembreteDAO.connect();
		int reminderid = Integer.parseInt(req.params("reminderid"));
		
		Lembrete lembrete = lembreteDAO.readLembrete(reminderid);
	    
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
		int userid = req.session().attribute("userid");

	    Lembrete[] lembretes = lembreteDAO.readLembretes(userid);
	    
	    res.status(200);
	    res.type("application/json");
	    return gson.toJson(lembretes);
	}

	
	public Object update(Request req, Response res) {
		
	    lembreteDAO.connect();
	    
	    lembrete = gson.fromJson(req.body(), Lembrete.class);
		lembreteDAO.updateLembrete(lembrete);
		
	    res.status(200);
		return "Lembrete atualizado com sucesso";
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
