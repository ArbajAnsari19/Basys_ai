import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPatient, setNewPatient] = useState({ name: "", age: "", medicalHistory: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of patients from the API
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/patients');
        const data = await response.json();
        setPatients(data.patients); // Assuming the API returns { patients: [...] }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);



  const handleAddPatient = async () => {
    const newPatientData = {
      name: newPatient.name,
      age: parseInt(newPatient.age),
      medicalHistory: newPatient.medicalHistory,
    };

    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatientData),
      });

      if (response.ok) {
        const addedPatient = await response.json();
        setPatients([...patients, addedPatient]); // Update patients list with the newly added patient
        setNewPatient({ name: "", age: "", medicalHistory: "" });
      } else {
        console.error('Failed to add patient:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  if (isLoading) {
    return <div>Loading patients...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="medicalHistory" className="text-right">
                  Medical History
                </Label>
                <Input
                  id="medicalHistory"
                  value={newPatient.medicalHistory}
                  onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Input
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Medical History</TableHead>
            <TableHead>More Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.medicalHistory}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/patient-details/${patient._id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
