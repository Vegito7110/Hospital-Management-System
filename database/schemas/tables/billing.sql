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
