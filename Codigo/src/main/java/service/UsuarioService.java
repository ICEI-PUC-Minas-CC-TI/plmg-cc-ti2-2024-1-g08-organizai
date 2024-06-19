package service;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;

public class UsuarioService {

	private UsuarioDAO usuarioDAO = new UsuarioDAO();
	private Usuario usuario = null;
	Gson gson = new Gson();
	
	public Object create(Request req, Response res) {
		
		usuarioDAO.connect();
	    
		usuario = new Usuario();
		usuario.setNome(req.queryParams("nome"));
		usuario.setEmail(req.queryParams("email"));
		usuario.setSenha(req.queryParams("senha"));

		if(usuarioDAO.createUsuario(usuario))
		{
			login(req, res);
		}
		else
		{
			res.redirect("/pages/cadastro.html#error");
		}

	    res.status(201);

	    return null;
	}
	
	public Object read(Request req, Response res) {
		
	    usuarioDAO.connect();
		int userid = req.session().attribute("userid");
		
		Usuario usuario = usuarioDAO.readUsuario(userid);
	    
	    if (usuario != null) {

	        res.status(200);
			res.type("application/json");
			return gson.toJson(usuario);
	    } else {

	        res.status(404);
	        return "Usuario não encontrado";
	    }
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
		usuario = req.session().attribute("userid");
	    
	    if (usuario != null) {
	        usuarioDAO.deleteUsuario(usuario);
	        
	        res.status(200);
	        return "Usuario deletado com sucesso";
	    } else {
	        res.status(404);
	        return "Usuario não encontrado";
	    }
	}

	public Object login(Request req, Response res) {

		usuarioDAO.connect();

		usuario = new Usuario();
		usuario.setEmail(req.queryParams("email"));
		usuario.setSenha(req.queryParams("senha"));

		if(usuarioDAO.login(usuario) != null)
		{
			req.session().attribute("userid", usuarioDAO.login(usuario).getUsuarioID());
			res.redirect("/pages/home.html");
		}
		else
		{
			res.redirect("/pages/index.html#notfound");
		}

		return null;
	}
}
