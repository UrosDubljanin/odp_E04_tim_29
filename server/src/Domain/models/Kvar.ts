import { reakcijeNaKomentar } from "../enums/reakcijaNaKomentar";
import { statusGreske } from "../enums/statusGreske";


export class Kvar {
  public constructor(
    public id: number = 0,
    public korisnikovId: number = 0,
    public naziv: string = "",
    public opis: string = "",
    public imageUrl: string | null = null,
    public stanBr: string="",
    public status: statusGreske = "Kreiran",
    public datum: string | Date = new Date(),
    public cena: number | null = null,
    public komentar: string | null = null,
    public reakcija: reakcijeNaKomentar | null = null,    
  ){}
}