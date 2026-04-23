import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import GlassCard from "../components/GlassCard";
import { useParams } from "react-router-dom";

export default function Analytics() {
  const { code } = useParams();

  const data = [
    { day: "Mon", clicks: 40 },
    { day: "Tue", clicks: 90 },
    { day: "Wed", clicks: 60 },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6">Analytics: {code}</h1>

      <GlassCard>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" />
        </LineChart>
      </GlassCard>
    </div>
  );
}
