package service;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
// import spark.Spark.*;

public class UsuarioService {

	private UsuarioDAO usuarioDAO = new UsuarioDAO();
	private Usuario usuario = null;
	Gson gson = new Gson();
	
	public Object create(Request req, Response res) {
		
		usuarioDAO.connect();
	    
	    usuario = gson.fromJson(req.body(), Usuario.class);
	    usuarioDAO.createUsuario(usuario);
	    
	    res.status(201);

	    return null;
	}
	
	
	public Object read(Request req, Response res) {
		
	    usuarioDAO.connect();
		int numeroAtomico = Integer.parseInt(req.params("userid"));
		
		Usuario usuario = usuarioDAO.readUsuario(numeroAtomico);
	    
	    if (usuario != null) {

	        res.status(200);
			res.type("application/json");
			return gson.toJson(usuario);
	    } else {

	        res.status(404);
	        return "Usuario não encontrado";
	    }
	}

	
	public Object readAll(Request req, Response res) {
		
	    usuarioDAO.connect();
	    Usuario[] usuarios = usuarioDAO.readUsuarios();
	    
	    res.status(200);
	    res.type("application/json");
	    return gson.toJson(usuarios);
	}

	
	public Object update(Request req, Response res) {
		
	    usuarioDAO.connect();
	    
	    usuario = gson.fromJson(req.body(), Usuario.class);
		usuarioDAO.updateUsuario(usuario);
		
	    res.status(200);
		return null;
	}

	
	public Object delete(Request req, Response res) {
		
	    usuarioDAO.connect();
		usuario = usuarioDAO.readUsuario(Integer.parseInt(req.params("userid")));
	    
	    if (usuario != null) {
	        usuarioDAO.deleteUsuario(usuario);
	        
	        res.status(200);
	        return "Usuario deletado com sucesso";
	    } else {
	        res.status(404);
	        return "Usuario não encontrado";
	    }
	}

}
