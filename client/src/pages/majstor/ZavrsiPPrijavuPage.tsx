import { useParams } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { FinishReportForm } from "../../components/reports/FinishReportForm";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function ZavrsiPrijavuPage({ reportsApi }: Props) {
  const { id } = useParams<{ id: string }>();

  return (
    <main
      className="min-h-screen py-10"
      style={{
        background: "linear-gradient(180deg, #F5F8F5 0%, #E9F4EA 100%)", // zelena krem paleta
      }}
    >
      <div className="max-w-5xl mx-auto w-full px-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-green-900 flex items-center gap-3">
            <ClipboardCheck className="text-green-700" size={28} />
            Rad na prijavi...
          </h1>
        </header>

        <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-100">
          <FinishReportForm reportsApi={reportsApi} reportId={Number(id)} />
        </div>
      </div>
    </main>
  );
}

