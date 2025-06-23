// src/services/claimsService.js

const mockClaims = [
  {
    id: 1,
    title: "Does bleach kill COVID-19?",
    date: "2025-06-23T10:00:00Z",
  },
  {
    id: 2,
    title: "Who owns Greenland?",
    date: "2025-05-07T14:30:00Z",
  },
  // …etc…
];

export function getClaims() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClaims), 300);
  });
}
