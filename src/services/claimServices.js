// src/services/claimServices.js

const mockClaims = [
  {
    id: 1,
    title: "Does bleach kill COVID-19?",
    date: "2025-06-23T10:00:00Z",
    // <-- new field:
    markdown: `
## ❌ Verdict: False

Bleach **can** disinfect surfaces, but there’s **no** safe way to use it internally to treat infections.  
Ingesting bleach causes serious harm and does *not* cure COVID-19.

### Why This Is False
- Bleach is a caustic chemical that damages tissue if swallowed.  
- COVID-19 infects your respiratory tract; surface disinfectants do *not* work internally.  
- All major health authorities (CDC, FDA, WHO) warn against ingesting disinfectants.

### Credible Sources
- [CDC – Cleaning and Disinfecting Your Home](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/cleaning-disinfection.html)  
- [FDA – Rumors About Bleach](https://www.fda.gov/consumers/consumer-updates/risk-ingesting-cleaners-or-disinfectants)  
`,
  },
  {
    id: 2,
    title: "Who owns Greenland?",
    date: "2025-05-07T14:30:00Z",
    markdown: `
## ✔️ Verdict: True

Greenland is an autonomous territory within the Kingdom of Denmark.

### Key Facts
- It’s the world’s largest island and self-governs most internal affairs.  
- Denmark controls defense and foreign policy.  
- Greenlandic is the majority language; Danish is also an official language.

### Learn More
- [Government of Greenland](https://naalakkersuisut.gl)  
- [Denmark–Greenland Relations (Wikipedia)](https://en.wikipedia.org/wiki/Greenland%E2%80%93Denmark_relations)  
`,
  },
  {
    id: 3,
    title: "Does drinking carrot juice improve your night vision?",
    date: "2025-04-12T09:15:00Z",
    markdown: `
## ⚠️ Verdict: Misleading

Carrots contain beta-carotene, which your body converts to vitamin A—essential for eye health. But **drinking large quantities** won’t give you “super-human” night vision.

### The Truth
- **Vitamin A deficiency** can cause poor vision in low light.  
- For most people, a balanced diet already provides enough vitamin A.  
- There’s *no* evidence that extra carrot juice boosts night vision beyond normal.

### Sources
- [NIH – Vitamin A Fact Sheet](https://ods.od.nih.gov/factsheets/VitaminA-Consumer/)  
- [BBC News – The Carrot and Night Vision Myth](https://www.bbc.com/news/uk-44146489)  
`,
  },
];

export function getClaims() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClaims), 300);
  });
}
