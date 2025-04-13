CREATE TABLE InPatient (
    PatientID INT PRIMARY KEY,
    AdmissionID INT,
    AdmissionDate DATE,
    DischargeDate DATE,
    RoomNumber INT,
    Gender VARCHAR(10),
    MobileNumber VARCHAR(15),
    Address TEXT,
    DoctorID INT,
    FOREIGN KEY (RoomNumber) REFERENCES Room(RoomNumber),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);
