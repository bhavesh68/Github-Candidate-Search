import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('acceptedCandidates') || '[]');
    setSavedCandidates(data);
  }, []);

  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('acceptedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <h2>No candidates have been accepted!</h2>;
  }
return (
  <div>
    <h1 className="candidate-search-heading">Potential Candidates</h1>
    
    {savedCandidates.length === 0 ? (
      <h2>No candidates have been accepted!</h2>
    ) : (
      <table className="saved-candidates-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img src={candidate.avatar_url} alt="avatar" />
              </td>
              <td>{candidate.name || candidate.login}</td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => removeCandidate(candidate.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

  // return (
  //   <div>
  //     <h1>Potential Candidates</h1>
  //     {savedCandidates.map((candidate) => (
  //       <div key={candidate.login}>
  //         <img src={candidate.avatar_url} alt="avatar" width="100" />
  //         <h2>{candidate.name}</h2>
  //         <p>Username: {candidate.login}</p>
  //         <p>Location: {candidate.location || 'N/A'}</p>
  //         <p>Email: {candidate.email || 'N/A'}</p>
  //         <p>Company: {candidate.company || 'N/A'}</p>
  //         <a href={candidate.html_url} target="_blank">
  //           GitHub Profile
  //         </a>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default SavedCandidates;
