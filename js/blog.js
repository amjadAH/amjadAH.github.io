// rss feed fetcher
async function fetchBlogPosts() {
  const rssUrl = "https://blog.amjad.codes/rss.xml";
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    rssUrl
  )}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const items = xml.querySelectorAll("item");
    const blogPostsContainer = document.getElementById("blog-posts");

    // remove loading spinner
    const spinner = blogPostsContainer.querySelector(".loading-spinner");
    if (spinner) {
      spinner.remove();
    }

    // get the first 3 posts
    const recentPosts = Array.from(items).slice(0, 3);

    recentPosts.forEach((item) => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const pubDate = new Date(item.querySelector("pubDate").textContent);
      const description = item.querySelector("description").textContent;

      const postElement = document.createElement("article");
      postElement.className = "blog-post";

      postElement.innerHTML = `
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <time datetime="${pubDate.toISOString()}">${pubDate.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}</time>
                <p>${description.split(" ").slice(0, 25).join(" ")}...</p>
                <a href="${link}" class="read-more" target="_blank">read more <i class="fas fa-arrow-right"></i></a>
            `;

      blogPostsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("error fetching blog posts:", error);
    const blogPostsContainer = document.getElementById("blog-posts");
    blogPostsContainer.innerHTML =
      '<p class="error-message">failed to load blog posts. please try again later.</p>';
  }
}

// fetch blog posts when the page loads
fetchBlogPosts();
