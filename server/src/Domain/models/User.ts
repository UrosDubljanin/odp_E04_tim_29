export class User {
  public constructor(
    public id: number = 0,
    public korisnickoIme: string = '',
    public uloga: string = 'stanar',
    public lozinka: string = '',
    public ime: string ='',
    public prezime: string='',
    public godine: number =0
  ) {}
}