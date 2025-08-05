import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "@/services/employeeService";

export default function RecordForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    country: "",
    accountType: "",
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isEditMode) return;

    async function fetchEmployee() {
      try {
        const data = await getEmployeeById(Number(id));
        setFormData({
          country: data.country ?? "",
          accountType: data.accountType ?? "",
          username: data.username ?? "",
          lastName: data.lastName ?? "",
          firstName: data.firstName ?? "",
          email: data.email ?? "",
          contactNumber: data.contactNumber ?? "",
        });
        if (data.photoUrl) setPhotoPreview(data.photoUrl);
      } catch (error) {
        console.error("failed to load employee data:", error);
      }
    }
    fetchEmployee();
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (photoFile) {
      form.append("photo", photoFile);
    }

    try {
      if (isEditMode) {
        await updateEmployee(Number(id), form);
      } else {
        await createEmployee(form);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("failed to submit employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formGroupStyle =
    "grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 items-center";

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <Button
        className="bg-neutral-600 text-white"
        onClick={() => navigate("/dashboard")}
      >
        Go back to dashboard
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={formGroupStyle}>
          <Label htmlFor="country">
            Country<span className="text-red-500">*</span>
          </Label>
          <Select
            name="country"
            required
            value={formData.country}
            onValueChange={(value: string) =>
              setFormData((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {["Philippines", "USA", "Canada", "China", "Russia", "Japan"].map(
                (country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="accountType">
            Account Type<span className="text-red-500">*</span>
          </Label>
          <Select
            name="accountType"
            required
            value={formData.accountType}
            onValueChange={(value: string) =>
              setFormData((prev) => ({ ...prev, accountType: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {[
                "Team Member",
                "System Administrator",
                "Business Analyst",
                "QA Tester",
              ].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="username">
            Username<span className="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="lastName">
            Last Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="firstName">
            First Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="email">
            Email<span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroupStyle}>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 items-start">
          <Label htmlFor="photo">Photo (optional)</Label>
          <div className="flex flex-col gap-2">
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPhotoFile(file);
                  setPhotoPreview(URL.createObjectURL(file));
                }
              }}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            disabled={loading}
            type="submit"
            className="bg-blue-600 text-white"
          >
            {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
