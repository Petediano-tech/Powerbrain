'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart";

const chartData = [
  { subject: "Math", score: 88, fill: "var(--color-math)" },
  { subject: "English", score: 92, fill: "var(--color-english)" },
  { subject: "Science", score: 75, fill: "var(--color-science)" },
  { subject: "History", score: 81, fill: "var(--color-history)" },
  { subject: "Chichewa", score: 85, fill: "var(--color-chichewa)" },
];

const chartConfig = {
  score: {
    label: "Score",
  },
  math: {
    label: "Math",
    color: "hsl(var(--chart-1))",
  },
  english: {
    label: "English",
    color: "hsl(var(--chart-2))",
  },
  science: {
    label: "Science",
    color: "hsl(var(--chart-3))",
  },
  history: {
    label: "History",
    color: "hsl(var(--chart-4))",
  },
  chichewa: {
    label: "Chichewa",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;


export function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="subject"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="score" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
