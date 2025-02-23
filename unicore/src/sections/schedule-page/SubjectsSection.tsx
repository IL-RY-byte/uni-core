import { testSubjects } from "@services/microsoftService";

const SubjectsSection = () => {
  return (
    <section className="container bg-silver p-4">
      <h2 className="text-lg font-semibold mb-4">Available Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testSubjects.map((subject, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-md font-semibold">{subject.subject}</h3>
            <p className="text-sm text-gray-600">📍 {subject.location}</p>
            <p className="text-sm text-gray-600">👨‍🏫 {subject.teacher}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
  export default SubjectsSection;
  