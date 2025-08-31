import { UserUloge } from "../../enums/UserUloge";

export class UserAuthDataDto {
   public constructor(
        public id: number = 0,
        public korisnickoIme: string = '',
        public uloga: UserUloge = 'stanar'
    ) {}
}