import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { createEmployee } from "@/services/employeeService";

export default function RecordForm() {
  const navigate = useNavigate();
  //   const { id } = useParams();

  //   const isEditMode = Boolean(id);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (photoFile) form.append("photo", photoFile);

    try {
      await createEmployee(form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create employee:", error);
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
          <Select name="country" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Philippines">Philippines</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="China">China</SelectItem>
              <SelectItem value="Russia">Russia</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="accountType">
            Account Type<span className="text-red-500">*</span>
          </Label>
          <Select name="accountType" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Team Member">Team Member</SelectItem>
              <SelectItem value="System Administrator">
                System Administrator
              </SelectItem>
              <SelectItem value="Business Analyst">Business Analyst</SelectItem>
              <SelectItem value="QA Tester">QA Tester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="username">
            Username<span className="text-red-500">*</span>
          </Label>
          <Input id="username" name="username" required />
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="lastName">
            Last Name<span className="text-red-500">*</span>
          </Label>
          <Input id="lastName" name="lastName" required />
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="firstName">
            First Name<span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="email">
            Email<span className="text-red-500">*</span>
          </Label>
          <Input id="email" type="email" name="email" required />
        </div>
        <div className={formGroupStyle}>
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input id="contactNumber" name="contactNumber" />
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
          <Button type="submit" className="bg-blue-600 text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
