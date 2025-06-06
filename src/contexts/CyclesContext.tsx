import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface createCycleData{
    task: string;
    minutesAmount: number;
}



interface CyclesContextData{
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  creatNewCycle: (data: createCycleData) => void;
  interruptCurrentCycle:() => void;
}

interface CyclesContextProviderProps{
    children: ReactNode;
}


export const CyclesContext = createContext ({} as CyclesContextData )

export function CyclesContextProvider({children}: CyclesContextProviderProps){

  //useReduce: permite manipular o estado de forma mais complexa, como adicionar, remover ou atualizar itens em um array.
  const [ cyclesState, dispatch ] = useReducer(
    cyclesReducer, 
    {
      cycles: [],
      activeCycleId: null
    },(initialState) =>{
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
      if(storedStateAsJSON){
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  );

  const{ cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(()=>{
    if(activeCycle){
      return differenceInSeconds(new Date(), new Date((activeCycle.startDate)));
    }
    return 0
  });


  useEffect(()=>{
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
      }, [cyclesState])

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds);
  }

  function markCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishedAction())
  }
  
    function creatNewCycle(data: createCycleData) {
  
      const newCycle: Cycle = {
        id: String(new Date().getTime()),
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      }
      dispatch(addNewCycleAction(newCycle));
      setAmountSecondsPassed(0);

    }
  
    function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
    }

    return(
        <CyclesContext.Provider 
        value={{
            activeCycle,
            activeCycleId,
            markCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            creatNewCycle,
            interruptCurrentCycle,
            cycles,
            }}
        >
        {children}
        </CyclesContext.Provider>
    )
    
}