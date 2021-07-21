export interface State {
    state_id: number;
    state_name: string;
  }
  
  export interface RootObjectStates {
    states: State[];
    ttl: number;
  }