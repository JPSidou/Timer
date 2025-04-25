import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";



export function NewCycleForm(){

  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  // infer: infere o tipo do objeto, ou seja, pega o tipo do objeto e transforma em um tipo do typescript.
  
    return(
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" list="taskSuggestion" id="task" placeholder="Dê um nome ao seu projeto" {...register('task')} disabled={!!activeCycle}/>

          <datalist id="taskSuggestion">
            <option value="projeto 1"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput  type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', {valueAsNumber: true})} disabled={!!activeCycle}/>

          <span>minutos.</span>
        </FormContainer>
    )
}