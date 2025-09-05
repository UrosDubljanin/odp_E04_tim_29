import { Request, Response, Router } from "express";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { IReactionService } from "../../Domain/services/reactions/IReactionService";

export class ReactionController {
  private router: Router;
  private service: IReactionService;

  constructor(service: IReactionService) {
    this.router = Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/reports/:id/reaction", authenticate, this.dodajReakciju.bind(this));
    this.router.get("/reports/:id/reaction", authenticate, this.getReakcijaKorisnika.bind(this));

  }

  private async dodajReakciju(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const id = Number(req.params.id);
      const { tip } = req.body;

      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }
      if (!tip || !["like", "dislike", "neutral"].includes(tip)) {
        res.status(400).json({ success: false, message: "Nepoznat tip reakcije." });
        return;
      }

      const reaction = await this.service.dodajReakciju(id, user.id, tip);
      if (!reaction) {
        res.status(500).json({ success: false, message: "Nije uspelo čuvanje reakcije." });
        return;
      }
      res.status(201).json({ success: true, data: reaction });
    } catch (err: any) {
      console.error("Error in dodajReakciju:", err);
      res.status(500).json({ success: false, message: err.message || "Greška pri dodavanju reakcije." });
    }
  }

  private async getReakcijaKorisnika(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }
      const reaction = await this.service.getReactionForUser(id, user.id);
      res.status(200).json({ success: true, data: reaction });
    } catch (err: any) {
      console.error("Error in getReakcijaKorisnika:", err);
      res.status(500).json({ success: false, message: err.message || "Greška pri dohvatanju reakcije." });
    }
  }
  public getRouter(): Router {
    return this.router;
  }
}
