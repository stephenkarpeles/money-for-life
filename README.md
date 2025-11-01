# Money for Life 💰

A beautiful, interactive compound interest calculator that demonstrates the power of consistent investing over time. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Tax Calculations**: Accurately calculates federal tax, state tax, Social Security, and Medicare based on 2025 tax brackets
- **All 50 States**: Includes tax rates for all US states
- **Investment Visualization**: Interactive graph showing compound growth over 80 years
- **Real-time Updates**: All calculations update instantly as you adjust inputs
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Responsive Design**: Beautiful UI that works on all devices
- **Educational**: Teaches the value of compound interest with clear visualizations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## How to Use

1. **Enter Your Financial Information**:
   - Annual salary
   - Current age
   - Number of dependents
   - State you live in

2. **View Your Net Income**: The calculator shows a detailed breakdown of taxes and your take-home pay

3. **Adjust Investment Percentage**: Use the slider to choose what percentage of your net income you want to invest

4. **See Your Future**: Watch the graph update in real-time to show how your investments could grow over the next 80 years

## Tax Data

The calculator uses 2025 federal tax brackets and state tax rates. Key assumptions:

- **Federal Tax**: Progressive brackets based on IRS 2025 rates
- **Social Security**: 6.2% up to $168,600 wage base
- **Medicare**: 1.45% + 0.9% additional for income over $200,000
- **State Tax**: Simplified flat rates (many states actually use progressive brackets)
- **Standard Deduction**: $14,600 (single filer)
- **Child Tax Credit**: $2,000 per dependent

### Updating Tax Data

Tax rates are located in `/app/utils/taxCalculations.ts`. Update the following as needed:

- `federalBrackets2025Single`: Federal tax brackets
- `standardDeduction2025`: Standard deduction amounts
- `stateTaxRates`: State tax rates (simplified)

## Investment Assumptions

- **Historical Return**: 9% annual return (based on S&P 500 historical average)
- **Compound Frequency**: Annual
- **No inflation adjustment**: Values shown in nominal dollars

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling with dark mode
- **Recharts**: Interactive data visualization
- **React 19**: Latest React features

## Project Structure

```
app/
├── components/
│   ├── Calculator.tsx         # Main calculator component
│   └── InvestmentChart.tsx    # Chart visualization
├── utils/
│   ├── taxCalculations.ts     # Tax calculation logic
│   └── investmentCalculations.ts  # Compound interest calculations
├── globals.css                # Global styles and theme
├── layout.tsx                 # Root layout
└── page.tsx                   # Home page
```

## Disclaimer

This calculator is for educational purposes only. Tax calculations are simplified and may not reflect your actual tax liability. Investment returns are based on historical averages and past performance does not guarantee future results. This is not financial or tax advice. Consult with a qualified financial advisor and tax professional for personalized guidance.

## Future Enhancements

- [ ] Add inflation adjustment toggle
- [ ] Include employer 401(k) matching
- [ ] Multiple investment accounts (Roth IRA, Traditional IRA, 401k)
- [ ] Tax-advantaged account calculations
- [ ] Export results to PDF
- [ ] Integration with real-time tax rate API
- [ ] Additional filing statuses (married, head of household)
- [ ] State-specific deductions and credits

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
