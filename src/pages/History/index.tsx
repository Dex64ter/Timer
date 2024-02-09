import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CycleContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <pre>
        {
          JSON.stringify(cycles, null, 2)
        }
      </pre>

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
              <td>
                <Status statusColor="yellow">
                  Em andamento
                </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">
                  Em andamento
                </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">
                  Em andamento
                </Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">
                  Em andamento
                </Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}