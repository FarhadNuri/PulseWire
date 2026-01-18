let fetchData = [];
let originalData = [];

// GNews API - Works on deployed sites! Get free key at: https://gnews.io
const API_KEY = "359d14c1d96797265357f7b1fb3f727f";

const categories = [
  { id: "general", name: "General" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "science", name: "Science" },
  { id: "health", name: "Health" },
  { id: "sports", name: "Sports" },
  { id: "entertainment", name: "Entertainment" }
];

const fetchCategories = () => {
  const container = document.getElementById("categories-container");
  container.innerHTML = "";
  categories.forEach((cat) => {
    container.innerHTML += `<a href="#" class="category-link" onclick="fetchCategoryNews('${cat.id}', '${cat.name}')">${cat.name}</a>`;
  });
  fetchCategoryNews("general", "General");
};

const fetchCategoryNews = (categoryId, categoryName) => {
  document.getElementById("all-news").innerHTML = `<div class="loading"><div class="spinner"></div></div>`;
  const url = `https://gnews.io/api/v4/top-headlines?category=${categoryId}&lang=en&country=us&max=10&apikey=${API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.articles) {
        fetchData = data.articles;
        originalData = [...data.articles];
        showAllNews(data.articles, categoryName);
      } else {
        showError(data.errors?.[0] || "Failed to fetch news");
      }
    })
    .catch((err) => {
      console.error("Error fetching news:", err);
      showError("Failed to fetch news. Check your API key.");
    });
};

const showError = (message) => {
  document.getElementById("all-news").innerHTML = `
    <div class="empty-state col-12">
      <i class="fas fa-exclamation-triangle"></i>
      <h4>Oops! Something went wrong</h4>
      <p>${message}</p>
      <p class="mt-3"><small>Get your free API key at: <a href="https://gnews.io" target="_blank">gnews.io</a></small></p>
    </div>`;
};

const showAllNews = (data, categoryName) => {
  const container = document.getElementById("all-news");
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = `<div class="empty-state col-12"><i class="fas fa-newspaper"></i><h4>No news found</h4><p>Try selecting a different category</p></div>`;
    return;
  }
  data.forEach((news) => {
    const title = news.title || "No title";
    const description = news.description || news.content || "No description available";
    const image = news.image || "https://via.placeholder.com/300x200?text=News";
    const publishedAt = news.publishedAt;
    const url = news.url;
    const source = news.source?.name || "Unknown Source";
    const card = document.createElement("div");
    card.className = "col-lg-6 col-12";
    card.innerHTML = `
      <div class="news-card">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image}" class="news-image" alt="${title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'"/>
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description ? description.slice(0, 120) : ""}...</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div class="author-info">
                <div class="author-avatar d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: bold;">${source.charAt(0)}</div>
                <div>
                  <p class="author-name">${source}</p>
                  <p class="publish-date">${formatDate(publishedAt)}</p>
                </div>
              </div>
              <a href="${url}" target="_blank" class="read-more-btn"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });
};

const fetchNewsDetail = (url) => { window.open(url, '_blank'); };

const showTodaysPick = () => {
  const shuffled = [...fetchData].sort(() => 0.5 - Math.random());
  const picked = shuffled.slice(0, 5);
  showAllNews(picked, "Today's Pick");
};

const showTrending = () => { showAllNews(originalData, "All"); };

const sortNews = () => {
  const sortBy = document.getElementById("sortSelect").value;
  let sorted = [...fetchData];
  if (sortBy === "date") {
    sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } else if (sortBy === "title") {
    sorted.sort((a, b) => {
      const titleA = (a.title || "").toLowerCase();
      const titleB = (b.title || "").toLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else {
    sorted = [...originalData];
  }
  showAllNews(sorted, "Sorted");
};

const generateStars = (rating) => {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  for (let i = 0; i < fullStars; i++) { stars += '<i class="fas fa-star"></i>'; }
  if (hasHalf) { stars += '<i class="fas fa-star-half-alt"></i>'; }
  return stars;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Unknown date";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const formatViews = (views) => {
  if (!views) return "0";
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views.toString();
};
