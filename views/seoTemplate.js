/**
 * SEO Template for Server-Side Rendering
 * Generates dynamic HTML with SEO meta tags from database
 */

function seoTemplate({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  scripts,
  bodyScripts,
  appHtml,
  cssFiles,
  jsFiles,
}) {
  const headScriptsRaw = scripts.join("\n");
  const bodyScriptsRaw = bodyScripts.join("\n");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" sizes="48x48" href="/assets/logo-BdHZwnLv.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title || "Apna Project"}</title>
    <meta name="description" content="${
      description || "Welcome to Apna Project"
    }" />
    <meta property="og:title" content="${
      ogTitle || "Apna project offering plot buying"
    }" />
    <meta property="og:description" content="${
      ogDescription ||
      "Buy plot from Apna Project at best price and best location"
    }" />
    <meta name="robots" content="${robots || "index, follow"}" />
    <link rel="canonical" href="${
      canonical || "https://apnaprojectpatna.com/"
    }" />
    ${cssFiles
      .map((css) => `<link rel="stylesheet" crossorigin href="${css}">`)
      .join("\n    ")}
    ${headScriptsRaw}
  </head>
  <body>
      ${bodyScriptsRaw}
    <div id="root">${appHtml}</div>
    ${jsFiles
      .map((js) => `<script type="module" crossorigin src="${js}"></script>`)
      .join("\n    ")}
  </body>
</html>`;
}

module.exports = seoTemplate;
