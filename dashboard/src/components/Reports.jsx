import { useState,useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"



export default function Reports() {
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const patientsResponse = await fetch('http://localhost:5000/api/authorizations/');
        const patientsData = await patientsResponse.json();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Treatment Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.patientId.name}</TableCell>
              <TableCell>{report.patientId.treatmentPlan}</TableCell>
              <TableCell>{report.requestStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}