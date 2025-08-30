

export class Kvar {
  id: number = 0;
  korisnikovId: number = 0;
  commentId?: number | null = null;
  naziv: string = "";
  opis: string = "";
  imageUrl?: string | null = null;
  status: string = "Kreiran";
  datum: string | Date = new Date();
  komentar?: string | null = null;
  cena?: number | null = null;
}