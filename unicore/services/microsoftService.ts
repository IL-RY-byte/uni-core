export interface ScheduleEntry {
  //вже оброблені з беку типи
  id: string;
  subject: string;
  start: string;
  end: string;
  location: string;
  teacher: string;
}

export interface Subject {
  subject: string;
  location: string;
  teacher: string;
}

export interface ScheduleResponse {
  schedule: ScheduleEntry[];
}

export interface ErrorResponse {
  message: string;
}

export const testSchedule: ScheduleResponse = {
  schedule: [
    {
      id: "1",
      subject: "Mathematics",
      start: "2025-02-19T09:00:00",
      end: "2025-02-19T10:30:00",
      location: "Room 101",
      teacher: "Dr. Smith",
    },
    {
      id: "2",
      subject: "Physics",
      start: "2025-02-19T11:00:00",
      end: "2025-02-19T12:30:00",
      location: "Room 202",
      teacher: "Prof. Johnson",
    },
    {
      id: "3",
      subject: "Mathematics",
      start: "2025-02-20T09:00:00",
      end: "2025-02-20T10:30:00",
      location: "Room 101",
      teacher: "Dr. Smith",
    },
    {
      id: "4",
      subject: "History",
      start: "2025-02-20T11:00:00",
      end: "2025-02-20T12:30:00",
      location: "Room 303",
      teacher: "Ms. Brown",
    },
    {
      id: "5",
      subject: "Computer Science",
      start: "2025-02-21T09:00:00",
      end: "2025-02-21T10:30:00",
      location: "Lab 1",
      teacher: "Dr. Wilson",
    },
    {
      id: "6",
      subject: "Physics",
      start: "2025-02-21T11:00:00",
      end: "2025-02-21T12:30:00",
      location: "Room 202",
      teacher: "Prof. Johnson",
    },
    {
      id: "7",
      subject: "English",
      start: "2025-02-22T09:00:00",
      end: "2025-02-22T10:30:00",
      location: "Room 404",
      teacher: "Mrs. Adams",
    },
    {
      id: "8",
      subject: "Mathematics",
      start: "2025-02-22T11:00:00",
      end: "2025-02-22T12:30:00",
      location: "Room 101",
      teacher: "Dr. Smith",
    },
    {
      id: "9",
      subject: "Biology",
      start: "2025-02-23T09:00:00",
      end: "2025-02-23T10:30:00",
      location: "Room 505",
      teacher: "Dr. Taylor",
    },
    {
      id: "10",
      subject: "History",
      start: "2025-02-23T11:00:00",
      end: "2025-02-23T12:30:00",
      location: "Room 303",
      teacher: "Ms. Brown",
    }
  ]
};

export const testSubjects: Subject[] = Array.from(
  new Map(
    testSchedule.schedule.map((entry) => [entry.subject, {
      subject: entry.subject,
      location: entry.location,
      teacher: entry.teacher
    }])
  ).values()
);


