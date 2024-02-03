import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>Em andamento</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>Em andamento</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>Em andamento</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>Em andamento</td>
            </tr>
          </tbody>
          <tr>

          </tr>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}