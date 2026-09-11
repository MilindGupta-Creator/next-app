const JobList = () => {

    const jobs = [
        { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'New York, NY', description: 'Develop and maintain web applications.' },
        { id: 2, title: 'Product Manager', company: 'Business Inc', location: 'San Francisco, CA', description: 'Lead product development and strategy.' },
        { id: 3, title: 'Data Scientist', company: 'Analytics LLC', location: 'Chicago, IL', description: 'Analyze data to drive business insights.' },
    ]

    return (
        <div>
            <ul>
                {jobs.map(job => (
                    <li className="border-b py-4" key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul></div>
    )
}

export default JobList