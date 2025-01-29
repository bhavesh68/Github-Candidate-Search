// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from '../api/API';
// import { Candidate } from '../interfaces/Candidate.interface';


// const CandidateSearch = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [acceptedCandidates, setAcceptedCandidates] = useState<Candidate[]>(
//     JSON.parse(localStorage.getItem('acceptedCandidates') || '[]')
//   );
//   const removeCandidate = (id: number) => {
//     const updatedCandidates = acceptedCandidates.filter((c) => c.id !== id);
//     setAcceptedCandidates(updatedCandidates);
//     localStorage.setItem('acceptedCandidates', JSON.stringify(updatedCandidates));
//   };

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       const data = await searchGithub();
//       const userDetails = await Promise.all(
//         data.map((user: { login: string }) => searchGithubUser(user.login))
//       );
//       setCandidates(userDetails);
//     };
//     fetchCandidates();
//   }, []);

//   const acceptCandidate = () => {
//     const currentCandidate = candidates[currentIndex];
//     setAcceptedCandidates((prev) => {
//       const updated = [...prev, currentCandidate];
//       localStorage.setItem('acceptedCandidates', JSON.stringify(updated));
//       return updated;
//     });
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const rejectCandidate = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   if (currentIndex >= candidates.length) {
//     return <h2>No more candidates available!</h2>;
//   }

//   const currentCandidate = candidates[currentIndex];
//   return (
//     <div>
//       <h1 className="candidate-search-heading">Candidate Search</h1>

//       {currentCandidate && (
//         <div className="candidate-card">
//           <img src={currentCandidate.avatar_url} alt="avatar" />
//           <h2>{currentCandidate.name}</h2>
//           <p>Username: {currentCandidate.login}</p>
//           <p>Location: {currentCandidate.location || 'N/A'}</p>
//           <p>Email: {currentCandidate.email || 'N/A'}</p>
//           <p>Company: {currentCandidate.company || 'N/A'}</p>
//           <a href={currentCandidate.html_url} target="_blank">GitHub Profile</a>

//           <div className="candidate-buttons">
//             <button onClick={acceptCandidate}>+</button>
//             <button onClick={rejectCandidate}>-</button>
//           </div>
//         </div>
//       )}

//       {/* Render Accepted Candidates Table */}
//       <div>
//         <h3>Accepted Candidates:</h3>
//         {acceptedCandidates.length === 0 ? (
//           <p>No candidates accepted yet.</p>
//         ) : (
//           <table className="saved-candidates-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Location</th>
//                 <th>Email</th>
//                 <th>Company</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {acceptedCandidates.map((candidate) => (
//                 <tr key={candidate.id}>
//                   <td>
//                     <img src={candidate.avatar_url} alt="avatar" />
//                   </td>
//                   <td>{candidate.name || candidate.login}</td>
//                   <td>{candidate.location || 'N/A'}</td>
//                   <td>{candidate.email || 'N/A'}</td>
//                   <td>{candidate.company || 'N/A'}</td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => removeCandidate(candidate.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateSearch;


import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      const userDetails = await Promise.all(
        data.map((user: { login: string }) => searchGithubUser(user.login))
      );
      setCandidates(userDetails);
    };
    fetchCandidates();
  }, []);

  const acceptCandidate = () => {
    const currentCandidate = candidates[currentIndex];
    const acceptedCandidates = JSON.parse(localStorage.getItem('acceptedCandidates') || '[]');
    const updatedCandidates = [...acceptedCandidates, currentCandidate];

    localStorage.setItem('acceptedCandidates', JSON.stringify(updatedCandidates));
    setCurrentIndex((prev) => prev + 1);
  };

  const rejectCandidate = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= candidates.length) {
    return <h2 className="no-candidates">No more candidates available!</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="container">
      <h1 className="title">Candidate Search</h1>
      {currentCandidate && (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt="avatar" className="avatar" />
          <h2>{currentCandidate.name || 'No Name'}</h2>
          <p><strong>Username:</strong> {currentCandidate.login}</p>
          <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
          <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
            GitHub Profile
          </a>
          <div className="button-group">
            <button className="accept-btn" onClick={acceptCandidate}>+</button>
            <button className="reject-btn" onClick={rejectCandidate}>-</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
