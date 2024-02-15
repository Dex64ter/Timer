import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from "date-fns/locale/pt-BR";

export function History() {
  const { cycles } = useContext(CycleContext)

  function timePassedToDate(date: Date){
    const timePassed = formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR
    })
    return timePassed
  }

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
            {
              cycles.map((cycle) => {
                return (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>{ timePassedToDate(cycle.startDate) }</td>
                    <td>
                      {
                        cycle.finishedDate && <Status statusColor="green"> Concluído </Status>
                      }
                      {
                        cycle.interruptDate && <Status statusColor="red"> Interrompido </Status>
                      }
                      {
                        (!cycle.finishedDate && !cycle.interruptDate) && <Status statusColor="yellow"> Em andamento </Status>
                      }
                    </td>
                  </tr>
                )
              })
            }    
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}