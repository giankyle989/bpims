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
import { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "@/services/employeeService";
import No_Image_available from "@/assets/No_Image_Available.jpg";
const columns = [
  { key: "photo", label: "Photo" },
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "country", label: "Country" },
  { key: "email", label: "Email" },
  { key: "accountType", label: "Account Type" },
  { key: "action", label: "Action" },
] as const;

type Employee = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  accountType: string;
  photo?: string;
};
export default function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchEmploye = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("failed to fetch employees:", err);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    await fetchEmploye();
  };
  useEffect(() => {
    fetchEmploye();
  }, []);
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

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="border px-4 py-2 text-sm font-medium"
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
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} className="border px-4 py-2 text-sm">
                    {col.key === "photo" ? (
                      emp.photo ? (
                        <img
                          src={emp.photo}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = No_Image_available;
                          }}
                          className="max-w-[100px] max-h-[100px] object-cover"
                        />
                      ) : (
                        <img
                          src={No_Image_available}
                          className="max-w-[100px] max-h-[100px] object-cover"
                        />
                      )
                    ) : col.key === "name" ? (
                      `${emp.firstName} ${emp.lastName}`
                    ) : col.key === "action" ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-orange-500 mr-2"
                          onClick={() => navigate(`/update/${emp.id}`)}
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                          </svg>
                        </Button>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDelete(emp.id)}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="white"
                            viewBox="0 0 24 24"
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
                      emp[col.key as keyof Employee] ?? "-"
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
