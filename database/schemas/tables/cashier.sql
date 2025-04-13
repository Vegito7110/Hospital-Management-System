CREATE TABLE Cashier (
    StaffID INT PRIMARY KEY,
    Name VARCHAR(100),
    BillID INT,
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
    FOREIGN KEY (BillID) REFERENCES Billing(BillID)
);
