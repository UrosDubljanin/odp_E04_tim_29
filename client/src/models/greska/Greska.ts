

export class Greska {
  id: number = 0;
  userId: number = 0;
  commentId?: number | null = null;
  name: string = "";
  description: string = "";
  imageUrl?: string | null = null;
  status: string = "Kreiran";
  createdAt: string | Date = new Date();
  comment?: string | null = null;
  price?: number | null = null;
}