export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 flex-grow bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-[100px] bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 w-[60px]">#</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 min-w-[180px]">
                  Name
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[120px]">
                  Price
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[100px]">
                  1h %
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[100px]">
                  24h %
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[100px]">
                  7d %
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[150px]">
                  Market Cap
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[150px]">
                  Volume (24h)
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[180px]">
                  Circulating Supply
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 min-w-[120px]">
                  7D Chart
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 align-middle">
                    <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="space-y-1">
                      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse ml-auto" />
                      <div className="h-1.5 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}