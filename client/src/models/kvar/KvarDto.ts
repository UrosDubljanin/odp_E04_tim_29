import type { reakcijeNaKomentar } from "../../types/kvarovi/reakcijaNaKomentar";
import type { statusGreske } from "../../types/kvarovi/statusGreske";


export interface KvarDto {
     id: number,
     korisnikovId: number,
     naziv: string,
     opis: string,
     imageUrl: string | null ,
     stanBr: string,
     status: statusGreske,
     datum: string | Date,
     cena: number | null,
     komentar: string | null,
    reakcija: reakcijeNaKomentar | null  
}
