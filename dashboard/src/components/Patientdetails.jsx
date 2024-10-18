import { useState,useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, Clock, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Patientdetails() {
  const { id } = useParams();
  const [patient] = useState({
    id: "1", 
    name: "Test1",
    dob: "01.02.1985",
    gender: "Female",
    age: 37,
    phone: "+44 1632 960097",
    email: "cameron_williamson85@gmail.com",
    address: "4517 Washington Ave. Manchester, Kentucky 39495",
    registrationDate: "12.05.2019",
    lastMeasurements: {
      heartRate: 87,
      bloodPressure: "120/80",
      weight: 64,
      height: 165,
    },
    documents: [
      { name: "Dental X-Ray Result", date: "15.09.2023", type: "image" },
      { name: "Medical Prescriptions", date: "03.08.2023", type: "pdf" },
      { name: "Blood Analyzes", date: "22.07.2023", type: "pdf" },
      { name: "MRI Scan", date: "10.06.2023", type: "image" },
      { name: "Vaccination Record", date: "01.05.2023", type: "pdf" },
    ],
    upcomingAppointment: {
      date: "25.10.2023",
      time: "14:30",
      doctor: "Dr. Emily Johnson",
      type: "Annual Check-up",
    },
    recentVisits: [
      { date: "21.12.2022", doctor: "Jane Cooper", specialty: "Therapist", time: "08:45 - 09:15", duration: "30 min" },
      { date: "10.08.2022", doctor: "Bessie Cooper", specialty: "Dentist", time: "10:05 - 11:45", duration: "1 h 40 min" },
      { date: "02.01.2022", doctor: "Wade Warren", specialty: "Ophthalmologist", time: "13:00 - 13:30", duration: "30 min" },
      { date: "15.11.2021", doctor: "Esther Howard", specialty: "Cardiologist", time: "11:00 - 11:45", duration: "45 min" },
      { date: "03.09.2021", doctor: "Brooklyn Simmons", specialty: "Neurologist", time: "09:30 - 10:15", duration: "45 min" },
    ],
  });

  const [authorizationRequest, setAuthorizationRequest] = useState({
    patientId: id,
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorsNotes: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/patients/${id}`);
        const data = await response.json();
        setPatient(data);
        setAuthorizationRequest({
          patientId: id,
          treatmentType: "",
          insurancePlan: "",
          dateOfService: "",
          diagnosisCode: "",
          doctorsNotes: "",
        });
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);
  const handleAuthorizationSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/authorizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authorizationRequest),
      });

      if (response.ok) {
        setAuthorizationRequest({
          patientId: id,
          treatmentType: "",
          insurancePlan: "",
          dateOfService: "",
          diagnosisCode: "",
          doctorsNotes: "",
        });
        alert('Authorization submitted successfully');
      } else {
        throw new Error("Failed to submit authorization request");
      }
    } catch (error) {
      console.error("Error submitting authorization request:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Pre-Authorization Form</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Prior Authorization Request</DialogTitle>
                <CardDescription>
                  Fill out this form to submit a new prior authorization request for {patient.name}.
                </CardDescription>
              </DialogHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAuthorizationSubmit();
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="treatmentType">Treatment Type</Label>
                    <Input
                      id="treatmentType"
                      value={authorizationRequest.treatmentType}
                      onChange={(e) =>
                        setAuthorizationRequest({ ...authorizationRequest, treatmentType: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurancePlan">Insurance Plan</Label>
                    <Input
                      id="insurancePlan"
                      value={authorizationRequest.insurancePlan}
                      onChange={(e) =>
                        setAuthorizationRequest({ ...authorizationRequest, insurancePlan: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfService">Date of Service</Label>
                    <Input
                      id="dateOfService"
                      type="date"
                      value={authorizationRequest.dateOfService}
                      onChange={(e) =>
                        setAuthorizationRequest({ ...authorizationRequest, dateOfService: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diagnosisCode">Diagnosis Code</Label>
                    <Input
                      id="diagnosisCode"
                      value={authorizationRequest.diagnosisCode}
                      onChange={(e) =>
                        setAuthorizationRequest({ ...authorizationRequest, diagnosisCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorNotes">Doctor's Notes</Label>
                    <Textarea
                      id="doctorNotes"
                      value={authorizationRequest.doctorNotes}
                      onChange={(e) =>
                        setAuthorizationRequest({ ...authorizationRequest, doctorsNotes: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit">Submit Authorization Request</Button>
                </form>
              </CardContent>
            </DialogContent>
          </Dialog>
        </div>

      <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Birth date:</strong> {patient.dob}</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                  <p><strong>Age:</strong> {patient.age}</p>
                  <p><strong>Phone:</strong> {patient.phone}</p>
                </div>
                <div>
                  <p><strong>Email:</strong> {patient.email}</p>
                  <p><strong>Address:</strong> {patient.address}</p>
                  <p><strong>Registration date:</strong> {patient.registrationDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Heart Rate</span>
                    <span className="text-sm font-medium">{patient.lastMeasurements.heartRate} bpm</span>
                  </div>
                  <Progress value={patient.lastMeasurements.heartRate} max={120} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <span className="text-sm font-medium">{patient.lastMeasurements.bloodPressure} mmHg</span>
                  </div>
                  <Progress value={parseInt(patient.lastMeasurements.bloodPressure.split('/')[0])} max={180} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Weight</span>
                    <span className="text-sm font-medium">{patient.lastMeasurements.weight} kg</span>
                  </div>
                  <Progress value={patient.lastMeasurements.weight} max={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Height</span>
                    <span className="text-sm font-medium">{patient.lastMeasurements.height} cm</span>
                  </div>
                  <Progress value={patient.lastMeasurements.height} max={200} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {patient.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className={`mr-3 ${doc.type === 'pdf' ? 'text-red-500' : 'text-blue-500'}`} />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline">View All Documents</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="mr-2 text-primary" />
                  <span className="font-medium">{patient.upcomingAppointment.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="mr-2 text-primary" />
                  <span>{patient.upcomingAppointment.time}</span>
                </div>
                <div className="flex items-center mb-2">
                  <User className="mr-2 text-primary" />
                  <span>{patient.upcomingAppointment.doctor}</span>
                </div>
                <Badge>{patient.upcomingAppointment.type}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="w-1/4 h-screen overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-120px)]">
            {patient.recentVisits.map((visit, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{visit.doctor}</p>
                    <p className="text-sm text-gray-500">{visit.specialty}</p>
                  </div>
                  <Badge variant="outline">{visit.date}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{visit.time} ({visit.duration})</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

