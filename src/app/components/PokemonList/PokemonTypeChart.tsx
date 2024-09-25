"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Button } from "@/components/ui/button";
import { POKEMON_TYPE_COLORS } from "@/app/constants/pokemonTypeColors";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { tooltipStyles } from "@/app/constants/rechartsStyles";

type PokemonTypeChartProps = {
  typeCount: Record<string, number>;
};

const PokemonTypeChart: React.FC<PokemonTypeChartProps> = ({ typeCount }) => {
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);
  const [showPercentages, setShowPercentages] = useState<boolean>(false);

  const totalCount = useMemo(
    () => Object.values(typeCount).reduce((a, b) => a + b, 0),
    [typeCount]
  );

  // Sort the data by count in descending order
  const sortedData = useMemo(() => {
    return Object.entries(typeCount)
      .map(([name, count]) => ({
        capitalizedName: capitalizeFirstLetter(name),
        count,
        percentage: (count / totalCount) * 100,
        name: name,
      }))
      .sort((a, b) => b.count - a.count);
  }, [typeCount, totalCount]);

  const gradients = useMemo(
    () =>
      sortedData.map((entry) => (
        <linearGradient
          key={`gradient-${entry.name}`}
          id={`gradient-${entry.name}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={POKEMON_TYPE_COLORS[entry.name] || "#8884d8"}
            stopOpacity={0.8}
          />
          <stop
            offset="100%"
            stopColor={POKEMON_TYPE_COLORS[entry.name] || "#8884d8"}
            stopOpacity={0.4}
          />
        </linearGradient>
      )),
    [sortedData]
  );

  const cells = useMemo(
    () =>
      sortedData.map((entry) => (
        <Cell
          key={`cell-${entry.name}`}
          fill={`url(#gradient-${entry.name})`}
        />
      )),
    [sortedData]
  );

  return (
    <>
      <h2 className="text-xl text-center mb-8">Pokémon Count By Type</h2>

      <div className="flex mb-8 space-x-4">
        <Button
          variant="outline"
          className="rounded"
          onClick={() => setShowGuidelines(!showGuidelines)}
        >
          {showGuidelines ? "Hide Guidelines" : "Show Guidelines"}
        </Button>

        <Button
          variant="outline"
          className="rounded"
          onClick={() => setShowPercentages(!showPercentages)}
        >
          {showPercentages ? "Show Counts" : "Show Percentages"}
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData}>
          <defs>{gradients}</defs>
          {showGuidelines && (
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          )}
          <XAxis
            dataKey="capitalizedName"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fill: "#fff", fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: "#fff", fontSize: 12 }}
            width={40}
            allowDecimals={false}
            domain={showPercentages ? [0, 100] : [0, "auto"]}
          />
          <Tooltip {...tooltipStyles} />
          <Bar
            dataKey={showPercentages ? "percentage" : "count"}
            animationDuration={400}
            animationEasing="ease-out"
          >
            {cells}
            <LabelList
              dataKey={showPercentages ? "percentage" : "count"}
              position="top"
              style={{ fill: "#fff", fontSize: 14, fontWeight: "bold" }}
              formatter={(value: number) =>
                showPercentages ? `${value.toFixed(1)}%` : value
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PokemonTypeChart;
