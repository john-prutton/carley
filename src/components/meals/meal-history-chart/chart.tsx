"use client"

import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from "recharts"
import {
  NameType,
  ValueType
} from "recharts/types/component/DefaultTooltipContent"

import { FoodItemTotals } from "@/lib/core/domain/entities/MealBreakdown"

import { colorMap } from "./utils"

function areaChartWithLinearGradient({
  dataKey,
  topColor,
  bottomColor
}: {
  dataKey: string
  topColor: string
  bottomColor: string
}) {
  return {
    defs: (
      <linearGradient id={dataKey} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="currentColor" className={topColor} />
        <stop offset="100%" stopColor="currentColor" className={bottomColor} />
      </linearGradient>
    ),
    graph: (
      <Area
        type={"monotone"}
        dataKey={dataKey}
        stackId="1"
        yAxisId="grams-y-axis"
        stroke="transparent"
        fill={`url(#${dataKey})`}
      />
    )
  }
}

const areaCharts = (() => {
  const targets = ["fats", "carbohydrates", "proteins"] as Array<
    keyof FoodItemTotals
  >

  const charts = targets
    .map((dataKey) => ({
      key: dataKey,
      ...areaChartWithLinearGradient({
        dataKey,
        ...colorMap.get(dataKey)!
      })
    }))
    .reduce(
      (acc, linearAreaGraph) => ({
        defs: [
          ...acc.defs,
          { ...linearAreaGraph.defs, key: `def_${linearAreaGraph.key}` }
        ],
        graphs: [
          ...acc.graphs,
          { ...linearAreaGraph.graph, key: `graph_${linearAreaGraph.key}` }
        ]
      }),
      { defs: [], graphs: [] } as { defs: JSX.Element[]; graphs: JSX.Element[] }
    )

  return (
    <>
      <defs>{charts.defs}</defs>
      {charts.graphs}
      <YAxis yAxisId="grams-y-axis">
        <Label
          angle={-90}
          position="insideLeft"
          style={{ textAnchor: "middle" }}
        >
          Macros (g)
        </Label>
      </YAxis>
    </>
  )
})()

const lineChart = (
  <>
    <Line
      dataKey="calories"
      yAxisId="calories-y-axis"
      stroke="currentColor"
      className={colorMap.get("calories")?.topColor}
    />
    <YAxis yAxisId="calories-y-axis" orientation="right">
      <Label angle={90} position="insideRight" style={{ textAnchor: "middle" }}>
        Calories (kcal)
      </Label>
    </YAxis>
  </>
)

export function Chart({
  data
}: {
  data: Array<FoodItemTotals & { date: string }>
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        {areaCharts}
        {lineChart}

        <CartesianGrid />
        <XAxis dataKey="date" tickMargin={10} height={50} />
        <Brush height={20} />
        <Tooltip content={<CustomTooltip />} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

function CustomTooltip({
  active,
  payload,
  label
}: TooltipProps<ValueType, NameType>) {
  if (!(active && payload && payload.length)) return null

  return (
    <div className="rounded-md bg-background p-2 text-foreground">
      <p>{label}</p>

      {payload.toReversed().map((entry) => (
        <p
          key={entry.dataKey}
          className={
            colorMap.get(entry.dataKey as keyof FoodItemTotals)?.topColor
          }
        >
          {entry.dataKey!.toString()[0].toUpperCase() +
            entry.dataKey!.toString().substring(1)}
          : {entry.value} {entry.dataKey === "calories" ? "kcal" : "g"}
        </p>
      ))}
    </div>
  )
}
