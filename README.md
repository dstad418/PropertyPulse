# PropertyPulse

A Frontend project for CS464P/564 at PSU, PropertyPulse is a Reporting application that shares the current health of properties on a university campus.

To get the frontend working:

1. Navigate to frontend:
2. npm install
3. npm run dev

---

---

CURRENT LIBRARIES:

Frontend:

- Programming Language: TypeScript - A syntactical superset of JavaScript.
- Web Framework: React - A JavaScript library for building user interfaces.
- Data Visualization: D3 - A JavaScript library for manipulating documents based on data, often used for creating complex visualizations. We’ll be using it to create a heatmap over the PSU Campus map, and may add additional interactivity.
- Build/Development Tool: Vite - A build tool and development server that aims for a faster and leaner development experience.

Backend:

- Runtime: Deno - A secure runtime for JavaScript and TypeScript that is built on V8 and written in Rust.

Database:

- Remote Database: Accessible via a VPN, will connect to a database that Travis provides.

Network:

- APIs / Data Communication: Facilitated through Deno on the backend.

Operating System:

- Server Operating System: Tested on Chrome and Firefox on MacOS.

---

---

FRONTEND NOTES:

BuildingComponent.tsx:

- Generates a block of building information. Very minimal right now, but when tied to a location using D3, it can be expanded upon.

FavoritesBox.tsx:

- Ideally, will be the box located under the filter options on the main page. I've added an option to favorite buildings in the sidemenu, but once we get the UI set-up, we'll be able to tie it all together, didn't want to get ahead of myself, as we'll have several ways to favorite information.

FilterBox.tsx:

- Perfect as-is, once we're able to filter out returned data and display it we'll be golden. User options save to local storage.

Mainmap.tsx:

- Has a lot of functionality tied "below", other than just displaying the map. Has the buildings saved, will call building component to display information once tied to a interactive interface.
- The map was far too large for the website, so I tried shrinking it, and then adding a scroll bar (which is currently implemented). I feel like a click/zoom/drag will be the way to go, but that will require the d3 library, which is already installed. I know Ronak mentioned experience with is, so I will leave that up to you guys! I'd rather have the one person who knows it really well to tackle that project, since React and D3 both vie for the DOM.

NavBar.tsx:

- Looks good, calls SideMenu when the hamburger menu is clicked. I used emojis and Unicode symbols, feel free to replace!

SideMenu.tsx:

- Looks good, I tested it with expanding fields when clicked. Added a favorites "star".

---

---

BACKEND NOTES:

- Nothing yet, but Deno looks pretty straight-forward to implement!
