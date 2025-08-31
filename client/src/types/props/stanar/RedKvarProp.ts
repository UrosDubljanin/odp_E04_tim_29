import type { Kvar } from "../../../models/kvar/Kvar";


export type RedKvarProps = {
    kvar: Kvar;
    onLike: (id: number) => void;
};