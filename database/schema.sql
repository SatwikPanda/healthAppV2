-- Enable the uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define ENUM type for appointment status
CREATE TYPE appointment_status AS ENUM ('Accepted', 'Rejected', 'Pending');

-- Doctors table
CREATE TABLE Doctors (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,  -- Generates a random UUID for id
    name TEXT NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    photo TEXT,  -- Store URL or file path of the photo
    experience INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Doc_auth table for storing doctor authentication details
CREATE TABLE doc_auth (
    id UUID,  -- Should reference the doctor id
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_doctor FOREIGN KEY (id) REFERENCES Doctors(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE Appointments (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,  -- Generates a random UUID for id
    doctor_id UUID NOT NULL,  -- References Doctors table
    name VARCHAR(100) NOT NULL,  -- Patient's name
    age INTEGER NOT NULL,  -- Patient's age
    history TEXT,  -- Medical history
    problems TEXT,  -- Problems described by the patient
    status appointment_status DEFAULT 'Pending',  -- Status of the appointment, with a default value
    appointment_time TIMESTAMP NOT NULL,  -- Time of the appointment
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_doctor_appointment FOREIGN KEY (doctor_id) REFERENCES Doctors(id) ON DELETE CASCADE
);
