CREATE TABLE Room (
    RoomNumber INT PRIMARY KEY,
    RoomCost DECIMAL(10, 2),
    Vacant BOOLEAN,
    InPatientID INT, -- FK to InPatient.PatientID
    FOREIGN KEY (InPatientID) REFERENCES InPatient(PatientID)
);
