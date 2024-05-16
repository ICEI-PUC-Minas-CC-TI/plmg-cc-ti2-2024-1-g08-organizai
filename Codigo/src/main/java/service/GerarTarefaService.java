package service;

import spark.Request;
import spark.Response;


public class GerarTarefaService {

	private static ExtraiTexto extraiTexto = new ExtraiTexto();
	private static ExtraiCamposTexto extraiCampos = new ExtraiCamposTexto();

	public Object generate(Request req, Response res) {
		try {
			byte[] imageData = req.bodyAsBytes();
			
			String extractedText = extraiTexto.extrairTextoDaImagem(imageData);
			if (extractedText == null) {
				throw new NullPointerException("Extracted text is null");
			}
			
			String camposExtraidos = extraiCampos.gerarCamposParaTarefa(extractedText);
			if (camposExtraidos == null) {
				throw new NullPointerException("Generated fields are null");
			}
			
			res.status(201);
			return camposExtraidos;
		} catch (Exception e) {
			res.status(500);
			return "An error occurred: " + e.getMessage();
		}
	}
}
