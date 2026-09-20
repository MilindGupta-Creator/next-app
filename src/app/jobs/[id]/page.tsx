type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Job Details</h1>
      <p>Selected job ID: {id}</p>
    </div>
  );
}