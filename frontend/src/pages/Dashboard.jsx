import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Links" value="24" />
        <StatsCard title="Total Clicks" value="1,240" />
        <StatsCard title="Active Today" value="320" />
      </div>

      <LinkForm />

      <div className="mt-6">
        <LinkTable />
      </div>
    </div>
  );
}
