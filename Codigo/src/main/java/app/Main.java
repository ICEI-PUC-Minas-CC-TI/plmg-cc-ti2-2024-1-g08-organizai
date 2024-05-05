package app;

import static spark.Spark.*;

import service.LembreteService;
import service.TarefaService;
import service.UsuarioService;

public class Main {
	
	private static UsuarioService usuarioService = new UsuarioService();
	private static TarefaService tarefaService = new TarefaService();
	private static LembreteService lembreteService = new LembreteService();
	
	public static void main(String args[]) {


		options("/*", (req, res) -> {
            String accessControlRequestHeaders = req.headers("Access-Control-Request-Headers");

            if (accessControlRequestHeaders != null) {
                res.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = req.headers("Access-Control-Request-Method");

            if (accessControlRequestMethod != null) {
                res.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
			
            return "OK";
        });

		before((req, res) -> {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "*");
			res.type("application/json");
		});
		
		post("/usuarios", (req,res) -> usuarioService.create(req, res));
		get ("/usuarios", (req, res) -> usuarioService.readAll(req, res));
		get ("/usuarios/:userid", (req, res) -> usuarioService.read(req, res));
		put ("/usuarios/update", (req, res) -> usuarioService.update(req, res));
		get ("/usuarios/delete/:userid", (req, res) -> usuarioService.delete(req, res));

		post("/tarefas", (req,res) -> tarefaService.create(req, res));
		get ("/tarefas", (req, res) -> tarefaService.readAll(req, res));
		get ("/tarefas/:taskid", (req, res) -> tarefaService.read(req, res));
		put ("/tarefas/update", (req, res) -> tarefaService.update(req, res));
		get ("/tarefas/delete/:taskid", (req, res) -> tarefaService.delete(req, res));

		post("/lembretes", (req,res) -> lembreteService.create(req, res));
		get ("/lembretes", (req, res) -> lembreteService.readAll(req, res));
		get ("/lembretes/:reminderid", (req, res) -> lembreteService.read(req, res));
		put ("/lembretes/update", (req, res) -> lembreteService.update(req, res));
		get ("/lembretes/delete/:reminderid", (req, res) -> lembreteService.delete(req, res));
	}
}
