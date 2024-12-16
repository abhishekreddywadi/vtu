import React from "react";

export const Result: React.FC = () => {
  const results = [
    { id: 1, name: "Subject 1", marks: 80 },
    { id: 2, name: "Subject 2", marks: 90 },
    { id: 3, name: "Subject 3", marks: 85 },
  ];

  return (
    <div>
      <h2>Result Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.name}</td>
              <td>{result.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
