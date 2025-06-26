export function Table({ children }) {
  return <table className="w-full table-auto border-collapse border border-gray-300">{children}</table>;
}
export function TableHead({ children }) {
  return <th className="border border-gray-300 bg-gray-100 p-2">{children}</th>;
}
export function TableHeader({ children }) {
  return <thead>{children}</thead>;
}
export function TableRow({ children }) {
  return <tr>{children}</tr>;
}
export function TableCell({ children }) {
  return <td className="border border-gray-300 p-2">{children}</td>;
}
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
