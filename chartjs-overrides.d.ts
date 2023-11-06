// chartjs-overrides.d.ts
declare module 'chart.js' {
  // Extend the ChartDataSets interface
  interface ChartDataSets {
    backgroundColor?: string | string[];
    hoverBackgroundColor?: string | string[];
    // ... other properties
  }
}
