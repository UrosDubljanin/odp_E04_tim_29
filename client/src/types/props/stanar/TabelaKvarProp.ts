import type { Kvar } from "../../../models/kvar/Kvar";


export type TabelaKvarProps = {
  items: Kvar[];
  onAddNew: () => void;
  onLike: (id: number) => void;
};
