import { Router } from "express";
import { KvaroviRepository } from "../../Database/repositories/kvarovi/KvaroviRepository";
import { IKvaroviService } from "../../Domain/services/kvarovi/IKvaroviService";
import { KvaroviService } from "../../Services/kvarovi/KvaroviService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";

const repo = new KvaroviRepository();
const service = new KvaroviService(repo);

export class KvarController {
  private router: Router;
  private service: IKvaroviService;
    kreirajKvar: any;

  constructor(service: IKvaroviService) {
    this.router = Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
  
    this.router.post("/kvarovi", authenticate, this.kreirajKvar.bind(this));
    this.router.get("/kvarovi", authenticate, this.kvaroviKorisnika.bind(this));

    this.router.get("/kvarovi/all", authenticate, authorize("majstor"), this.svePrijave.bind(this));
    this.router.get("/kvarovi/:id", authenticate, this.detaljiPrijave.bind(this));

    this.router.put("/reports/:id/accept", authenticate, authorize("majstor"), this.prihvatiPrijavu.bind(this));
    this.router.put("/reports/:id/finish", authenticate, authorize("majstor"), this.zavrsiPrijavu.bind(this));
    this.router.post("/reports/:id/reaction", authenticate, this.dodajReakciju.bind(this));
  }
