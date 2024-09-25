"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { tooltipStyles } from "@/app/constants/rechartsStyles";
import { PokemonTypeDistribution } from "@/app/types/pokemon";

type PokemonTypeDistributionChartProps = {
  typeDistribution: PokemonTypeDistribution;
};

const COLORS = ["#f00000", "white"];
const INNER_RADIUS = 60;
const OUTER_RADIUS = 150;

const PokemonTypeDistributionChart: React.FC<
  PokemonTypeDistributionChartProps
> = ({ typeDistribution }) => {
  const data = [
    { name: "Single-type", value: typeDistribution.single },
    { name: "Dual-type", value: typeDistribution.dual },
  ];

  return (
    <>
      <h2 className="text-xl text-center mb-8 mt-4">
        Single-type vs Dual-type Pokémon Distribution
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip {...tooltipStyles} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PokemonTypeDistributionChart;
