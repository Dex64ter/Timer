import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task" >Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Dê um nome para seu projeto" list="task-suggestions"/>

          <datalist id="task-suggestions">
            <option value="Trabalhar no projeto" />
            <option value="Estudar tecnologia" />
            <option value="Trabalhar no TCC" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={0}
            
          />
          <span>minutos</span>
        </FormContainer>
        
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>

    </HomeContainer>
  );
}