package service;
import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.BinaryData;
import com.azure.core.util.polling.SyncPoller;

import io.github.cdimascio.dotenv.Dotenv;

public class ExtraiTexto {

    private static final Dotenv dotenv = Dotenv.configure().load();

    private static final String endpoint = dotenv.get("OCR_ORGANIZAI_ENDPOINT");
    private static final String key = dotenv.get("OCR_ORGANIZAI_KEY");

    public String extrairTextoDaImagem(byte[] dadosImagem) {
        DocumentAnalysisClient cliente = new DocumentAnalysisClientBuilder()
            .credential(new AzureKeyCredential(key))
            .endpoint(endpoint)
            .buildClient();

        SyncPoller<OperationResult, AnalyzeResult> pollerResultadoAnaliseLayout =
            cliente.beginAnalyzeDocument("prebuilt-layout", BinaryData.fromBytes(dadosImagem));

        AnalyzeResult resultadoAnaliseLayout = pollerResultadoAnaliseLayout.getFinalResult();

        StringBuilder textoExtraido = new StringBuilder();

        resultadoAnaliseLayout.getPages().forEach(paginaDocumento -> {
            paginaDocumento.getWords().forEach(palavraDocumento ->
                textoExtraido.append(palavraDocumento.getContent()).append(" "));
        });

        return textoExtraido.toString();
    }
}
