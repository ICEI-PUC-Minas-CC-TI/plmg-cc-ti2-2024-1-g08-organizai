package service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatChoice;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatMessage;
import com.azure.ai.openai.models.ChatRole;
import com.azure.core.credential.AzureKeyCredential;
import io.github.cdimascio.dotenv.Dotenv;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class ExtraiCamposTexto {

    private static final Dotenv dotenv = Dotenv.configure().load();

    private static final String azureOpenaiKey = dotenv.get("GPT_ORGANIZAI_KEY");
    private static final String endpoint = dotenv.get("GPT_ORGANIZAI_ENDPOINT");

    public String gerarCamposParaTarefa(String text) {

        OpenAIClient client = new OpenAIClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(azureOpenaiKey))
                .buildClient();

        LocalDate dataAtual = LocalDate.now();

        String diaDaSemana = dataAtual.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.getDefault());

        List<ChatMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatMessage(ChatRole.USER,
                "Na resposta, retorne apenas um JSON com os campos 'deadline', 'title' e 'description', extraídos de uma anotação que será convertida em uma tarefa.\r\n"
                        + //
                        "\r\n" + //
                        "Corrija possíveis erros ortográficos, sem alterar muito a extrutura do texto de origem.\r\n" + //
                        "\r\n" + //
                        "A data deve ser escrita no formato 'yyyy-mm-dd hh:mm'.\r\n" + //
                        "\r\n" + //
                        "IMPORTANTE: NÃO INCLUA QUALQUER TEXTO ALÉM DO JSON NA RESPOSTA.\r\n" + //
                        "\r\n" + //
                        "Tenha em mente que a data atual é: " + dataAtual.format(DateTimeFormatter.ISO_DATE) + " e o dia da semana é" + diaDaSemana + ".\r\n" + //
                        "Texto:\r\n" + text));

        ChatCompletions chatCompletions = client.getChatCompletions("OrganizaiGPTImplantacao",
                new ChatCompletionsOptions(chatMessages));

        StringBuilder response = new StringBuilder();
        for (ChatChoice choice : chatCompletions.getChoices()) {
            ChatMessage message = choice.getMessage();
            response.append(message.getContent()).append("\n");
        }

        String completeResponse = response.toString();

        return completeResponse;
    }
}