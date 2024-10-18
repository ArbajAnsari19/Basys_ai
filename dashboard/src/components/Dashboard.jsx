import{useState,useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';


const Dashboard = () => {

  const [totalPatients, setTotalPatients] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [pending, setpending] = useState(0);
  const [patients, setPatients] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total patients
        const patientsResponse = await fetch('http://localhost:5000/api/patients/');
        const patientsData = await patientsResponse.json();
        setTotalPatients(patientsData.totalPatients);
        setPatients(patientsData.patients.slice(0, 5));

        // Fetch total reports
        const reportsResponse = await fetch('http://localhost:5000/api/authorizations/');
        const reportsData = await reportsResponse.json();
        setTotalReports(reportsData.length);
        const PendingReports = reportsData.filter(report => report.requestStatus === 'pending').length;
        setpending(PendingReports);

        setChartData([
          { month: 'Jan', patientVisits: 2 },
          { month: 'Feb', patientVisits: 5 },
          { month: 'Mar', patientVisits: 8 },
          { month: 'Apr', patientVisits: 4 },
          { month: 'May', patientVisits: 6 },
          { month: 'Jun', patientVisits: 9 },
          { month: 'Jul', patientVisits: 1 },
          { month: 'Aug', patientVisits: 3 },
          { month: 'Sep', patientVisits: 0 },
          { month: 'Oct', patientVisits: 8 },
          { month: 'Nov', patientVisits: 7 },
          { month: 'Dec', patientVisits: 9 },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Healthcare Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">+180 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 0-2 2h-3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports}</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications Requested</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pending}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications Approved</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports-pending}</div>
              <p className="text-xs text-muted-foreground">+7% from last week</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.medicalHistory}</TableCell>
                      <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/patient-details/${patient.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Patient Visits Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="patientVisits" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Dashboard;