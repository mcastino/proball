const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Pass static files through unchanged
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("locations.html");
  eleventyConfig.addPassthroughCopy("how-to-join.html");
  eleventyConfig.addPassthroughCopy("schedule.html");
  eleventyConfig.addPassthroughCopy("team.html");
  eleventyConfig.addPassthroughCopy("terms.html");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("locations");
  eleventyConfig.addPassthroughCopy("admin");

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLL yyyy");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  // Collection helpers
  eleventyConfig.addFilter("exclude", (collection, currentUrl) => {
    return collection.filter(post => post.url !== currentUrl);
  });

  eleventyConfig.addFilter("limit", (arr, n) => {
    return arr.slice(0, n);
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk"
  };
};
