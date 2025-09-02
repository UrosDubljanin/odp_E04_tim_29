import type { IKvarAPIService } from "../../api_services/kvarovi/IKvarAPIService";
import DodajKvar from "../../components/stanar/dodajKvar/DodajKvar";

interface Props {
  kvarApi: IKvarAPIService;
}

export default function DodajKvarPage({ kvarApi }: Props) {
  return (
    <main className="page-wrapper">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2"> 
        Prijavi kvar
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <DodajKvar kvarApi={kvarApi} />
      </div>
    </main>
  );
}