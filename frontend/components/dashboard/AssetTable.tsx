export const AssetTable = ({ assets }: { assets: any[] }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-transparent">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
          <tr>
            <th className="px-6 py-4 font-medium">Asset</th>
            <th className="px-6 py-4 font-medium">Symbol</th>
            <th className="px-6 py-4 font-medium text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {assets.map((asset) => (
            <tr key={asset._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-semibold text-blue-600 dark:text-cyan-400">{asset.name}</td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{asset.symbol}</td>
              <td className="px-6 py-4 text-right font-mono text-green-600 dark:text-emerald-400">{asset.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};