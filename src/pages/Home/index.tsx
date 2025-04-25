import { HandPalm, Play } from "phosphor-react";
// biblioteca para manipular datas
// * usado pq zod n possui um exprt default, então usamos o * para pegar tudo que tem dentro do zod e depois pegamos o que precisamos.

import * as zod from 'zod';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

// controlled: quando temos as informações do usuário atualizadas em tempo real. Monitorar as atualizações de valores e salva-las.

// uncontrolled: busca a informação do usuário apenas quando precisarmos dela.



const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;


export function Home() {

  const { activeCycle, creatNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

  //register: recebe o nome do input e retorna várias funções para manipular o input.

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      minutesAmount: 0,
      task: '',
    }
  });


  const  { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData){
    creatNewCycle(data);
    reset()
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
        
        <CountDown/>
      

        {activeCycle? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24}/>
            Interromper
          </StopCountDownButton>
            ): (
            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24}/>
              Começar
            </StartCountDownButton>
            )}

      </form>
    </HomeContainer>
  );
}