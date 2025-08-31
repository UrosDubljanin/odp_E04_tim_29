import type { KvaroviStatus } from "./KvaroviStatus";

export class Kvar {
  
    public id: number = 0;
    public korisnikovId: number = 0;
    public commentId: number | null = null;
    public naziv: string = "";
    public opis: string = "";
    public imageUrl: string | null = null;
    public status: KvaroviStatus = "Kreiran";
    public datum: string | Date = new Date();
    public komentar: string | null = null;
    public cena: number | null = null;
}