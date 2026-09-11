import SaveJobButton from "./SaveJobButton";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    location: "New York",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Data Inc",
    location: "San Francisco",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Innovate LLC",
    location: "Chicago",
  },
];

export default function Page() {
  return (
    <div>
      <h1>Job Listings</h1>

      <ul>
        {jobs.map(job => (
          <li key={job.id} className="border p-4 mb-4 rounded shadow">
            <h2>{job.title}</h2>
            <p>
              {job.company} - {job.location}
            </p>
            <SaveJobButton />
          </li>
        ))}
      </ul>
    </div>
  );
}