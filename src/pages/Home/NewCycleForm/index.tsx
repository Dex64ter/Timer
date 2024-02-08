import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormContainer, TaskInput, MinutesAmountInput } from './styles';

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// sempre que eu quero trazer uma variável javascript para o typescript usamos o typeof e o nome d variável;

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register("task") }
      />
      
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
        {...register("minutesAmount", {valueAsNumber: true}) }
      />
      <span>minutos</span>
    </FormContainer>
  )
}