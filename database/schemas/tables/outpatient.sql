CREATE TABLE OutPatient (
    PatientID INT PRIMARY KEY,
    AdmissionDate DATE,
    DischargeDate DATE,
    Gender VARCHAR(10),
    MobileNumber VARCHAR(15),
    Address TEXT,
    OPD_Date DATE,
    DoctorID INT,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);
