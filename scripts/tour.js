// Initialize the tour
var tour = new Tour({
  steps: [
    {
      element: "#left-sidebar",
      title: "Welcome to Lake Waikare Digital Library",
      content: "This sidebar is your main navigation hub. Hover over each icon to see its label. From here, you can access the home page, explore collections, search the library, view map layers, and access the interactive map. The sidebar automatically expands when you hover over it.",
      placement: "right"
    },
    {
      element: ".SearchContainer",
      title: "Search Our Digital Library",
      content: "Looking for something specific? Use our powerful search feature to find records, collections, and stories about Lake Waikare. You can search by keywords, locations, dates, or themes. The search results will show you relevant content from across our entire digital library.",
      placement: "bottom"
    },
    {
      element: "#childModeToggle",
      title: "Kids Mode",
      content: "Looking for a kid-friendly experience? Click this button to switch to Kids Mode! The interface will transform into a more engaging, colorful, and simplified version perfect for younger users. Kids Mode includes special games, stories, and interactive activities about Lake Waikare.",
      placement: "left"
    },
    {
      element: "#hero-section",
      title: "Explore Lake Waikare",
      content: "This is the heart of our digital library. Here you'll find quick access to our interactive map and collections. The statistics below show the growing number of records, collections, and contributors in our library. Scroll down to discover more about Lake Waikare's rich heritage.",
      placement: "bottom"
    },
    {
      element: "#quickstarts-section",
      title: "QuickStarts - Thematic Areas",
      content: "Explore our six main thematic areas: Māori History (🏺), Water Quality Data (💧), Local Flora & Fauna (🦅), Oral Histories (🗣️), Environmental Change (🌍), and Traditional Food Gathering (🥗). Each theme contains curated collections of records and stories about Lake Waikare.",
      placement: "top"
    },
    {
      element: "#feature-demo",
      title: "Key Features",
      content: "Discover our three main features: Records (📍) - individual stories and data points, Collections (📚) - themed groups of records, and Map Overlays (🗺️) - interactive visualizations of Lake Waikare's changes over time. Each feature helps you explore different aspects of the lake's heritage.",
      placement: "top"
    },
    {
      element: ".SiteFooter",
      title: "Partnerships & Resources",
      content: "Our digital library is a collaborative effort supported by the University of Waikato, Waikato Regional Council, and local iwi. In the footer, you'll find additional resources, site navigation, and ways to get involved with preserving Lake Waikare's heritage.",
      placement: "top"
    }
  ],
  backdrop: true,
  backdropPadding: 5,
  storage: false,
  onEnd: function() {
    // Optional: Store in localStorage that the tour has been shown
    localStorage.setItem('tourShown', 'true');
  }
});

// Function to start the tour
function startTour() {
  tour.init();
  tour.start();
}

// Start the tour when the page loads (only for first-time visitors)
document.addEventListener('DOMContentLoaded', function() {
  // Only show tour if it hasn't been shown before
  if (!localStorage.getItem('tourShown')) {
    tour.init();
    tour.start();
  }
}); 