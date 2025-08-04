import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  { key: "photo", label: "Photo" },
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "country", label: "Country" },
  { key: "email", label: "Email" },
  { key: "accountType", label: "Account Type" },
  { key: "action", label: "Action" },
] as const;

type ColumnKey = (typeof columns)[number]["key"];

type Row = {
  [K in ColumnKey]?: string;
};

const rows: Row[] = [
  {
    photo: "https://i.pravatar.cc/40?u=1",
    name: "John Doe",
    username: "johnd",
    country: "USA",
    email: "john@example.com",
    accountType: "Admin",
  },
  {
    photo: "https://i.pravatar.cc/40?u=2",
    name: "Jane Smith",
    username: "janes",
    country: "Canada",
    email: "jane@example.com",
    accountType: "User",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-blue-600 text-white gap-2"
          size="sm"
          onClick={() => navigate("/create")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-600"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          Add Employee
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="entries" className="text-sm text-muted-foreground">
              Show
            </label>
            <Select>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Search:</p>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full sm:w-[250px] h-8"
            />
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {col.key === "photo" || col.key === "action" ? (
                    col.label
                  ) : (
                    <div className="flex justify-between items-center gap-1">
                      {col.label}
                      <ArrowUpDown className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="border border-gray-200 px-4 py-2 text-sm"
                  >
                    {col.key === "photo" && row[col.key] ? (
                      <img
                        src={row[col.key]}
                        alt={row.name}
                        className="w-24 h-24 object-cover"
                      />
                    ) : col.key === "action" ? (
                      <>
                        <Button size="sm" className="bg-orange-500 mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                          </svg>
                        </Button>
                        <Button className="bg-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-white"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </Button>
                      </>
                    ) : (
                      row[col.key] ?? "-"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
