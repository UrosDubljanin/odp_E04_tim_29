import { PrijaviKvarForma } from "../../components/reports/PrijaviKvarForma";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function PrijaviKvarPage({ reportsApi }: Props) {
  return (
  <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 px-4 py-8">
    <div className="w-full max-w-3xl bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-green-200 p-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
        Prijava kvara
      </h1>
      <PrijaviKvarForma reportsApi={reportsApi} />
    </div>
  </main>
);

}
