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
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleID: action.payload.newCycle.id
      }

    case ActionTypes.INTERRUPT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {          
            return { ...cycle, interruptDate: new Date()}
          }else {
            return cycle
          }
        }),
        activeCycleID: null
      }

    case ActionTypes.MARK_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {          
            return { ...cycle, finishedDate: new Date()}
          }else {
            return cycle
          }
        }),
        activeCycleID: null,
      }

    default:
      return state
  }
}

export { ActionTypes }
