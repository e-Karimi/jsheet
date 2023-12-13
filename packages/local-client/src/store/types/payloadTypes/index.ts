import { CellType, Cell } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellPayload {
  id: string;
  direction: Direction;
}
export interface DeleteCellPayload {
  id: string;
}
export interface InsertCellAfterPayload {
  id: string | null;
  type: CellType;
}

export interface UpdateCellPayload {
  id: string;
  content: string;
}

export interface BundleCompletePayload {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
}

export interface fetchCellsPayload {
  data: Cell[];
  err: string;
}

export type Payloads =
  | MoveCellPayload
  | DeleteCellPayload
  | InsertCellAfterPayload
  | UpdateCellPayload
  | BundleCompletePayload
  | fetchCellsPayload;
