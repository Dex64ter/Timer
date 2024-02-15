import { produce } from 'immer'
import { ActionTypes } from "./actions"

export interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[],
  activeCycleID: string | null,
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch(action.type){
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleID: action.payload.newCycle.id
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CYCLE: {
      const interruptedCycleId = state.cycles.findIndex((cycle) => {return cycle.id === state.activeCycleID})
      if (interruptedCycleId < 0) {
        return state
      }
      return produce(state, (draft) => {      
        draft.activeCycleID = null
        draft.cycles[interruptedCycleId].interruptDate = new Date()
      })
    
    }
    case ActionTypes.MARK_CYCLE_AS_FINISHED:{
      const interruptedCycleId = state.cycles.findIndex((cycle) => {return cycle.id === state.activeCycleID})
      if (interruptedCycleId < 0) {
        return state
      }
      return produce(state, (draft) => {      
        draft.activeCycleID = null
        draft.cycles[interruptedCycleId].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}

export { ActionTypes }
