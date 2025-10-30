// Search Page JavaScript

// All articles data
const articles = [
    {
        title: "Top 10 Summer Fashion Trends You Need to Know in 2025",
        description: "Discover the hottest fashion trends of summer 2025, from sustainable fabrics to bold color palettes that will transform your wardrobe.",
        category: "fashion",
        categoryName: "Fashion & Accessories",
        date: "August 15, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        url: "blog/article1.html",
        badgeClass: "fashion-badge",
        keywords: ["fashion", "trends", "summer", "style", "clothing", "wardrobe", "sustainable", "accessories"]
    },
    {
        title: "The Ultimate Natural Skincare Routine for Glowing Skin",
        description: "Unveil the secrets to radiant skin with our comprehensive guide to natural skincare products and routines that actually work.",
        category: "beauty",
        categoryName: "Health & Beauty",
        date: "June 20, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
        url: "blog/article2.html",
        badgeClass: "beauty-badge",
        keywords: ["beauty", "skincare", "natural", "health", "skin", "routine", "products", "wellness"]
    },
    {
        title: "Transform Your Living Space: Modern Home Decor Ideas",
        description: "Learn how to create a stunning modern living space with these expert-approved decor tips and product recommendations.",
        category: "home",
        categoryName: "Home & Garden",
        date: "May 10, 2025",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
        url: "blog/article3.html",
        badgeClass: "home-badge",
        keywords: ["home", "decor", "interior", "design", "living", "modern", "furniture", "garden"]
    },
    {
        title: "Best Hidden Travel Destinations for Your 2025 Adventure",
        description: "Explore off-the-beaten-path destinations that offer unique experiences and unforgettable memories.",
        category: "travel",
        categoryName: "Travel & Accommodation",
        date: "March 22, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        url: "blog/article4.html",
        badgeClass: "travel-badge",
        keywords: ["travel", "destinations", "adventure", "vacation", "tourism", "accommodation", "hotels", "trip"]
    },
    {
        title: "Healthy Meal Prep Ideas That Save Time and Money",
        description: "Master the art of meal preparation with these delicious, nutritious recipes and time-saving kitchen tools.",
        category: "food",
        categoryName: "Food & Beverage",
        date: "January 18, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        url: "blog/article5.html",
        badgeClass: "food-badge",
        keywords: ["food", "meal prep", "cooking", "recipes", "healthy", "nutrition", "beverage", "kitchen"]
    }
];

// Get search query from URL
function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

// Perform search
function searchArticles(query) {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    return articles.filter(article => {
        // Search in title
        if (article.title.toLowerCase().includes(searchTerm)) return true;
        
        // Search in description
        if (article.description.toLowerCase().includes(searchTerm)) return true;
        
        // Search in category name
        if (article.categoryName.toLowerCase().includes(searchTerm)) return true;
        
        // Search in keywords
        if (article.keywords.some(keyword => keyword.includes(searchTerm))) return true;
        
        return false;
    });
}

// Display search results
function displayResults(results, query) {
    const searchQueryEl = document.getElementById('searchQuery');
    const resultsCountEl = document.getElementById('resultsCount');
    const searchResultsEl = document.getElementById('searchResults');
    const noResultsEl = document.getElementById('noResults');
    
    // Update search query display
    searchQueryEl.textContent = `Searching for: "${query}"`;
    
    if (results.length === 0) {
        // Show no results message
        searchResultsEl.style.display = 'none';
        noResultsEl.style.display = 'block';
        resultsCountEl.textContent = '';
    } else {
        // Show results
        searchResultsEl.style.display = 'grid';
        noResultsEl.style.display = 'none';
        resultsCountEl.textContent = `Found ${results.length} article${results.length > 1 ? 's' : ''}`;
        
        // Generate HTML for results
        searchResultsEl.innerHTML = results.map(article => `
            <article class="blog-card" data-category="${article.category}">
                <div class="blog-image">
                    <img src="${article.image}" alt="${article.title}">
                    <span class="category-badge ${article.badgeClass}">${article.categoryName}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `).join('');
        
        // Add animation
        const cards = searchResultsEl.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.animation = `slideUp 0.5s ease ${index * 0.1}s`;
            card.style.animationFillMode = 'backwards';
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const query = getSearchQuery();
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // Set input value to current query
    searchInput.value = query;
    
    // Perform initial search
    if (query) {
        const results = searchArticles(query);
        displayResults(results, query);
    } else {
        document.getElementById('searchQuery').textContent = 'Enter a search term';
        document.getElementById('noResults').style.display = 'block';
    }
    
    // Handle new search
    function performNewSearch() {
        const newQuery = searchInput.value.trim();
        if (newQuery) {
            window.location.href = `search.html?q=${encodeURIComponent(newQuery)}`;
        }
    }
    
    searchBtn.addEventListener('click', performNewSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performNewSearch();
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

