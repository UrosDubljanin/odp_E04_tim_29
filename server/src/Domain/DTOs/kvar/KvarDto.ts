import { statusGreske } from "../../enums/statusGreske";

export class KvarDto {
 public constructor(
    public id: number = 0,
    public korisnikovId: number = 0,
    public commentId: number | null = null,
    public naziv: string = "",
    public opis: string = "",
    public imageUrl: string | null = null,
    public status: statusGreske = "Kreiran",
    public datum: string | Date = new Date(),
    public komentar: string | null = null,
    public cena: number | null = null,
  ){}
}
