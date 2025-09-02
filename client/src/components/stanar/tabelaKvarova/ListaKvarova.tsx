import type { KvarDto } from "../../../models/kvar/KvarDto";
import { RedKvara } from "./RedKvara";

interface Props {
  kvar : KvarDto[]
}

export default function ListaKvarova({ kvar }: Props) {
    
    return (
        <>
            {kvar ? (kvar.map((k) => (
            <RedKvara key={k.id} kvar={k} />
            ))) : "Nema kvarova"}
        </>
  );
}