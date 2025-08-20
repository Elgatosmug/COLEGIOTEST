import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

// Temas
const THEMES = { light: "", dark: ".dark" };

function ChartStyle({ id, config }) {
  if (!config) return null;

  const colorConfig = Object.entries(config).filter(
    ([_, itemConfig]) => itemConfig.theme || itemConfig.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
}

// Tooltip
const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(
  ({ active, payload, className, hideLabel, hideIndicator, indicator, label, labelFormatter }, ref) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {/* Aquí iría la lógica para mostrar payload y label */}
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltip";

// Legend
const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(({ className, payload, hideIcon }, ref) => {
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          {!hideIcon && <div className="h-2 w-2 shrink-0 rounded-[2px]" />}
          {item.name}
        </div>
      ))}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegend";

export { ChartStyle, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };
