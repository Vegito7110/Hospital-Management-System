-- CREATE DATABASE hospital;
USE hospital;
-- CREATE TABLE Staff (
--     StaffID INT PRIMARY KEY,
--     FirstName VARCHAR(50),
--     Surname VARCHAR(50),
--     Designation VARCHAR(50),
--     Address TEXT,
--     MobileNumber VARCHAR(15)
-- );
CREATE TABLE Doctor (
    DoctorID INT PRIMARY KEY,
    Name VARCHAR(100),
    Specialization VARCHAR(100),
    MobileNumber VARCHAR(15),
    Cabin VARCHAR(10),
    Address TEXT
);
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
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);
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
CREATE TABLE Room (
    RoomNumber INT PRIMARY KEY,
    RoomCost DECIMAL(10, 2),
    Vacant BOOLEAN,
    InPatientID INT, -- FK to InPatient.PatientID
    FOREIGN KEY (InPatientID) REFERENCES InPatient(PatientID)
);
CREATE TABLE Billing (
    BillID INT PRIMARY KEY,
    InPatientID INT,
    OutPatientID INT,
    RoomID INT,
    Expenses DECIMAL(10, 2),
    FOREIGN KEY (InPatientID) REFERENCES InPatient(PatientID),
    FOREIGN KEY (OutPatientID) REFERENCES OutPatient(PatientID),
    FOREIGN KEY (RoomID) REFERENCES Room(RoomNumber)
);
CREATE TABLE Cashier (
    StaffID INT PRIMARY KEY,
    Name VARCHAR(100),
    BillID INT,
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (BillID) REFERENCES Billing(BillID)
);
